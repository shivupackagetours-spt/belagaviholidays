import { Link } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { ContactStrip, PageHead, SectionHeading } from '@/components/sections'
import { tourImages } from '@/data/tours'
import { CONTACT, waLink } from '@/data/company'

const shots: { src: string; alt: string; w: number; h: number; caption: string; span?: boolean }[] = [
  {
    src: '/images/kashmir-himalayan-valley.webp',
    alt: 'A river winding through a bare Himalayan valley under a wide sky',
    w: 1600,
    h: 900,
    caption: 'Himalayan valley',
    span: true,
  },
  {
    src: '/images/kerala-backwaters-houseboat.webp',
    alt: 'A houseboat moving along a palm-lined backwater in Kerala',
    w: 1600,
    h: 900,
    caption: 'Kerala backwaters',
  },
  {
    src: '/images/hampi-vijaya-vittala-temple.webp',
    alt: 'The stone chariot in the courtyard of a Vijayanagara temple at Hampi',
    w: 1600,
    h: 900,
    caption: 'Hampi, Karnataka',
  },
  {
    src: '/images/kashi-ganga-ghats-varanasi.webp',
    alt: 'Boats on the Ganges below the stepped ghats at Varanasi',
    w: 1600,
    h: 900,
    caption: 'Ganga ghats, Varanasi',
  },
  {
    src: '/images/shirdi-temple-crowd-devotees.webp',
    alt: 'Devotees gathered at the temple complex in Shirdi',
    w: 1600,
    h: 900,
    caption: 'Shirdi, Maharashtra',
    span: true,
  },
  {
    src: '/images/thailand-longtail-boat-islands.webp',
    alt: 'A longtail boat crossing turquoise water beside limestone islands in Thailand',
    w: 1600,
    h: 900,
    caption: 'Thailand',
  },
  {
    src: '/images/dubai-skyline-burj-khalifa.webp',
    alt: 'The Dubai skyline at dusk with the tallest tower lit above the city',
    w: 1600,
    h: 900,
    caption: 'Dubai',
  },
  {
    src: '/images/singapore-marina-bay-skyline.webp',
    alt: 'The Singapore waterfront lit at night beneath three towers',
    w: 1600,
    h: 900,
    caption: 'Singapore',
  },
  {
    src: '/images/bali-rice-terrace-temple.webp',
    alt: 'Green rice terraces on a hillside in Bali',
    w: 1600,
    h: 900,
    caption: 'Bali',
  },
  {
    src: '/images/rajasthan-jaipur-hawa-mahal.webp',
    alt: 'The pink sandstone facade of Hawa Mahal in Jaipur',
    w: 1600,
    h: 900,
    caption: 'Jaipur, Rajasthan',
  },
  {
    src: '/images/goa-palm-beach-shoreline.webp',
    alt: 'Palm trees leaning over a sandy beach on the Goan coast',
    w: 1600,
    h: 900,
    caption: 'Goa',
  },
  {
    src: '/images/andaman-clear-water-island.webp',
    alt: 'Clear turquoise water and pale sand on an Andaman island',
    w: 1600,
    h: 900,
    caption: 'Andaman Islands',
  },
]

export default function Gallery() {
  return (
    <>
      <Meta
        title="Destination gallery"
        description="Photographs of the places Shivu Package Tours travels to — the Himalaya, Kerala's backwaters, the temple towns of India, and destinations abroad."
      />
      <main id="main">
        <PageHead
          label="Gallery"
          title="The places on the itinerary"
          body="A look at the destinations our Belagavi groups travel to. Board at 360, so the photographs fill the phone screen rather than sit in a column."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/gallery', label: 'Gallery' },
          ]}
        />

        <section className="container-content px-gutter pb-section">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((s, i) => (
              <li
                key={s.src}
                className={
                  'group relative overflow-hidden rounded-lg' +
                  (s.span ? ' sm:col-span-2' : '')
                }
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  className={
                    'w-full rounded-lg object-cover transition-transform duration-[320ms] ease-out group-hover:scale-[1.03] ' +
                    (s.span ? 'h-64 sm:h-80' : 'h-64')
                  }
                />
                <span className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-3 py-1 font-label text-[0.6875rem] tracking-[0.14em] text-ink-foreground uppercase">
                  {s.caption}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Destination photographs, not customer albums. If you travelled with us and want your own
            pictures shown here, send them in and tell us it is fine to publish them.
          </p>
        </section>

        <section className="bg-secondary/60 py-section">
          <div className="container-content px-gutter">
            <SectionHeading
              label="From our groups"
              title="Your photographs, with your permission"
              body="We publish pictures taken on our tours only when the traveller says we may. There are none on this site yet, and we would rather show an empty shelf than a borrowed one."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="accent">
                <a
                  href={waLink('Hello Shivu Package Tours, I travelled with you and would like to share my photographs.')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Send your tour photographs
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={CONTACT.phonePrimaryHref}>Call {CONTACT.phonePrimary}</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Covered {tourImages.length} destinations so far —{' '}
              <Link to="/tours" className="text-primary underline underline-offset-4 hover:text-foreground">
                see the tours that visit them
              </Link>
              .
            </p>
          </div>
        </section>

        <ContactStrip />
      </main>
    </>
  )
}
