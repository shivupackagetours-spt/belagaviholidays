import type { Tour } from '@/data/tours'
import { MARGIN_X, PAGE_W, PAPER, PRIMARY, GOLD, SIZE_FOOT, SIZE_NOTE, SIZE_TITLE, Canvas, para, type Tone } from '@/lib/pdfHead'

/* The title band: the product, the route, and the two figures a traveller
   checks first. A filled plate, so page one opens on something to look at
   without carrying a photograph. */
export function titleBand(canvas: Canvas, tour: Tour) {
  const bandH = 168
  const bandY = PAGE_W - bandH
  canvas.rect(0, bandY, PAGE_W, bandH, PRIMARY)
  /* The saffron marker, the way the site uses it: a small festive rule, not a
     second ground. */
  canvas.rect(0, bandY, PAGE_W, 4, GOLD)

  let y = PAGE_W - 32 - bandH
  const line = (raw: string, size: number, colour: Tone, weight?: 'bold') => {
    canvas.texts.push({ text: raw, x: MARGIN_X, y, size, colour, weight })
    y -= size * 1.5
  }

  line('SHIVU PACKAGE TOURS  .  BELAGAVI, KARNATAKA', SIZE_FOOT, PAPER)
  y -= 10
  para(tour.name, SIZE_TITLE, MARGIN_X, PAGE_W - MARGIN_X * 2 - 20)
    .slice(0, 2)
    .forEach((t) => line(t, SIZE_TITLE, PAPER))
  y -= 2
  para(tour.places, SIZE_NOTE, MARGIN_X, PAGE_W - MARGIN_X * 2)
    .slice(0, 3)
    .forEach((t) => line(t, SIZE_NOTE, [0.82, 0.87, 0.89]))

  canvas.rect(MARGIN_X, bandY + 26, 64, 1.4, GOLD)
  canvas.texts.push({
    text: tour.days + ' DAYS  .  ' + tour.nights + ' NIGHTS',
    x: MARGIN_X,
    y: bandY + 12,
    size: SIZE_NOTE,
    colour: PAPER,
  })
}
