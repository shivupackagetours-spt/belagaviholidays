/* The day-wise itinerary, downloadable as a PDF.

   The site has no server, so a download control that fetched a file from an
   address we do not have would lead nowhere. This builds the file in the
   browser instead, from the same tour record the page renders, and hands the
   visitor a real document that opens offline and can be printed.

   It is a deliberate, small subset of PDF: A4, the built-in Helvetica of the
   base-14 catalogue, filled rectangles and one positioned line of text per
   line. That is enough for an itinerary and costs no dependency. Object shapes
   live in pdfObjects, folding and encoding in pdfText, the printed palette in
   pdfTones, the canvas and the flowing layout in pdfHead, and the plan itself
   in pdfPlan and pdfBand. This file writes the cross-references and hands the
   bytes to the browser. */

import type { Tour } from '@/data/tours'
import { PAGE_H, PAGE_W } from '@/lib/pdfHead'
import { buildPages } from '@/lib/pdfPlan'
import {
  buildCatalog,
  buildContentStream,
  buildFace,
  buildFontRefs,
  buildInArray,
  buildPage,
  buildPagesTree,
  buildTrailer,
} from '@/lib/pdfObjects'

/* A file name the visitor's machine and a search result can both use as-is. */
export function itineraryFileName(tour: Tour) {
  const base = tour.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return 'shivu-package-tours-' + base + '-itinerary.pdf'
}

/* Object order is fixed, so the cross-references can be written before the
   objects exist: 1 is the catalogue, 2 the page tree, 3 and 4 the two faces,
   and from 5 onward a page and its content stream in pairs. */
export function buildItineraryPdf(tour: Tour) {
  const canvases = buildPages(tour)
  const firstPage = 5
  const resources = buildFontRefs({ F1: '3 0 R', F2: '4 0 R' })
  const parts: string[] = []

  parts.push(buildCatalog())
  parts.push(
    buildPagesTree(
      canvases.map((_, i) => String(firstPage + i * 2)),
      canvases.length,
    ),
  )
  parts.push(buildFace('helvetica'))
  parts.push(buildFace('helvetica-oblique'))

  canvases.forEach((canvas, i) => {
    const pageId = firstPage + i * 2
    parts.push(
      buildPage('2', buildInArray([0, 0, PAGE_W, PAGE_H]), resources, pageId + 1 + ' 0 R'),
    )
    parts.push(buildContentStream(canvas.stream()))
  })

  return encodePdf(parts)
}

function encodePdf(parts: string[]) {
  let pdf = '%PDF-1.4\n'
  const offsets: number[] = []

  parts.forEach((body, i) => {
    offsets.push(pdf.length)
    pdf += i + 1 + ' 0 obj\n' + body + '\nendobj\n'
  })

  const xref = pdf.length
  const count = parts.length + 1
  let table = 'xref\n0 ' + count + '\n0000000000 65535 f \n'
  for (const offset of offsets) {
    table += String(offset).padStart(10, '0') + ' 00000 n \n'
  }
  pdf += table
  pdf += 'trailer\n' + buildTrailer(count, '1') + '\nstartxref\n' + xref + '\n%%EOF\n'

  const bytes = new Uint8Array(pdf.length)
  for (let i = 0; i < pdf.length; i += 1) bytes[i] = pdf.charCodeAt(i) & 0xff
  return bytes
}

/* Builds the file and hands it to the browser as a download. */
export function downloadItinerary(tour: Tour) {
  const bytes = buildItineraryPdf(tour)
  const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = itineraryFileName(tour)
  document.body.appendChild(link)
  link.click()
  link.remove()
  /* Revoked on a delay: revoking in the same tick can cancel the download in
     some browsers before the blob has been read. */
  window.setTimeout(() => URL.revokeObjectURL(url), 4000)
}
