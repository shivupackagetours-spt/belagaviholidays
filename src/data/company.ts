/* The real ways to reach the office, in one place. No network means a form
   cannot deliver a message — the phones, the WhatsApp line and the mailbox can,
   so every tour ask on the site ends on one of them. */
export const CONTACT = {
  phonePrimary: '+91 99804 49921',
  phonePrimaryHref: 'tel:+919980449921',
  phoneSecondary: '+91 77602 10382',
  phoneSecondaryHref: 'tel:+917760210382',
  phoneTertiary: '+91 81476 87544',
  phoneTertiaryHref: 'tel:+918147687544',
  whatsapp: '+91 81476 87544',
  whatsappNumber: '918147687544',
  email: 'shivupackagetours@gmail.com',
  emailHref: 'mailto:shivupackagetours@gmail.com',
  hours: 'Monday to Saturday, 9:30 am – 7:30 pm',
  business: 'Shivu Package Tours',
  office: 'Plot no 28/B, Renuka Nagar, Khasbag, near Sanjay Gowdawath school, Belagavi',
  city: 'Belagavi, Karnataka 590005',
} as const

/* The office on the map. One query, typed once, and both the link and the
   embedded frame are built from it — a link that opens the map and a frame that
   shows the same pin can never drift apart.

   The owner's short link (maps.app.goo.gl) is what a visitor is sent to: it is
   their own published pin, so the directions are the office's rather than an
   address geocoded by someone else. It is not used as an embed source, because
   a share link is not an embeddable URL and Google refuses to render it inside
   a frame. The frame takes the Maps Embed API, which is the form designed to be
   framed, and records the search in the office's own name so the pin it lands on
   is the business itself rather than the nearest house number. */
export const MAP_QUERY = `${CONTACT.business}, ${CONTACT.office}, ${CONTACT.city}`
export const MAP_OFFICE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`
export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed&z=16`

/* ── Where a group can join from ───────────────────────────────────────────────
   One list, read by the hero search, the departures page and the FAQ, so a
   town is added in a single place. Belagavi is first because it is the home
   office and the default. The Karnataka towns are an evening's drive from
   Belagavi; Pune and Kolhapur are the two Maharashtra towns groups travel in
   from, and they join the coach on the route rather than reaching Belagavi
   first. */
export const departureCities = [
  'Belagavi',
  'Hubballi',
  'Dharwad',
  'Bagalkot',
  'Vijayapura',
  'Haveri',
  'Shivamogga',
  'Bengaluru',
  'Nipani',
  'Pune',
  'Kolhapur',
] as const

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}
