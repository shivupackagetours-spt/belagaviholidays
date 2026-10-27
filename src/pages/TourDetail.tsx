import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ContactStrip, TourCard } from '@/components/sections'
import { TourNotFound } from '@/components/TourNotFound'
import { ArrowLeft, Bed, Bus, CalendarDays, Check, MapPin, TriangleAlert, Utensils } from 'lucide-react'
import { CONTACT, waLink } from '@/data/company'
import { EnquiryForm } from '@/components/EnquiryForm'
import { tours, groupLabel, dayImage } from '@/data/tours'

/* What the standard package rate does not cover on every journey we plan.
   Stated plainly here, and repeated on the booking confirmation. */
const exclusions = [
  'Air, train or bus fare to the reporting point in Belagavi, unless the tour says otherwise',
  'Any meal not listed on the day-wise plan',
  'Entry tickets to monuments and parks, and camera or video charges',
  'Pony, palki, doli, raft or helicopter charges at shrines where they apply',
  'Personal expenses: laundry, telephone, tips, mineral water, room service',
  'Anything caused by weather, road closure, a delayed flight or a change made by an airline or hotel',
  'Travel insurance, unless the tour page says it is included',
]

const itineraryFaqs = [
  {
    q: 'Are the prices and departure dates on this page final?',
    a: 'No. Every price, date and seat count on this site is either marked as a demonstration or as on request. Nothing is bookable until the office confirms the figure, the date and the seats in writing.',
  },  {
    q: 'How do I hold a seat on a group departure?',
    a: 'Tell us the tour name and how many travellers are coming. The office confirms the departure and the amount to pay to hold your seats, and nothing is due before that confirmation.',
  },
  {
    q: 'Can we start from somewhere other than Belagavi?',
    a: 'Our groups are planned from Belagavi and the reporting point is confirmed with your booking. If you are joining from elsewhere in Karnataka or Maharashtra, ask — we will tell you the nearest point your group can be picked up from.',
  },
  {
    q: 'Do you arrange transport from Belagavi to the starting point?',
    a: 'Bus and transport-based tours are a large part of what we do. Ask what is included for the specific tour and we will state it plainly in writing before you pay anything.',
  },
]

export default function TourDetail() {
  const { slug } = useParams()
  const tour = tours.find((t) => t.slug === slug)
  const [showAllDays, setShowAllDays] = useState(false)

  if (!tour) {
    return <TourNotFound />
  }

  const related = tours.filter((t) => t.group === tour.group && t.slug !== tour.slug).slice(0, 3)
  const hero = tour.image
  const shot = '/images/tour-detail-second-photo.webp'
  const days = showAllDays ? tour.itinerary : tour.itinerary.slice(0, 3)
  const enquiryLink = waLink(
    `Hello Shivu Package Tours, I would like to enquire about ${tour.name} (${tour.days} days).`,
  )

  return (
    <>
      {/* route-meta: title and description set from the tour itself */}
      <Meta
        title={`${tour.name} · ${tour.days} days from Belagavi`}
        description={`${tour.summary} ${tour.days} days and ${tour.nights} nights, ${groupLabel[tour.group].toLowerCase()} tour planned from Belagavi.`}
      />
      <main id="main">
        <div className="container-content px-gutter pt-6">
          {/* The announcement sits inside main so nothing on the route falls
             outside a landmark. */}
          <p className="surface-card bg-ink text-ink-muted-strong font-label mb-4 px-4 py-2.5 text-[0.6875rem] tracking-[0.14em] uppercase">
            Demonstration fares — the office confirms every price and date.
          </p>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2 break-words [&>li]:min-w-0">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/tours" className="hover:text-foreground">
                  All tours
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={`/tours?group=${tour.group}`} className="hover:text-foreground">
                  {groupLabel[tour.group]}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {tour.name}
              </li>            </ol>
          </nav>
        </div>

        {/* ── The tour itself: photograph, the places it covers, and the one
               link to the office that actually works today ───────────────── */}
        <section className="container-content px-gutter grid gap-10 pt-6 pb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <figure>
              <img
                src={hero}
                alt={tour.imageAlt}
                width={1200}
                height={800}
                fetchPriority="high"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </figure>
            <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 [&>li]:min-w-0">
              <li className="col-span-2 md:col-span-1">
                <img
                  src={shot}
                  alt="Sunlight breaking through tall conifers onto the mossy forest floor"
                  width={547}
                  height={365}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-md object-cover"
                />
              </li>
              <li className="bg-ink text-ink-foreground flex flex-col justify-center rounded-md p-4">
                <span className="font-label text-[0.6875rem] tracking-[0.16em] text-ink-muted uppercase">
                  Journey
                </span>
                <span className="font-display mt-1 text-2xl">
                  15 days
                </span>
                <span className="text-ink-muted mt-1 text-sm">14 nights</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-label text-muted-foreground flex flex-wrap items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase">
              <span className="min-w-0 break-words">{groupLabel[tour.group]} · {tour.bestFor}</span>
            </p>
            <h1 className="font-display mt-3 text-3xl text-balance break-words md:text-[2.75rem]">{tour.name}</h1>
            <p className="mt-4 text-lg leading-relaxed break-words">{tour.summary}</p>

            {/* Four facts, each a dt/dd pair: the icon sits inside the dd so the
               definition list holds only its own terms and descriptions. */}
            <dl className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <dt className="font-label flex gap-3 text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                <Icon as={MapPin} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Places covered</span>
              </dt>
              <dd className="mt-1 min-w-0 text-sm break-words">{tour.places}</dd>
              <dt className="font-label flex gap-3 text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                <Icon as={CalendarDays} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Departures</span>
              </dt>
              <dd className="mt-1 text-sm">
                {tour.nextDeparture ?? 'Dates on request — ask the office'}
              </dd>

              <dt className="font-label flex gap-3 text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                <Icon as={Bus} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Reporting point : Belagavi</span>
              </dt>
              <dd className="mt-1 text-sm">{CONTACT.office}, Belagavi</dd>

              <dt className="font-label flex gap-3 text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                <Icon as={Bed} className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>Room sharing : 2 and 4 Sharing</span>
              </dt>
              <dd className="mt-1 min-w-0 text-sm break-words">
                {tour.priceOther
                  ? `${tour.priceOther.label} at ₹${tour.priceOther.amount.toLocaleString('en-IN')}, or twin sharing on request at a supplement`
                  : 'Twin sharing by default; single rooms on request at a supplement'}
              </dd>
            </dl>

            {/* No accent tint behind this panel: the small muted text on it fell
               under 4.5:1 against the saffron wash. The card surface it shares
               with the rest of the site is the one every tone here clears. */}
            <div className="surface-card mt-7 p-5">
              <p className="font-display text-xl">
                {tour.priceFrom === null ? 'Price on confirmation' : 'Two sharing a room ₹33,000 per person'}
              </p>
              {/* Where the office quotes two room bases, both appear here — the
                 wider sharing first, since that is the cheaper rate. */}
              {tour.priceFrom !== null && tour.priceOther ? (
                <p className="font-display mt-1 text-xl">
                  Four sharing room 28,000 per person
                </p>
              ) : null}
              {tour.priceFrom === null ? (
                <p className="mt-2 text-sm leading-relaxed">
                  We do not publish a figure on this page until the office has confirmed it for your
                  dates and your group size. Ask for {tour.name} and you will get the current rate,
                  what it includes, and what to pay to hold seats.
                </p>
              ) : (
                <>
                  {tour.priceFromNote ? (
                    <p className="text-muted-foreground mt-2 text-sm">{tour.priceFromNote}</p>
                  ) : null}
                  {tour.flyer ? (
                    <p className="font-label text-muted-strong mt-2 text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
                      {tour.flyer.note}
                    </p>
                  ) : null}
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    Seats are held only after the office confirms your departure in writing. Ask for{' '}
                    {tour.name} with your travel month and how many are travelling, and you will get the
                    seats, the hotels and the amount payable to hold them.
                  </p>
                </>
              )}
              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row">
                <Button asChild variant="accent" className="min-w-0 whitespace-normal">
                  <a href={enquiryLink} rel="noopener noreferrer" target="_blank">
                    Ask for the price on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="whitespace-normal">
                  <a href={CONTACT.phonePrimaryHref}>
                    <Icon as={CalendarDays} className="size-4" />
                    {CONTACT.phonePrimary}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Day by day, and the confirmed-blank state where a price would be */}
        <section className="bg-ink text-ink-foreground py-section">
        <div className="container-content px-gutter grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
              <h2 className="font-display text-3xl">Day by day</h2>
              <Link
                to="/faq"
                className="mt-4 inline-block text-sm font-medium text-gold underline underline-offset-4"
              >
                How written itineraries work
              </Link>
              <ol className="mt-8 flex flex-col gap-5">
                {days.map((day, i) => {
                  const open = showAllDays || i < 3
                  /* A collapsed day shows no picture, so it is not asked for one:
                     the lookup reads the day's own words, and every day of the
                     journey is offered the photograph of the place it names. */
                  const photo = open ? dayImage(tour, day) : null
                  /* The card sits on the ink band, so it paints its own raised-ink
                     ground rather than the site's white card surface: captions on
                     a white card on an ink band were dark text on dark. */
                  return (
                    <li key={day.title} className="overflow-hidden rounded-lg bg-ink-raised p-0">
                      <h3 className="font-label text-ink-foreground border-ink-foreground/10 border-b px-5 py-3 text-[0.6875rem] font-medium tracking-[0.16em] uppercase">
                        {day.day} — {day.title}
                      </h3>
                      {open ? (
                        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-5">
                          {photo ? (
                            <img
                              src={photo.src}
                              alt={photo.alt}
                              width={photo.width}
                              height={photo.height}
                              loading="lazy"
                              className="h-24 w-24 shrink-0 rounded-md object-cover"
                            />
                          ) : null}
                          <div className="min-w-0">
                            {day.blocks ? (
                              day.blocks.map((block) => (
                                <div key={block.label} className="not-first:mt-4">
                                   <p className="font-label text-caption-on-band text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
                                    {block.label}
                                  </p>
                                   <ul className="border-ink-foreground/25 mt-2 flex flex-col gap-1.5 border-l pl-4 text-sm">
                                    {block.items.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm leading-relaxed text-ink-foreground break-words">
                                {day.body}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-ink-muted p-5 text-sm">
                          Detail for this day comes with the confirmed itinerary.
                        </p>
                      )}
                    </li>
                  )
                })}
              </ol>
              {!showAllDays && tour.itinerary.length > 3 ? (
                <Button
                  variant="outline-on-ink"
                  className="mt-6"
                  onClick={() => setShowAllDays(true)}
                >
                  Show all {tour.itinerary.length} days
                </Button>
              ) : null}

              {tour.boardingPoints ? (
                <div className="rounded-lg bg-ink-raised p-6">
                  <h3 className="font-display text-xl">Boarding points</h3>
                  <p className="text-ink-muted mt-2 text-sm">
                    The coach halts at these towns and cities on its way north. Ask the office to
                    hold your seats at the one nearest you.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tour.boardingPoints.map((point) => (
                      <li
                        key={point}
                        className="border-ink-foreground/20 bg-ink text-ink-muted font-label rounded-md border px-3 py-1.5 text-xs tracking-[0.08em] uppercase"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-5">
              <div className="surface-card p-6">
                <h2 className="font-display text-xl">On the tour</h2>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {tour.highlights.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Icon as={Check} className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card p-6">
                <h2 className="font-display text-xl">What is not included</h2>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {exclusions.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Icon as={Utensils} className="mt-0.5 size-4 shrink-0 text-icon-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card border-destructive/40 p-6">
                <h2 className="font-display flex items-center gap-2 text-xl">
                  <Icon as={TriangleAlert} className="size-5 text-destructive" />
                  Before you book
                </h2>
                <p className="mt-3 text-sm leading-relaxed">
                  Package inclusions, prices and seat availability must be confirmed by Shivu Package
                  Tours before any booking. Nothing on this page is an offer, and no amount is payable
                  until the office confirms your departure in writing.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Cancellation and refund follow a written policy —{' '}
                  <Link to="/cancellation" className="text-primary underline underline-offset-4">
                    read it before you pay
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-ink text-ink-foreground rounded-lg p-6 shadow-raised">
                <h2 className="font-display text-xl text-ink-foreground">Prefer to talk?</h2>
                <p className="text-ink-muted mt-2 text-sm">
                The same person who answers WhatsApp plans the tour. Ask for {tour.name} and mention
                  how many are travelling.
                </p>
                <Button asChild variant="accent" className="mt-5 w-full">
                  <a href={enquiryLink} rel="noopener noreferrer" target="_blank">
                    Enquire about {tour.name}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Instructions and questions ───────────────────────────────────── */}
        <section className="container-content px-gutter py-section grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="min-w-0">
            <h2 className="font-display text-3xl">Travelling well</h2>
            <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed">
              <li>
                <strong className="font-medium">Carry the originals.</strong> A government photo ID for
                every traveller, and the school ID for a child. International tours need a passport
                valid for at least six months beyond the return date.
              </li>
              <li>
                <strong className="font-medium">Watch the weather.</strong> The hill routes run cold for
                most of the year and some temple circuits get very hot. We tell you what to pack for
                the dates you choose, not for the season in general.
              </li>
              <li>
                <strong className="font-medium">Arrive at the reporting point early.</strong> Group
                coaches leave at the stated time, and the office confirms the exact point and time the
                day before.
              </li>
              <li>
                <strong className="font-medium">Tell us about medications.</strong> If anyone in the
                group has a condition, a mobility need or a strict diet, say so when you enquire and we
                plan the pace and the meals around it.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl">Questions about this tour</h2>
            <Accordion type="single" collapsible className="mt-6">
              {itineraryFaqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="[&>svg]:text-icon-muted text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-caption-on-band">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link to="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Icon as={ArrowLeft} className="size-4" />
              All questions about booking with us
            </Link>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="bg-ink py-section text-ink-foreground">
            <div className="container-content px-gutter">
              <h2 className="font-display text-ink-foreground text-3xl text-balance break-words">
                Other {groupLabel[tour.group].toLowerCase()} journeys
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&>li]:min-w-0">
                {related.map((t) => (
                  <li key={t.slug}>
                    <TourCard tour={t} />
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline-on-ink" className="mt-8 whitespace-normal">
                <Link to="/tours">See the whole catalogue</Link>
              </Button>
            </div>
          </section>
        ) : null}

        {/* ── Enquiry ─────────────────────────────────────────────────────── */}
        <section className="bg-muted py-section">
          <div className="container-content px-gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl text-balance md:text-4xl">Ask about {tour.name}</h2>
              <p className="text-muted-foreground mt-4 max-w-measure">
                Tell us your dates and how many are travelling. We reply with the departure that fits,
                what it costs at the group rate, and how many seats are left.
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                <li className="flex gap-2.5">
                  <Icon as={Check} className="text-primary mt-0.5 size-4 shrink-0" />
                  Answered during office hours
                </li>
                <li className="flex gap-2.5">
                  <Icon as={Check} className="text-primary mt-0.5 size-4 shrink-0" />
                  Hotel options put in writing
                </li>
                <li className="flex gap-2.5">
                  <Icon as={Check} className="text-primary mt-0.5 size-4 shrink-0" />
                  A day-wise itinerary with rooms and meals for your dates
                </li>
              </ul>
            </div>
            <EnquiryForm defaults={{ destination: tour.name }} />
          </div>
        </section>

        <ContactStrip />
      </main>
    </>
  )
}
