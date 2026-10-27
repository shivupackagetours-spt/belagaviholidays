/* The three tones the generated itinerary is printed in, as values rather than
   site tokens: this is a document that leaves the site and has to stand on its
   own in a reader that knows nothing about this palette. */
export type PdfTone = readonly [number, number, number]

export const PDF_TONES: {
  INK: PdfTone
  MUTED: PdfTone
  PRIMARY: PdfTone
} = {
  INK: [0.13, 0.18, 0.22],
  MUTED: [0.32, 0.37, 0.42],
  PRIMARY: [0.06, 0.31, 0.33],
}
