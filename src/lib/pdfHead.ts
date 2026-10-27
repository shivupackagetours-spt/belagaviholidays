/* The canvas, the measure and the flowing layout the printed itinerary is drawn
   on. Shared by the band, the plan and the assembler; the tones it paints with
   are the site's own, taken from pdfTones. */

import { foldToPrintText, textCommand, number } from '@/lib/pdfText'
import { PDF_TONES } from '@/lib/pdfTones'

export type Tone = readonly [number, number, number]

const { INK, MUTED, PRIMARY } = PDF_TONES
/* The page surface, and the tint the day cards and the closing note sit on. */
const PAPER: Tone = [1, 1, 1]
const CARD: Tone = [0.976, 0.968, 0.949]
const HAIRLINE: Tone = [0.878, 0.859, 0.812]
/* The saffron marker: the rule that opens a section heading. */
const GOLD: Tone = [0.749, 0.573, 0.29]
const ACCENT: Tone = [0.29, 0.149, 0.004]

/* Page geometry in points, A4 at 72 dpi, and the one size the printed plan does
   not take from the site's own scale. */
export const PAGE_W = 595
export const PAGE_H = 842
export const MARGIN_X = 48
export const CONTENT_W = PAGE_W - MARGIN_X * 2

const MARGIN_TOP = 54
const MARGIN_BOTTOM = 62

const SIZE_FOOT = 7.5
const SIZE_NOTE = 8
const SIZE_BODY = 9.5
const SIZE_DAY = 10.5
const SIZE_HEADING = 12.5
const SIZE_TITLE = 21

const LEAD_BODY = 12.5
const LEAD_NOTE = 11
const LEAD_DAY = 15

/* The width of the day badge, in points. */
const BADGE = 19

/* ------------------------------------------------------------------ canvas */

export type TextLine = {
  text: string
  x: number
  y: number
  size: number
  colour: Tone
  /* The second face, for the few places a heading needs more than size. */
  weight?: 'bold'
}

type Rect = { x: number; y: number; w: number; h: number; fill: Tone }

class Canvas {
  readonly texts: TextLine[] = []
  readonly rects: Rect[] = []

  rect(x: number, y: number, w: number, h: number, fill: Tone = PAPER) {
    this.rects.push({ x, y, w, h, fill })
  }

  /* Filled first, then every line, so a card never covers its own text. */
  stream() {
    const out = this.rects.map(
      (r) =>
        r.fill.map(number).join(' ') +
        ' rg ' +
        [r.x, r.y, r.w, r.h].map(number).join(' ') +
        ' re f',
    )
    this.texts.forEach((line) => {
      out.push(textCommand(line.text, line.x, line.y, line.size, line.colour, line.weight))
    })
    return out.join('\n')
  }
}

/* ---------------------------------------------------------------- measures */

/* Advance width of one character. Helvetica is proportional, and the margin of
   an A4 page is not a place to be out by twenty per cent: the wide and narrow
   Latin characters are counted, everything else takes the average. */
function charWidth(ch: string, size: number) {
  const code = ch.charCodeAt(0)
  if (code >= 97 && code <= 122) return size * (ch === 'i' || ch === 'l' ? 0.25 : 0.52)
  if (code >= 65 && code <= 90) return size * (ch === 'I' || ch === 'J' ? 0.3 : 0.66)
  if (code >= 48 && code <= 57) return size * 0.556
  if (code === 32) return size * 0.28
  if (code === 46 || code === 44 || code === 39) return size * 0.28
  return size * 0.52
}

function measure(text: string, size: number) {
  let w = 0
  for (let i = 0; i < text.length; i += 1) w += charWidth(text[i], size)
  return w
}

/* One folded paragraph, already split to the width it will occupy. */
function para(raw: string, size: number, _x: number, width: number) {
  const text = foldToPrintText(raw)
  const perLine = Math.max(16, Math.floor(width / (size * 0.5)))
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? current + ' ' + word : word
    if (current && (candidate.length > perLine || measure(candidate, size) > width)) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  if (!lines.length) lines.push('')
  return lines
}

/* ------------------------------------------------------------- flow state */

/* A layout engine rather than a list of lines: content is drawn until the
   cursor reaches the bottom margin, then continues in the same shape on the
   next page. A break interrupts a canvas, so the canvas is closed and a fresh
   one started with the running head that tells the reader where they are. */
class Flow {
  readonly canvases: Canvas[] = []
  canvas = new Canvas()
  cursor = PAGE_H - MARGIN_TOP

  constructor(private readonly heading: string) {
    this.canvases.push(this.canvas)
    this.canvas.rect(0, 0, PAGE_W, PAGE_H, PAPER)
  }

  get y() {
    return this.cursor
  }

  /* Set directly by the blocks that paint their own plate before flowing text
     into it. */
  set y(value: number) {
    this.cursor = value
  }

  move(space: number) {
    if (space) this.cursor -= space
  }

  /* Breaks the page when the next block of `height` will not fit. */
  breakIf(height: number, spaceBefore = 0) {
    if (this.cursor - spaceBefore - height < MARGIN_BOTTOM) {
      this.newPage()
      return true
    }
    return false
  }

  text(line: Omit<TextLine, 'y'>) {
    const y = this.cursor - line.size
    this.canvas.texts.push({ ...line, y })
    this.cursor = y - line.size * 0.32
  }

  paragraph(
    raw: string,
    options: {
      size?: number
      leading?: number
      x?: number
      width?: number
      colour?: Tone
      spaceBefore?: number
      weight?: 'bold'
    } = {},
  ) {
    const size = options.size ?? SIZE_BODY
    const leading = options.leading ?? LEAD_BODY
    const x = options.x ?? MARGIN_X
    const width = options.width ?? CONTENT_W
    this.move(options.spaceBefore ?? 0)
    para(raw, size, x, width).forEach((line) => {
      this.breakIf(leading)
      this.text({ text: line, x, size, colour: options.colour ?? INK, weight: options.weight })
      this.move(leading - size)
    })
    this.move(leading - size * 0.68)
  }

  newPage() {
    this.canvas = new Canvas()
    this.canvases.push(this.canvas)
    this.canvas.rect(0, 0, PAGE_W, PAGE_H, PAPER)
    this.cursor = PAGE_H - MARGIN_TOP
    this.text({
      text: foldToPrintText('SHIVU PACKAGE TOURS  |  ' + this.heading),
      x: MARGIN_X,
      size: SIZE_FOOT,
      colour: MUTED,
    })
    this.canvas.rect(MARGIN_X, this.cursor - 9, CONTENT_W, 0.6, HAIRLINE)
    this.move(14)
  }
}

export {
  ACCENT,
  BADGE,
  CARD,
  Canvas,
  Flow,
  GOLD,
  HAIRLINE,
  INK,
  LEAD_BODY,
  LEAD_DAY,
  LEAD_NOTE,
  MUTED,
  PAPER,
  PRIMARY,
  SIZE_BODY,
  SIZE_DAY,
  SIZE_FOOT,
  SIZE_HEADING,
  SIZE_NOTE,
  SIZE_TITLE,
  para,
}
