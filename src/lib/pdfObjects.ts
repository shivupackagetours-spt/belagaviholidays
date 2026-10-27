/* The base-14 faces, named for what they are: the one entry in the fixed
   catalogue that every reader already has, so the file carries no font.

   Two shapes are needed. A face embedded once as its own object is shared by
   every page's resource dictionary; an inline face is written straight into a
   page's resources, which is what the simpler layouts use. */

export type BuiltInFace = 'helvetica' | 'helvetica-oblique'

/* A base-14 face a reader resolves by name has to be named exactly, and it is
   matched against the StandardEncoding it is predefined with. Declaring
   WinAnsiEncoding on top of that is what made readers such as pdf.js find no
   face for /F1 and draw the text as nothing: the glyphs were described in an
   encoding the narrowed font did not carry. Helvetica's own standard encoding
   covers every character the folding in pdfText leaves behind, so the encoding
   entry is left off and the name alone is what the reader looks up. */
const BUILT_IN: Record<BuiltInFace, string> = {
  helvetica: 'Helvetica',
  'helvetica-oblique': 'Helvetica-Oblique',
}

/** The face itself, as an object that can be referred to by number. */
export function buildFace(face: BuiltInFace) {
  return buildFontDict(BUILT_IN[face])
}

/** The face written into a page's own resources, for a document with one face. */
export function builtInFontRef(face: BuiltInFace) {
  return buildResourceDict(dict([pair('F1', buildFontDict(BUILT_IN[face]))]))
}

export function buildFontRefs(faces: Record<string, string>) {
  const entries = Object.keys(faces).map((name) => pair(name, faces[name]))
  return buildResourceDict(dict(entries))
}

function buildFontDict(base: string) {
  const parts = [
    pair('Type', '/Font'),
    pair('Subtype', '/Type1'),
    pair('BaseFont', '/' + base),
  ]
  return dict(parts)
}

function buildResourceDict(fontDict: string) {
  const fonts = dict([pair('Font', fontDict)])
  return dict([pair('Resources', fonts)])
}

function pair(key: string, value: string) {
  return '/' + key + ' ' + value
}

function dict(entries: string[]) {
  return '<< ' + entries.join(' ') + ' >>'
}

/* The page-level shape of every object in the file, so the assembler below
   only ever writes names and numbers into it. */

export function buildCatalog() {
  return dict([pair('Type', '/Catalog'), pair('Pages', '2 0 R')])
}

export function buildPagesTree(kids: string[], count: number) {
  const kidRefs = '[' + kids.map((id) => id + ' 0 R').join(' ') + ']'
  return dict([
    pair('Type', '/Pages'),
    pair('Kids', kidRefs),
    pair('Count', String(count)),
  ])
}

export function buildPage(parent: string, mediaBox: string, resources: string, contents: string) {
  return dict([
    pair('Type', '/Page'),
    pair('Parent', parent),
    pair('MediaBox', mediaBox),
    resources,
    pair('Contents', contents),
  ])
}

/** An array written the way PDF expects it, used for the page's media box. */
export function buildInArray(values: number[]) {
  return '[' + values.join(' ') + ']'
}

export function buildContentStream(stream: string) {
  return dict([pair('Length', String(stream.length))]) + '\nstream\n' + stream + '\nendstream'
}

export function buildTrailer(size: number, root: string) {
  return dict([pair('Size', String(size)), pair('Root', root + ' 0 R')])
}
