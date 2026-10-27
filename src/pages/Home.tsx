import { Link } from 'react-router'
import { useRef } from 'react'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { ContactStrip, DemoNote, FaqList, FlyerStrip, FlyerFeature, SectionHeading, ThemeBoard, TourCard, WhyUs, faqs } from '@/components/sections'
import { HeroSearch } from '@/components/EnquiryForm'
import { TrustBar } from '@/components/TrustBar'
import { RatingDisplay } from '@/components/ReviewStars'
import { useReveal } from '@/lib/useReveal'
import { ArrowRight, Clock, MapPin, Sparkles, Users } from 'lucide-react'
import { CONTACT, waLink } from '@/data/company'
import { domesticCategories, featureFlyerSlug, flyerTours, groupLabel, internationalCategories, pilgrimageCategories, tourBySlug, tours } from '@/data/tours'
import { cn } from '@/lib/utils'

/* The office's Google reviews, printed word for word with the traveller's own
   name on them, which is what the review itself asks for. They are typed out
   here rather than fetched, because there is nowhere for this site to fetch from
   and a review that cannot be read is not a review. */
const googleReviews: {
  name: string
  meta: string
  tour: string
  /* The package the review is about, where the catalogue has one. A review of a
     journey this site sells is worth nothing to the next traveller unless it
     leads to that journey, so the sentence that names the tour carries the link
     to it. The flyer tours are the ones with prices and dates, which is what a
     reviewer actually travelled on. */
  slug?: string
  rating: number
  body: string[]
  photos?: { src: string; alt: string }[]
}[] = [
  {
    name: 'Pankaj Chawan',
    meta: '3 reviews · 7 photos · a year ago',
    tour: 'the Thailand group departure',
    slug: 'thailand-phuket-krabi',
    rating: 5,
    body: [
      '"I highly recommend this tour to others."',
      '"This was a fantastic trip that exceeded my expectations."',
      '"The overall experience was enriching and inspiring."',
      '"I felt safe and well taken care of throughout the tour."',
    ],
  },
  {
    name: 'Shivaputra Huded',
    meta: 'Edited 5 months ago',
    tour: 'the Nepal group departure',
    slug: 'nepal-kathmandu-pokhara',
  rating: 5,
  photos: [
      {
        src: '/images/nepal-pokhara-phewa-lake-annapurna.webp',
        alt: 'Colourful wooden boats drawn up on the shore of Phewa Lake at Pokhara, the snow line of the Annapurnas across the water',
      },
      {
        src: '/images/nepal-group-travellers-himalaya-view.webp',
        alt: 'Travellers from the group standing at a Himalayan viewpoint looking out over the snow peaks',
      },
      {
        src: '/images/kathmandu-durbar-square-temple.webp',
        alt: 'A carved Newari temple in the courtyard of Kathmandu Durbar Square',
      },
    ],
    body: [
      'We couple Shivaputra Huded and Rajeshree Huded enjoyed it. The photos and videos captured during the trip were also fantastic and helped make the memories even more special.',
      'Highly recommended Shivu Package Tours for anyone planning a trip. Looking forward to travelling again with them!',
      'Had an amazing experience with Shivu Package Tours during our Nepal tour. The entire trip was very well organized, and everything from travel to hotel arrangements was managed smoothly.',
      'Special thanks to Shubham for managing the tour so professionally and making sure everyone was comfortable throughout the journey. His coordination and support made the whole experience stress-free and enjoyable.',
    ],
  },
]

export default function Home() {
  /* The Kerala backwaters journey is the office's own choice of package to
     show on the home page, so it takes the last tile whatever else moves. */
  const kerala = tourBySlug('kerala-backwaters')
  /* The deluxe South India circuit is the office's newest confirmed departure,
     so it keeps a tile in the grid whatever else moves around it. */
  const southDeluxe = tourBySlug('south-india-deluxe-tour')
  const featured = [tours[0], tours[2], tours[6], southDeluxe, tours[8], tours[11], tours[3], kerala].filter(
    (t): t is NonNullable<typeof t> => t !== undefined,
  )
  /* The priced, dated departures travel as horizontal bands; the flyer that leads
     them as a full-width feature is the office's own choice of lead package. */
  const featureTour = flyerTours.find((t) => t.slug === featureFlyerSlug) ?? flyerTours[0]
  const strips = flyerTours.filter((t) => t.slug !== featureTour.slug).slice(0, 5)

  /* A review of a package this site sells leads to that package. If the office
     later renames a slug, the review keeps its traveller and its words and only
     the link goes — the figure is never dropped for a moved href. */
  const reviewTour = (slug?: string) => (slug ? tourBySlug(slug) : undefined)

  /* The category board is the site's navigation, so it arrives in reading order:
     the lead tile that carries the photograph first, then the row it sits in,
     each further row a beat behind. The delay is a function of the row rather
     than the index, so the stagger says "this is a grid" and never turns into a
     queue a visitor waits through. */
  const boardRef = useRef<HTMLUListElement>(null)
  const boardShown = useReveal(boardRef)
  const tileRise = cn(
    'transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
    boardShown
      ? 'translate-y-0 opacity-100'
      : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
  )

  /* The catalogue band opens slowly around the cards it holds, rather than
     snapping in with them. A slow centre-out arrival, a little sooner than the
     flyers' own, so the ground has settled by the time they are read. */
  const bandRef = useRef<HTMLDivElement>(null)
  const bandShown = useReveal(bandRef, '0px 0px 4% 0px')

  /* The family-trip photograph arrives the same unhurried way the catalogue
   does, a little sooner, so the picture has settled by the time the copy
   beside it is read. */
  const splitRef = useRef<HTMLDivElement>(null)
  const splitShown = useReveal(splitRef, '0px 0px 6% 0px')
  const splitRise = cn(
    'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
    splitShown
      ? 'translate-y-0 opacity-100'
      : 'translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
  )
  return (
    <>
      <Meta
        title="Shivu Package Tours — India and international tour packages from Belagavi"
        description="Group tours, pilgrimage yatras, family holidays and customised trips planned in Belagavi for travellers across Karnataka and Maharashtra. Enquire on WhatsApp."
      />

      <main id="main">
        {/* ── First screen: the destination is the subject, the search panel is
               the product, and the panel sits inside the photograph with the
               five fields a visitor actually arrives with all in one view. ─── */}
        <section className="bg-ink relative flex flex-col text-ink-foreground md:min-h-[min(50rem,92svh)]">
          <img
            src="/images/kashmir-himalayan-valley.webp"
            alt="A river valley between high Himalayan slopes opening towards a distant peak"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center"
          />
          {/* The wash has two jobs: it makes the headline legible and it leaves
              the photograph legible. It runs flat and deep across the frame at
              narrow widths, where the copy sits over the whole picture, then
              thins to the right from md up, where the copy has a column of its
              own and the valley behind it can be seen. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklch, var(--ink) 94%, transparent), color-mix(in oklch, var(--ink) 88%, transparent) 40%, color-mix(in oklch, var(--ink) 84%, transparent))',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                'linear-gradient(to right, color-mix(in oklch, var(--ink) 90%, transparent) 0%, color-mix(in oklch, var(--ink) 70%, transparent) 50%, color-mix(in oklch, var(--ink) 26%, transparent) 100%)',
            }}
          />
          {/* A soft teal glow behind the headline ties the photograph to the
              action colour without tinting the whole frame. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(32rem 26rem at 12% 22%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%)',
            }}
          />

          <div className="container-content px-gutter relative z-10 pt-14 pb-10 md:pt-24">
            <div className="max-w-[46rem] [&>*]:animate-[rise-in_620ms_ease-out_both] motion-reduce:[&>*]:animate-none">
              <p
                className="font-label text-ink-foreground flex items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase"
                style={{ animationDelay: '80ms' }}
              >
                <Icon as={MapPin} className="size-4 text-gold" />
                Group tours leaving from Belagavi
              </p>
              <h1
                className="mt-5 text-[length:var(--hero-mobile)] text-ink-foreground text-balance md:text-[length:var(--hero-size)]"
                style={{ animationDelay: '180ms' }}
              >
                SHIVU PACKAGE TOURS
              </h1>
              <p
                className="font-label text-ink-foreground mt-3 text-sm tracking-[0.18em] uppercase"
                style={{ animationDelay: '240ms' }}
              >
                Your comfort is our priority
              </p>
              <p
                className="text-ink-foreground mt-5 text-xl md:text-2xl"
                style={{ animationDelay: '260ms' }}
              >
                Discover India. Explore the world.
              </p>
               <p className="text-ink-foreground mt-6 max-w-[34rem] text-lg" style={{ animationDelay: '300ms' }}>
                 Memorable journeys, thoughtfully planned from Belagavi to destinations across India
                 and around the world.
               </p>
              {/* Held at the hero's full foreground rather than the softer ink
                  tone: this line sits over the photograph, and the softened
                  grey is the one step the picture underneath can eat. */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '420ms' }}>
                <Button asChild size="lg" className="h-12">
                  <Link to="/tours">Explore tour packages</Link>
                </Button>
                <Button asChild size="lg" variant="accent" className="h-12">
                  <a href={waLink('Hello Shivu Package Tours, please help me plan a tour.')} rel="noopener noreferrer" target="_blank">
                    Enquire on WhatsApp
                  </a>
                </Button>
              </div>
               <p
                 className="text-ink-foreground mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
                style={{ animationDelay: '520ms' }}
              >
                <span className="flex items-center gap-2">
                   <Icon as={Clock} className="size-4 text-ink-foreground" />
                   {CONTACT.hours}
                </span>
                <a href={CONTACT.phonePrimaryHref} className="underline underline-offset-4 hover:text-ink-foreground">
                  {CONTACT.phonePrimary}
                </a>
                <a href={CONTACT.phoneTertiaryHref} className="underline underline-offset-4 hover:text-ink-foreground">
                  {CONTACT.phoneTertiary}
                </a>
              </p>
            </div>
          </div>

          {/* The panel is the last thing in the hero's own flow and sits at the
              foot of the photograph, so it can never cover the section below
              it. At 360 it clears the fixed call bar; from md the hero is tall
              enough to hold the panel and the vertical gap above it. */}
          <div
            className="container-content px-gutter relative z-10 mt-12 pb-24 md:mt-auto md:pb-10"
            style={{ animation: 'rise-in 640ms ease-out both', animationDelay: '620ms' }}
          >
            <div className="mb-4 hidden items-end justify-between gap-6 md:flex">
              <p className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.2em] uppercase">
                Tell us where and when — we will tell you the dates
              </p>
            </div>
            <HeroSearch />
          </div>
        </section>

        {/* ── Upcoming departures: a list, on ink, until real dates arrive ─── */}
        <section className="container-content px-gutter py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Departures"
              title="Upcoming tours from Belagavi"
              body="Every group starts and ends in Belagavi, with the reporting point confirmed on your booking."
            />
            <Link to="/departures" className="text-primary inline-flex items-center gap-2 text-sm font-medium">
              See the departures calendar
              <Icon as={ArrowRight} className="size-4 text-primary" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="border-border bg-card text-card-foreground shadow-raised rounded-lg border p-6 md:p-8">
              <h3 className="font-label text-[0.6875rem] tracking-[0.2em] text-muted-foreground uppercase">
                Dates published so far
              </h3>
              <p className="mt-4 text-lg leading-relaxed">
                The dated departures below are confirmed. The rest of the calendar — with prices and
                seats — is being loaded onto this site now.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For any tour still marked on request, the office will tell you exactly which group
                leaves next. Ask and we will send the dates the same working day.
              </p>
              <Button asChild className="mt-7">
                <a href={waLink('Hello Shivu Package Tours, please send me the upcoming departure dates.')} rel="noopener noreferrer" target="_blank">
                  Ask for departure dates
                </a>
              </Button>
            </div>

            <ul className="flex flex-col">
              {[tours[0], tours[2], tours[6]].map((tour) => (
                <li key={tour.slug} className="flex items-center justify-between gap-4 border-b border-border py-4 first:pt-0 last:border-b-0">
                  <div>
                    <Link to={`/tours/${tour.slug}`} className="font-medium hover:text-primary">
                      {tour.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {tour.days} days · {tour.places.split(' · ')[0]}
                    </p>
                  </div>
                  <span className="font-label shrink-0 text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {tour.nextDeparture ?? 'On request'}
                  </span>
                </li>
              ))}
              <li className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Plus Shirdi, Ashtavinayak, Rajasthan, Goa and the international departures.{' '}
                  <Link to="/tours" className="text-primary underline underline-offset-4">
                    See every tour
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ── The catalogue itself, with the demonstration notice stated once ─ */}
        <section className="bg-ink text-ink-foreground relative overflow-hidden py-section">
          {/* The band's own arrival: the tint it sits on opens out from the centre
              as the section comes into view, slowly, once. Decorative, so it is
              hidden from a screen reader and taken out entirely on request. */}
          <div
            ref={bandRef}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 hidden motion-reduce:hidden md:block',
              bandShown ? 'animate-[band-open_1600ms_ease-out_both]' : 'opacity-0',
            )}
            style={{
              background:
                'radial-gradient(48rem 30rem at 50% 12%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 68%)',
            }}
          />
          <div className="relative container-content px-gutter">
            <div
              className={cn(
                'flex flex-wrap items-end justify-between gap-6 transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                bandShown
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
              )}
            >
              <SectionHeading label="" tone="ink" title="Journeys we run from Belagavi" />
              <Button
                asChild
                variant="outline"
                className="border-ink-foreground/30 text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground bg-transparent"
              >
                <Link to="/tours">See all tour packages</Link>
              </Button>
            </div>
            <DemoNote className="mt-6 max-w-full" tone="ink" />

            {/* The priced, dated departures lead the section. Five travel as
                horizontal bands on the warm ground; the longest circuit takes the
                full width on the ink, so the sequence changes shape twice. Each
                settles in a beat behind the one above it. */}
            <div className="mt-10 flex flex-col gap-6">
               {strips.map((tour, i) => (
                <FlyerStrip key={tour.slug} tour={tour} index={i} tone="ink" />
              ))}
            </div>

            <FlyerFeature tour={featureTour} className="mt-6" />

            {/* The covers are the last shape in the section: the same photographs
               on ink rather than the warm ground, because this band is the site's
               change of key and the white card surface is not a colour it has. */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((tour) => (
                <TourCard key={tour.slug} tour={tour} tone="ink" />
              ))}
            </div>
          </div>
        </section>

        {/* ── Who the journey is for, now read after the catalogue it filters ── */}
        <section className="container-content px-gutter py-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Who it is for"
              title="Start from the kind of journey, not the place"
              body="Most visitors know who is travelling before they know where. Each of these leads into the catalogue already filtered."
            />
            <Link
              to="/tours"
              className="text-primary inline-flex items-center gap-2 text-sm font-medium"
            >
              See the whole catalogue
              <Icon as={ArrowRight} className="size-4 text-primary" />
            </Link>
          </div>
          <ThemeBoard className="mt-10" />
        </section>

        {/* ── The category board, which is also how the catalogue is navigated ─ */}
        <section className="container-content px-gutter pb-section">
          <SectionHeading
            label="Where we go"
            title="Choose a destination, or tell us one of your own"
            body="Tap any card to see the tours we run there. Nothing on this list is a fixed package — every one of them can be rebuilt around your dates and your group."
          />

          <h3 className="font-label mt-10 text-[0.6875rem] tracking-[0.2em] text-muted-foreground uppercase">
            India
          </h3>
          <ul ref={boardRef} className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {domesticCategories.map((c, i) => {
              const lead = i === 0
              /* Rows, not cards: the lead tile holds the first two, everything
                 else falls into the row it is read in. */
              const row = lead ? 0 : Math.floor((i + 1) / 2)
              return (
                <li
                  key={c.name}
                  className={cn(lead && 'col-span-2 row-span-2 md:col-span-2 md:row-span-2', tileRise)}
                  style={{ transitionDelay: `${row * 90}ms` }}
                >
                  <Link
                    to={c.to}
                    className={cn(
                      'group border-border relative flex h-full min-h-[7rem] flex-col justify-end overflow-hidden rounded-lg border bg-secondary p-4 transition-[border-color,box-shadow] duration-200 ease-out hover:shadow-raised',
                      lead ? 'hover:border-border' : 'hover:border-primary',
                    )}
                  >
                    {lead ? (
                      <>
                        <img
                          src="/images/shimla-manali-snow-village.webp"
                          alt="A snow-covered village in the Manali valley below the Himalaya"
                          width={900}
                          height={900}
                          loading="lazy"
                          className={cn(
                            'absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
                            boardShown ? 'scale-100 opacity-100' : 'scale-105 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100',
                          )}
                          style={{ transitionDelay: boardShown ? '0ms' : undefined }}
                        />
                      </>
                    ) : (
                      /* A hairline of the action colour drawn up from the base:
                         it grows on hover and on keyboard focus, so a visitor
                         who never uses a mouse sees the same answer. */
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                      />
                    )}
                    <span className={lead ? 'relative rounded-md bg-card px-3 py-2' : 'relative'}>
                      <span
                        className={
                          lead
                            ? 'font-display block text-2xl text-foreground'
                            : 'font-display block text-lg text-foreground transition-colors duration-200 ease-out group-hover:text-primary'
                        }
                      >
                        {c.name}
                      </span>
                      <span
                        className={
                          lead
                            ? 'mt-1 block text-sm text-muted-foreground'
                            : 'mt-1 block text-xs text-muted-foreground'
                        }
                      >
                        {c.note}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-label text-[0.6875rem] tracking-[0.2em] text-muted-foreground uppercase">
                Pilgrimage
              </h3>
              <ul className="mt-4 flex flex-col">
                {pilgrimageCategories.slice(0, 6).map((c) => (
                  <li key={c.name} className="border-b border-border last:border-b-0">
                    <Link to={c.to} className="group flex items-baseline justify-between gap-4 py-3.5">
                      <span className="font-medium group-hover:text-primary">{c.name}</span>
                      <span className="text-right text-xs text-muted-foreground">{c.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/tours?group=pilgrimage" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                All pilgrimage yatras
                <Icon as={ArrowRight} className="size-4 text-primary" />
              </Link>
            </div>

            <div>
              <h3 className="font-label text-[0.6875rem] tracking-[0.2em] text-muted-foreground uppercase">
                International
              </h3>
              <ul className="mt-4 flex flex-col">
                {internationalCategories.slice(0, 6).map((c) => (
                  <li key={c.name} className="border-b border-border last:border-b-0">
                    <Link to={c.to} className="group flex items-baseline justify-between gap-4 py-3.5">
                      <span className="font-medium group-hover:text-primary">{c.name}</span>
                      <span className="text-right text-xs text-muted-foreground">{c.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/tours?group=international" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                All international tours
                <Icon as={ArrowRight} className="size-4 text-primary" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Family, group and customised trips: a split, media beside text ── */}
        <section className="container-content px-gutter py-section">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div ref={splitRef} className={cn('relative', splitRise)}>
              <img
                src="/images/kerala-backwaters-houseboat.webp"
                alt="A houseboat moored on a palm-lined backwater canal in Kerala"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div>
              <SectionHeading
                label="Customised"
                title="A group of four, or a coach of forty"
                body="Most of what this office does in a year is not a fixed departure. It is a family who want their own dates, friends who want their own route, or a temple circuit built around one festival."
              />
              <ul className="mt-7 flex flex-wrap gap-2">
                {['Family holidays', 'Honeymoon packages', 'Senior citizen groups', 'Group bus tours'].map(
                  (kind) => (
                    <li
                      key={kind}
                      className="border-border bg-secondary text-secondary-foreground rounded-full border px-3.5 py-1.5 text-sm"
                    >
                      {kind}
                    </li>
                  ),
                )}
              </ul>
              <ul className="mt-8 flex flex-col gap-5">
                <li className="flex gap-4">
                  <Icon as={Users} className="mt-0.5 size-5 text-primary" />
                  <span>
                    <strong className="font-medium">Your dates, your pace.</strong>{' '}
                    <span className="text-muted-foreground">
                      We plan around the school holidays, the office leave and how far the elders in
                      the group can travel in a day.
                    </span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Icon as={Sparkles} className="mt-0.5 size-5 text-primary" />
                  <span>
                    <strong className="font-medium">Honeymoon and short trips.</strong>{' '}
                    <span className="text-muted-foreground">
                      Villa stays, island days and weekend escapes to Goa, Coorg and Chikmagalur.
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/customised">Plan a customised holiday</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={CONTACT.phoneSecondaryHref}>Call {CONTACT.phoneSecondary}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why travel with us: editorial, numbered because the order matters */}
        <section className="bg-ink py-section text-ink-foreground">
          <div className="container-content px-gutter">
            <SectionHeading
              tone="ink"
              label="Why us"
              title="Your Comfort Is Our Priority is not a line we print on a folder"
              body="It is what the person who answers your call is accountable for, from the first enquiry to the last drop-off in Belagavi."
            />
            <div className="mt-12 text-ink-foreground [&_h3]:text-ink-foreground">
              <WhyUs tone="ink" />
            </div>
            {/* The ask gets its own plate on the ink band: a raised ground under
                the two actions so they read as the closing panel of the band,
                rather than two controls floating at the foot of the list. */}
            <div className="bg-card text-card-foreground shadow-raised mt-12 rounded-lg p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <a href={waLink('Hello Shivu Package Tours, I would like to talk to someone about a tour.')} rel="noopener noreferrer" target="_blank">
                  Talk to us on WhatsApp
                </a>
              </Button>
                <Button asChild size="lg" variant="outline" className="whitespace-normal border-foreground/25 text-foreground hover:bg-secondary hover:text-foreground">
                  <Link to="/reviews">Read customer reviews</Link>
              </Button>
            </div>
            </div>
          </div>
        </section>

        {/* ── The figures band, closing the argument the Why-us band makes.
               Counts derived from the catalogue, so nothing here is a number the
               office has not confirmed ──────────────────────────────────────── */}
        <TrustBar className="bg-ink py-section" />

        {/* ── Reviews: the office's Google reviews, printed as they were sent,
               beside the form the next traveller uses to send their own. ───── */}
        <section className="container-content px-gutter pt-section pb-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <SectionHeading
              label="Reviews"
              title="Reviews go up here with the traveller's name on them"
              body="Taken word for word from our Google page, where you can read every review and the replies underneath. We publish a traveller's sentences with their name on them, or not at all."
            />
            <div className="flex flex-col gap-6">
              {googleReviews.map((review) => (
                <figure key={review.name} className="border-border bg-card text-card-foreground shadow-raised rounded-lg border p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="bg-primary text-primary-foreground font-display grid size-11 shrink-0 place-items-center rounded-full text-lg font-semibold"
                    >
                      {review.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <figcaption className="font-medium">{review.name}</figcaption>
                      <p className="text-muted-foreground mt-0.5 text-sm">{review.meta}</p>
                      <span className="mt-2 flex items-center gap-2">
                        <RatingDisplay value={review.rating} withLabel={false} />
                        <span className="sr-only">{`${review.rating} out of 5`}</span>
                      </span>
                      {(() => {
                        const t = reviewTour(review.slug)
                        /* The completed line: the kind of journey the reviewer
                           travelled, the days, and — where the catalogue has
                           one — the way into that package. */
                        return t ? (
                          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            <span className="text-muted-foreground">{groupLabel[t.group]}</span>
                            <span aria-hidden="true" className="text-muted-foreground">
                              ·
                            </span>
                            <span className="text-muted-foreground">
                              {t.days} days / {t.nights} nights
                            </span>
                            <span aria-hidden="true" className="text-muted-foreground">
                              ·
                            </span>
                            <Link
                              to={`/tours/${t.slug}`}
                              className="text-primary underline underline-offset-4"
                            >
                              See this tour
                            </Link>
                          </p>
                        ) : null
                      })()}
                    </div>
                  </div>
                  <blockquote className="mt-5 flex flex-col gap-4 leading-relaxed">
                    {review.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </blockquote>
                  {review.photos ? (
                    <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                      {review.photos.map((photo) => (
                        <li key={photo.src} className="bg-muted overflow-hidden rounded-md">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            width={900}
                            height={675}
                            loading="lazy"
                            className="aspect-[4/3] size-full object-cover"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="border-border text-muted-foreground mt-5 border-t pt-4 text-sm">
                    {review.photos ? 'Photographs sent with the review · ' : ''}
                    Google review on {review.tour}
                  </p>
                </figure>
              ))}

              <div className="border-border text-card-foreground shadow-raised rounded-lg border bg-muted p-6 md:p-8">
                <p className="font-label text-primary text-[0.6875rem] tracking-[0.2em] uppercase">
                  Your turn
                </p>
                <p className="mt-4 leading-relaxed">
                  If you have travelled with us, send your feedback on WhatsApp and it goes up here —
                  with your name, and only if you are happy for it to.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="accent">
                    <a href={waLink('Hello Shivu Package Tours, I travelled with you and would like to share feedback.')} rel="noopener noreferrer" target="_blank">
                      Send your feedback
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/reviews">About our reviews</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Questions ─────────────────────────────────────────────────────── */}
        <section className="bg-secondary py-section">
          <div className="container-content px-gutter">
            <SectionHeading
              label="Before you book"
              title="Questions we are asked most"
              body="If yours is not here, ask it on WhatsApp — you will get an answer the same day, not a brochure."
            />
            <div className="mt-2 max-w-[52rem]">
              <FaqList items={faqs.slice(0, 6)} />
            </div>
            <Link to="/faq" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              All questions
              <Icon as={ArrowRight} className="size-4 text-primary" />
            </Link>
          </div>
        </section>

        <ContactStrip to="/contact" />
      </main>
    </>
  )
}
