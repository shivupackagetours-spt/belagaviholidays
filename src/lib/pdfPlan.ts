import type { Tour } from '@/data/tours'
import { CONTACT, departureCities } from '@/data/company'
import {
  ACCENT,
  CARD,
  CONTENT_W,
  GOLD,
  HAIRLINE,
  INK,
  LEAD_BODY,
  LEAD_NOTE,
  MARGIN_X as MARGIN,
  MUTED,
  PAGE_H,
  PAPER,
  PRIMARY,
  SIZE_BODY,
  SIZE_FOOT,
  SIZE_HEADING,
  SIZE_NOTE,
  Flow,
  para,
} from '@/lib/pdfHead'
import { titleBand } from '@/lib/pdfBand'

/* Three or four facts, on the page surface, as a strip of equal columns. */
function factStrip(flow: Flow, tour: Tour) {
  const facts: [string, string][] = [
    ['Duration', tour.days + ' days, ' + tour.nights + ' nights'],
    ['Best for', tour.bestFor],
    ['Departs from', 'Belagavi, Karnataka'],
  ]
  if (tour.nextDeparture) facts.push(['Next departure', tour.nextDeparture])

  const colW = CONTENT_W / facts.length
  const top = flow.y
  facts.forEach(([label, value], i) => {
    const x = MARGIN + colW * i
    flow.canvas.texts.push({
      text: label.toUpperCase(),
      x,
      y: top - 10,
      size: SIZE_FOOT,
      colour: MUTED,
    })
    para(value, SIZE_BODY, x, colW - 14)
      .slice(0, 2)
      .forEach((t, li) => {
        flow.canvas.texts.push({
          text: t,
          x,
          y: top - 26 - li * LEAD_BODY,
          size: SIZE_BODY,
          colour: INK,
        })
      })
  })
  flow.move(58)
  flow.canvas.rect(MARGIN, flow.y, CONTENT_W, 0.6, HAIRLINE)
  flow.move(12)
}

/* A heading with the marker that opens every section of the printed plan. */
function sectionHead(flow: Flow, title: string, spaceBefore = 20) {
  flow.breakIf(48, spaceBefore)
  flow.move(spaceBefore)
  flow.canvas.rect(MARGIN, flow.y + 2, 26, 2, GOLD)
  flow.move(12)
  flow.paragraph(title.toUpperCase(), {
    size: SIZE_HEADING,
    leading: 18,
    colour: PRIMARY,
    weight: 'bold',
  })
}

/* One day of the journey: the numbered badge, the day, the title, then the
   day's own printed blocks or its paragraph. */
function dayCard(flow: Flow, day: Tour['itinerary'][number], index: number) {
  const textX = MARGIN + 44
  const textW = CONTENT_W - 44
  const raw = day.blocks
    ? day.blocks.map((b) => b.label.toUpperCase() + ' ' + b.items.join('. ')).join(' ')
    : day.body
  const body = para(raw, SIZE_BODY, textX, textW)
  const title = para(day.day + '  -  ' + day.title, 10.5, textX, textW - 10)
  const height = title.length * 15 + body.length * LEAD_BODY + 26

  flow.breakIf(height, index === 0 ? 6 : 12)

  const top = flow.y
  flow.canvas.rect(MARGIN, top - height + 4, CONTENT_W, height - 6, CARD)

  /* The numbered badge. The numbers carry meaning here, the order of the
     journey, so this is the one place a numeral is drawn large. */
  const badgeY = top - 24
  flow.canvas.rect(MARGIN + 12, badgeY, 19, 19, PRIMARY)
  flow.canvas.texts.push({
    text: String(index + 1),
    x: MARGIN + 12 + (index + 1 > 9 ? 4 : 7),
    y: badgeY + 6,
    size: 10,
    colour: PAPER,
    weight: 'bold',
  })

  flow.y = top - 4
  title.forEach((line) => {
    flow.text({ text: line, x: textX, size: 10.5, colour: PRIMARY, weight: 'bold' })
    flow.move(3.5)
  })
  flow.move(2)
  body.forEach((line) => {
    flow.text({ text: line, x: textX, size: SIZE_BODY, colour: INK })
    flow.move(LEAD_BODY - SIZE_BODY - 0.6)
  })
  flow.y = Math.min(flow.y, top - height + 14)
}

/* The closing note: what the office still has to confirm, on its own tinted
   plate so it is not read as part of the day plan. */
function closingNote(flow: Flow, tour: Tour) {
  const price =
    tour.priceFrom === null ? ' The fare for this journey is yet to be published.' : ''
  const text =
    'Every price, departure date and seat count must be confirmed by the office in writing before any booking. ' +
    'Until then this plan is a demonstration itinerary.' +
    price
  const block = para(text, SIZE_NOTE, MARGIN + 16, CONTENT_W - 32)
  const height = block.length * LEAD_NOTE + 28
  flow.breakIf(height, 24)

  const top = flow.y
  flow.canvas.rect(MARGIN, top - height + 8, CONTENT_W, height - 2, CARD)
  flow.canvas.rect(MARGIN, top - height + 8, 3, height - 2, GOLD)
  flow.y = top - 3
  block.forEach((line) => {
    flow.text({ text: line, x: MARGIN + 16, size: SIZE_NOTE, colour: ACCENT })
    flow.move(LEAD_NOTE - SIZE_NOTE - 0.6)
  })
  flow.y = top - height + 10
}

/* A short list of facts under a heading, one line each. */
function bulletList(flow: Flow, heading: string, items: string[]) {
  sectionHead(flow, heading)
  items.forEach((item) =>
    flow.paragraph('. ' + item, { x: MARGIN + 8, width: CONTENT_W - 8, spaceBefore: 3 }),
  )
}

/* A paragraph in the muted tone, for the closing blocks. */
function noteLine(flow: Flow, text: string, spaceBefore = 0) {
  flow.paragraph(text, {
    colour: MUTED,
    x: MARGIN + 8,
    width: CONTENT_W - 8,
    spaceBefore,
  })
}

/* --------------------------------------------------------------- the plan */

export function buildPages(tour: Tour) {
  const flow = new Flow(tour.name)

  titleBand(flow.canvas, tour)
  flow.y = PAGE_H - 168 - 96

  factStrip(flow, tour)

  /* The journey in the office's own words, then the day-wise plan. */
  flow.paragraph(tour.summary, { size: SIZE_BODY, leading: LEAD_BODY + 1 })

  sectionHead(flow, 'Day-wise plan', 10)
  tour.itinerary.forEach((day, i) => dayCard(flow, day, i))

  bulletList(flow, 'On the tour', tour.highlights)

  if (tour.boardingPoints && tour.boardingPoints.length) {
    sectionHead(flow, 'Boarding points')
    noteLine(flow, tour.boardingPoints.join('  |  '))
  }

  sectionHead(flow, 'Cities we depart from')
  noteLine(flow, departureCities.join('  |  '))

  sectionHead(flow, 'Talk to the office')
  noteLine(flow, 'Phone ' + CONTACT.phonePrimary + ' or ' + CONTACT.phoneSecondary, 4)
  noteLine(flow, 'WhatsApp ' + CONTACT.whatsapp)
  noteLine(flow, 'Office hours: ' + CONTACT.hours)

  closingNote(flow, tour)
  return flow.canvases
}
