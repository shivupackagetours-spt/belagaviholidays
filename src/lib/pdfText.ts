/* Folding, measuring and the low-level strings a PDF text stream is made of,
   kept apart from the itinerary itself so the layout file reads as layout.

   The cross-reference table and the stream lengths are counted in bytes, so
   every character has to be one byte wide before the file is assembled: the
   built-in encoding cannot carry a rupee sign or a typographic dash, and
   folding those to Latin equivalents is what keeps the file readable by every
   reader rather than corrupting it. Folded characters are written from code
   points, because the literals are not reviewable when written directly. */

/** Average advance width of Helvetica as a fraction of the font size: enough
    to fold a line inside the margin. It differs by only a few percent across
    lowercase Latin. */
const CHAR_WIDTH_RATIO = 0.5

/* Enough of the WinAnsi table to fold the characters a printed plan actually
   contains: a rupee sign becomes "Rs.", and the dashes, quotes and ellipsis
   become the Latin characters the base-14 encoding carries. Anything else
   outside the encoding's range becomes a question mark rather than a byte that
   would silently corrupt the file. The codes are written as numbers because a
   file full of literal punctuation is not reviewable. */
export function foldToPrintText(input: string) {
  let out = ''
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i]
    const code = input.charCodeAt(i)
    /* A surrogate pair is one character outside Latin-1 either way, and halves
       of one must never be written: stepping a code unit at a time is what keeps
       the 0-255 boundary honest. */
    if (code > 255) {
      out += '?'
      continue
    }
    if (code === 0x20b9) {
      out += 'Rs. '
    } else if (code === 0x2013 || code === 0x2014 || code === 0x00b7 || code === 0x2022) {
      out += '-'
    } else if (code === 0x2018 || code === 0x2019) {
      out += String.fromCharCode(39)
    } else if (code === 0x201c || code === 0x201d) {
      out += String.fromCharCode(34)
    } else if (code === 0x2026) {
      out += '...'
    } else if (code === 0x00a0) {
      out += ' '
    } else {
      out += code >= 32 ? ch : '?'
    }
  }
  return out
}

/** Folds a sentence to the width it will actually occupy on the page. */
export function wrapToWidth(text: string, size: number, width: number, indent: number) {
  const perLine = Math.max(12, Math.floor((width - indent) / (size * CHAR_WIDTH_RATIO)))
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? current + ' ' + word : word
    if (candidate.length > perLine && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  return lines.length ? lines : ['']
}

/* Backslash and the two brackets are the only characters a PDF string literal
   carries as an escape rather than as themselves. */
const BACKSLASH = String.fromCharCode(92)

export function pdfString(text: string) {
  return (
    '(' +
    text
      .split(BACKSLASH)
      .join(BACKSLASH + BACKSLASH)
      .split('(')
      .join(BACKSLASH + '(')
      .split(')')
      .join(BACKSLASH + ')') +
    ')'
  )
}

export function number(value: number) {
  return value.toFixed(2)
}

/** One positioned line of text, as the content stream writes it: the fill
    colour, the face and size, the text matrix, then the string itself. `weight`
    picks the second face, which is the oblique Helvetica base-14 readers
    already have — the closest thing to a bold this catalogue carries. */
export function textCommand(
  text: string,
  x: number,
  y: number,
  size: number,
  colour: readonly [number, number, number],
  weight?: 'bold',
) {
  return [
    'BT',
    colour.map(number).join(' ') + ' rg',
    (weight === 'bold' ? '/F2 ' : '/F1 ') + size + ' Tf',
    '1 0 0 1 ' + number(x) + ' ' + number(y) + ' Tm',
    pdfString(text) + ' Tj',
    'ET',
  ].join('\n')
}
