/* Shared page sections. Each is composed for the page it sits on rather than
   configured from a library, so no two pages share the same shape twice. */
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  HeartHandshake,
  Info,
  MapPin,
  PenLine,
  PhoneCall,
  Route,
  Users,
} from 'lucide-react'
import { CONTACT, waLink } from '@/data/company'
import type { Tour } from '@/data/tours'
import { regions, themes, tours } from '@/data/tours'
import { useReveal } from '@/lib/useReveal'
import { StarGlyph } from '@/components/ReviewStars'
import { cn } from '@/lib/utils'

/* The one reveal the shared sections share: the element lifts a few pixels as
   it arrives, once, and stays put. Reduced motion starts it shown, so nothing
   here can leave content invisible. */
function useRise<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)
  const shown = useReveal(ref)
  return {
    ref,
    shown,
    className: cn(
      'transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
      shown
        ? 'translate-y-0 opacity-100'
        : 'translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
    ),
    style:
      delay && !shown
        ? ({ transitionDelay: `${delay}ms` } as React.CSSProperties)
        : undefined,
  }
}

/* ── The masthead every inner page opens with ───────────────────────────── */
export function PageHead({
  label,
  title,
  body,
  breadcrumb,
  children,
}: {
  label: string
  title: string
  body?: React.ReactNode
  breadcrumb?: { to: string; label: string }[]
  children?: React.ReactNode
}) {
  return (
    <section className="container-content px-gutter pt-8 pb-12 md:pt-12 md:pb-16">
      {breadcrumb ? (
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumb.map((c, i) => (
              <li key={c.to} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-foreground">
                    {c.label}
                  </span>
                ) : (
                  <Link to={c.to} className="hover:text-foreground">
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <p className="font-label text-primary mt-6 text-[0.6875rem] font-medium tracking-[0.2em] uppercase">
        {label}
      </p>
      <h1 className="mt-3 max-w-[22ch] text-4xl text-balance md:text-5xl">{title}</h1>
      {body ? <p className="mt-5 max-w-measure text-muted-foreground">{body}</p> : null}
      {children}
    </section>
  )
}

/* ── The notice every demonstration tour carries ─────────────────────────── */
export function DemoNote({
  className,
  tone = 'default',
}: {
  className?: string
  tone?: 'default' | 'ink'
}) {
  const rise = useRise<HTMLParagraphElement>()
  return (
    <p
      ref={rise.ref}
      className={cn(
        rise.className,
        tone === 'ink'
          ? 'border-ink-foreground/25 bg-ink-raised text-ink-foreground flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm leading-relaxed'
          : 'border-border bg-muted text-foreground flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm leading-relaxed',
        className,
      )}
    >
      <Icon
        as={Info}
        className={cn(tone === 'ink' ? 'text-gold' : 'text-primary', 'mt-0.5 size-4')}
        aria-hidden="true"
      />
      <span>
        <strong className="font-semibold">Demonstration tour.</strong> The route, inclusions and
        itinerary are ours; the departure dates, prices and seat availability are confirmed by our
        Belagavi office when you enquire.
      </span>
    </p>
  )
}

/* ── A tour cover card ───────────────────────────────────────────────────── */
export function TourCard({
  tour,
  className,
  style,
  tone = 'default',
}: {
  tour: Tour
  className?: string
  style?: React.CSSProperties
  tone?: 'default' | 'ink'
}) {
  /* The same arrival the flyers use, so the whole catalogue's pictures settle the
     one way: the photograph opens out of its frame as the card lands under it.
     The frame is a fixed box, so a picture growing inside it costs no layout. */
  const coverRef = useRef<HTMLDivElement>(null)
  const coverShown = useReveal(coverRef)
  return (
    <article
      style={style}
      className={cn(
        'group flex h-full min-w-0 flex-col overflow-hidden transition-[box-shadow,transform] duration-200 ease-out motion-reduce:hover:translate-y-0',
        tone === 'ink'
          ? 'border-ink-foreground/20 bg-ink-raised text-ink-foreground border hover:shadow-none focus-within:shadow-none'
          : 'surface-card bg-card text-card-foreground hover:-translate-y-0.5 hover:shadow-raised focus-within:shadow-raised',
        className,
      )}
    >
      <div ref={coverRef} className={cn('relative aspect-[16/10] overflow-hidden', tone === 'ink' ? 'bg-ink' : 'bg-muted')}>
        {/* The picture is its own way in: clicking it opens the same tour page the
           heading below goes to, and it is named for a screen reader. */}
        <Link
          to={`/tours/${tour.slug}`}
          aria-label={`${tour.name} — view the itinerary`}
          className="block size-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <img
            src={tour.image}
            alt={tour.imageAlt}
            width={1200}
            height={750}
            loading="lazy"
            className={cn(
              'block size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none',
              coverShown
                ? 'motion-safe:animate-[flyer-photo_1200ms_cubic-bezier(0.22,1,0.36,1)_both]'
                : 'scale-[1.06] opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100',
            )}
          />
        </Link>
        {tour.priceFrom === null ? (
          <span className="bg-ink font-label absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.14em] text-ink-foreground uppercase">
            Demonstration
          </span>
        ) : (
          <span className="bg-ink font-label absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.14em] text-gold uppercase">
            Bookings open
          </span>
        )}
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col p-5">
        <p
          className={cn(
            'font-label text-[0.6875rem] tracking-[0.16em] uppercase',
            tone === 'ink' ? 'text-gold' : 'text-muted-strong',
          )}
        >
          {tour.places.split(' · ')[0]}, {tour.places.split(' · ').slice(-1)}
        </p>
        <h2 className="mt-2 text-xl text-balance">
          <Link
            to={`/tours/${tour.slug}`}
            className="rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {tour.name}
          </Link>
        </h2>
        <p className={cn('mt-1.5 text-sm', tone === 'ink' ? 'text-ink-muted' : 'text-muted-foreground')}>
          {tour.days} days / {tour.nights} nights · {tour.bestFor}
        </p>
        {/* Two facts stacked as label over value rather than laid out in a row:
           the departure line for an unconfirmed tour is a long string, and a row
           at 360 would push the card wider than the column it sits in. */}
        <dl
          className={cn(
            'mt-4 flex flex-col gap-3 border-t pt-4 text-sm',
            tone === 'ink' ? 'border-ink-foreground/20' : 'border-border',
          )}
        >
          <div className="min-w-0">
            <dt
              className={cn(
                'font-label text-[0.6875rem] tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              Departure
            </dt>
            <dd className={cn('mt-1', tone === 'ink' && 'text-ink-muted')}>
              {tour.nextDeparture ?? 'Date on request'}
            </dd>
          </div>
          <div className="min-w-0">
            <dt
              className={cn(
                'font-label text-[0.6875rem] tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              Fare basis
            </dt>
            <dd className={cn('mt-1 font-medium', tone === 'ink' && 'text-ink-foreground')}>
              {tour.priceFrom === null
                ? 'Price on confirmation'
                : `₹${tour.priceFrom.toLocaleString('en-IN')} per person${tour.priceOther ? `, ${tour.priceOther.label.toLowerCase()}` : ''}`}
            </dd>
          </div>
        </dl>
        <span
          className={cn(
            'mt-5 inline-flex items-center gap-2 text-sm font-medium',
            tone === 'ink' ? 'text-gold' : 'text-primary',
          )}
        >
          View itinerary
          <Icon
            as={ArrowRight}
            className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </div>
    </article>
  )
}

/* ── The printed flyers. Two tours the office has a flyer for, set apart from
   the demonstration covers: a horizontal band, the picture holding one end and
   the flyer's own date line and fare at the other. ───────────────────────────── */
export function FlyerStrip({
  tour,
  className,
  tone = 'default',
  index = 0,
}: {
  tour: Tour
  className?: string
  tone?: 'default' | 'ink'
  index?: number
}) {
  const stamp = tour.flyer?.headline ?? 'Printed flyer'
  /* The band settles into place as it arrives. The rise is a stagger by position
     — a function of where the strip sits in the stack, capped so a long list
     never makes a visitor wait — and it is gone entirely where the visitor has
     asked for less motion. */
  const sheen = useRise<HTMLDivElement>(Math.min(index, 3) * 90)
  return (
    <article
      ref={sheen.ref}
      style={sheen.style}
      className={cn(
        'group relative flex flex-col overflow-hidden transition-[box-shadow,transform] duration-200 ease-out focus-within:shadow-raised sm:flex-row',
        tone === 'ink'
          ? 'border-ink-foreground/20 bg-ink-raised text-ink-foreground hover:shadow-none focus-within:shadow-none border'
          : 'surface-card hover:shadow-raised',
        sheen.className,
        className,
      )}
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-[15rem] lg:w-[19rem]">
        {/* The picture is its own way in: clicking it opens the same tour page the
           heading below goes to, and it is named for a screen reader. */}
        <Link
          to={`/tours/${tour.slug}`}
          aria-label={`${tour.name} — view the itinerary`}
          className="block size-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <img
            src={tour.image}
            alt={tour.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            className={cn(
              'size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none',
              /* The picture opens the strip: it is set a touch larger and a touch
                 further along its frame, and settles with the card that carries it,
                 a beat later, so the cover reads before the fare does. */
              sheen.shown
                ? 'motion-safe:animate-[flyer-photo_1200ms_cubic-bezier(0.22,1,0.36,1)_both]'
                : 'scale-[1.06] opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100',
            )}
          />
        </Link>
        <span className="bg-accent text-accent-foreground font-label pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
          {stamp}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-4 p-5 md:p-7">
        <div>
          <p
            className={cn(
              'font-label text-[0.6875rem] font-medium tracking-[0.16em] uppercase',
              tone === 'ink' ? 'text-gold' : 'text-primary',
            )}
          >
            {tour.places.split(' · ')[0]} and {tour.places.split(' · ').length - 1} more stops
          </p>
          <h3 className="mt-2 text-2xl text-balance">
            <Link
              to={`/tours/${tour.slug}`}
              className="rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {tour.name}
            </Link>
          </h3>
        </div>

        <dl
          className={cn(
            'grid gap-x-6 gap-y-3 border-t pt-4 text-sm sm:grid-cols-2',
            tone === 'ink' ? 'border-ink-foreground/20' : 'border-border',
          )}
        >
          <div>
            <dt
              className={cn(
                'font-label text-[0.6875rem] tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              Nights
            </dt>
            <dd className="mt-1">
              {tour.days} days / {tour.nights} nights
            </dd>
          </div>
          <div className="sm:col-span-2 min-w-0">
            <dt
              className={cn(
                'font-label text-[0.6875rem] tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              Fare
            </dt>
            {/* Where the office quotes two room bases, both are named here as a
               two-row table: a room basis and its figure are a pairing, and read
               side by side the rows line up in a way two stacked sentences do
               not. The wider sharing leads, being the cheaper rate. */}
            <dd className="mt-1 font-medium">
              {tour.priceFrom === null ? (
                'On request'
              ) : tour.priceOther ? (
                <table className="w-fit">
                  <tbody>
                    <tr>
                      <td className="pr-4 align-baseline text-left">{tour.priceOther.label}</td>
                      <td className="align-baseline whitespace-nowrap">
                        ₹{tour.priceOther.amount.toLocaleString('en-IN')} per person
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-4 align-baseline text-left">Two sharing</td>
                      <td className="align-baseline whitespace-nowrap">
                        ₹{tour.priceFrom.toLocaleString('en-IN')} per person
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                `₹${tour.priceFrom.toLocaleString('en-IN')} per person`
              )}
            </dd>
          </div>
          <div className="sm:col-span-2 min-w-0">
            <dt
              className={cn(
                'font-label text-[0.6875rem] tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              Departure
            </dt>
            <dd className="mt-1">{tour.nextDeparture ?? 'Date confirmed by the office'}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {tour.priceFromNote ? (
            <p className={cn('text-xs leading-relaxed', tone === 'ink' ? 'text-ink-muted' : 'text-muted-foreground')}>
              {tour.priceFromNote}
            </p>
          ) : null}
          {tour.flyer ? (
            <p
              className={cn(
                'font-label text-[0.6875rem] font-medium tracking-[0.14em] uppercase',
                tone === 'ink' ? 'text-ink-muted' : 'text-muted-strong',
              )}
            >
              {tour.flyer.note}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}

/* ── The featured flyer. The longest circuit on the shelf gets the full width on
   ink: the photograph on one side, the places the flyer lists laid out as a list
   on the other, and the departure and both fares on a plate that hangs over the
   bottom edge. A sequence of identical strips would read as a template; this one
   changes the ground and the measure as well as the shape. ───────────────────── */
export function FlyerFeature({ tour, className }: { tour: Tour; className?: string }) {
  const places = tour.places.split(' · ')
  /* The one flyer that takes the full width follows the strips in: it settles
     under them, a beat later, on the same curve. */
  const rise = useRise<HTMLElement>(420)
  return (
    <article
      ref={rise.ref}
      style={rise.style}
      className={cn(
        'bg-ink text-ink-foreground relative overflow-hidden rounded-xl',
        rise.className,
        className,
      )}
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
          <Link
            to={`/tours/${tour.slug}`}
            aria-label={`${tour.name} — view the itinerary`}
            className="focus-visible:ring-gold block size-full focus-visible:ring-2 focus-visible:outline-none"
          >
            <img
              src={tour.image}
              alt={tour.imageAlt}
              width={1200}
              height={750}
              loading="lazy"
              className={cn(
                'size-full object-cover',
                /* The same arrival as the strips above, held a little longer
                   because this picture is the larger one: it opens out of its
                   own frame as the ink band settles over it. The gradient plate
                   sits after it, so the wash never travels. */
                rise.shown
                  ? 'animate-[flyer-photo_1800ms_cubic-bezier(0.22,1,0.36,1)_both]'
                  : 'scale-[1.06] opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100',
              )}
            />
          </Link>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, color-mix(in oklch, var(--ink) 88%, transparent), transparent 62%)',
            }}
          />
        </div>

        <div className="relative flex flex-col justify-center gap-5 p-6 md:p-9">
          <div>
            <p className="font-label text-gold text-[0.6875rem] font-medium tracking-[0.18em] uppercase">
              {tour.flyer?.headline}
            </p>            <h3 className="mt-3 text-3xl text-balance md:text-4xl">
              <Link
                to={`/tours/${tour.slug}`}
                className="focus-visible:ring-gold rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:outline-none"
              >
                {tour.name}
              </Link>
            </h3>
          </div>

          <p className="text-ink-foreground max-w-[38rem] leading-relaxed">{tour.summary}</p>

          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {places.slice(0, 10).map((place) => (
              <li
                key={place}
                className="border-ink-foreground/20 text-ink-foreground rounded-full border px-3 py-1 text-xs"
              >
                {place}
              </li>
            ))}
            {places.length > 10 ? (
              <li className="text-ink-foreground px-1 py-1 text-xs">
                and {places.length - 10} more places on the flyer
              </li>
            ) : null}
          </ul>

          <dl className="border-ink-foreground/15 grid gap-4 border-t pt-5 sm:grid-cols-3">
            <div>
              <dt className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.14em] uppercase">
                Departs
              </dt>
              <dd className="mt-1 font-medium">{tour.nextDeparture}</dd>
            </div>
            <div>
              <dt className="font-label text-ink-muted text-[0.6875rem] tracking-[0.14em] uppercase">
                {tour.priceOther?.label ?? 'Fare'}
              </dt>
              <dd className="text-gold font-display mt-1 text-xl font-semibold">
                {tour.priceFrom === null ? 'On request' : `₹${tour.priceFrom.toLocaleString('en-IN')}`}
              </dd>
            </div>
            <div>
              <dt className="font-label text-ink-muted text-[0.6875rem] tracking-[0.14em] uppercase">
                {tour.priceOther ? 'Two sharing a room' : 'Nights'}
              </dt>
              <dd className="text-gold font-display mt-1 text-xl font-semibold">
                {tour.priceOther
                  ? `₹${tour.priceOther.amount.toLocaleString('en-IN')}`
                  : `${tour.nights} nights`}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button asChild variant="accent" size="sm">
              <a
                href={waLink(`Hello Shivu Package Tours, please share the details of the ${tour.name} departure.`)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Ask about this departure
              </a>
            </Button>
            <Link
              to={`/tours/${tour.slug}`}
              className="text-ink-foreground inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Day-by-day plan
            </Link>
          </div>

          <p className="text-ink-foreground text-xs leading-relaxed">{tour.priceFromNote}</p>
        </div>
      </div>
    </article>
  )
}

/* ── A row in a departure listing: a list, not a grid of cards ───────────── */
export function DepartureRow({ tour, className }: { tour: Tour; className?: string }) {
  return (
    <li
      className={cn(
        'grid min-w-0 grid-cols-1 items-center gap-4 border-b border-ink-foreground/15 py-5 last:border-b-0 md:grid-cols-[9rem_1fr_auto] md:gap-6',
        className,
      )}
    >
      <div className="flex items-baseline gap-2 md:flex-col md:items-start md:gap-0">
        {tour.nextDeparture ? (
          <span className="font-display text-2xl font-semibold text-ink-foreground">
            {tour.nextDeparture}
          </span>
        ) : (
          <>
            <span className="font-display text-2xl font-semibold text-ink-foreground">Date to be</span>
            <span className="font-label text-[0.6875rem] tracking-[0.18em] text-ink-foreground uppercase">
              confirmed
            </span>
          </>
        )}
      </div>
      <div>
        <h3 className="text-lg text-ink-foreground">
          <Link to={`/tours/${tour.slug}`} className="hover:underline">
            {tour.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-ink-foreground break-words">
          {tour.days} days / {tour.nights} nights · {tour.places}
        </p>
        {tour.priceFrom !== null ? (
          <p className="mt-1 text-sm text-ink-foreground">
            ₹{tour.priceFrom.toLocaleString('en-IN')} per person
            {tour.priceOther ? ` · ₹${tour.priceOther.amount.toLocaleString('en-IN')} ${tour.priceOther.label.toLowerCase()}` : ''}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-label rounded-full border border-ink-foreground/55 px-3 py-1 text-[0.6875rem] tracking-[0.14em] text-ink-foreground uppercase">
          {tour.priceFrom === null ? 'Seats on confirmation' : 'Bookings open'}
        </span>
        <Button asChild size="sm" variant="outline" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground">
          <a href={waLink(`Hello Shivu Package Tours, please send me the dates and price for ${tour.name}.`)} rel="noopener noreferrer" target="_blank">
            Ask for dates
          </a>
        </Button>
      </div>
    </li>
  )
}

/* ── Section heading: one device, used where the page changes subject ───── */
export function SectionHeading({
  label,
  title,
  body,
  tone = 'default',
  className,
}: {
  label?: string
  title: string
  body?: string
  tone?: 'default' | 'ink'
  className?: string
}) {
  return (
    <div className={cn('max-w-measure', className)}>
      {label ? (
        <p
          className={cn(
            'font-label text-[0.6875rem] font-medium tracking-[0.2em] uppercase',
            tone === 'ink' ? 'text-gold' : 'text-primary',
          )}
        >
          {label}
        </p>
      ) : null}
      <h2 className={cn('text-3xl text-balance md:text-4xl', label && 'mt-3', tone === 'ink' && 'text-ink-foreground')}>
        {title}
      </h2>
      {body ? (
          <p className={cn('mt-4', tone === 'ink' ? 'text-ink-foreground' : 'text-muted-foreground')}>
          {body}
        </p>
      ) : null}
    </div>
  )
}

/* ── Themes: the second way into the catalogue, beside region ──────────────
   Veena World's themed tours, at this office's scale. A visitor who has never
   heard of our tours knows whether they are a family, a couple or a group of
   elders, and can start there instead of guessing at a place name. The count
   beside each theme is computed from the catalogue, not typed in. */
export function ThemeBoard({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {themes.map((theme) => {
        const count = tours.filter(theme.test).length
        return (
          <Link
            key={theme.id}
            to={`/tours?theme=${theme.id}`}
            className="group surface-card hover:shadow-raised flex items-start justify-between gap-4 p-5 transition-shadow duration-200 ease-out"
          >
            <div>
              <h3 className="text-lg text-balance">{theme.name}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{theme.note}</p>
              <span className="font-label text-muted-strong mt-3 inline-block text-[0.6875rem] tracking-[0.16em] uppercase">
                {count} {count === 1 ? 'journey' : 'journeys'} in this list
              </span>
            </div>
            <Icon
              as={ArrowRight}
              className="text-muted-foreground mt-1 size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        )
      })}
    </div>
  )
}

/* ── Frequently asked questions ─────────────────────────────────────────── */
export const faqs = [
  {
    q: 'How do I book a tour with Shivu Package Tours?',
    a: 'Call either office number or send us a WhatsApp message with the tour name and how many people are travelling. We confirm the departure date, the price and what is included, and then you pay the advance to hold the seats. The enquiry form on this site also reaches the office, but a call or a WhatsApp message is the fastest way.',
  },
  {
    q: 'Where do groups depart from, and do you pick up outside Belagavi?',
    a: 'Every group departure starts in Belagavi, and the reporting point and time are confirmed with the final itinerary. Pick-ups from Hubballi, Dharwad, Nipani and Kolhapur are arranged on request for most coach tours when the group is travelling that way.',
  },
  {
    q: 'Why do the tours on this site not show prices or dates yet?',
    a: 'Because we will not print figures we have not confirmed. Tour costs move with the season, the airline fare and the hotel rate, and seats open and close week to week. Each tour page says plainly what will appear there once our current list is loaded, and until then the office gives you the accurate price for your dates.',
  },
  {
    q: 'Can you plan something that is not on this list?',
    a: 'Yes. Most of the year is customised work — a family travelling on their own dates, a group of friends who want their own itinerary, a honeymoon, or a temple circuit built around one festival. Tell us the dates and who is travelling and we will put the plan together.',
  },
  {
    q: 'Are your pilgrimage tours suitable for senior citizens?',
    a: 'They are planned with that in mind. The driving stages on our temple routes are kept short, there are rest days after the long transfers, and where a shrine needs a climb we arrange pony, palki or the local shuttle for those who need it. Tell us at the enquiry stage who is travelling and their age, and the plan will reflect it.',
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'It depends on how close to departure you cancel, because airlines and hotels charge us on that basis. The full slab is written on the cancellation and refund policy page, and it is also stated on your booking confirmation before you pay anything.',
  },
  {
    q: 'Do you help with visas and travel documents for international tours?',
    a: 'We guide you through the documentation, the forms and the appointment for the international destinations we sell, and we tell you what the embassy charges. The visa is granted by the embassy or consulate, not by us, so we cannot promise an outcome.',
  },
  {
    q: 'What do I need to carry on the tour?',
    a: 'Your booking confirmation, one government photo identity for hotel check-in, any medicines you take regularly, and footwear you can walk in. Each tour page and your confirmation carry the specific list for that destination — warm layers for the Himalaya, temple dress codes for some shrines, a valid passport with six months left for anything international.',
  },
]

export function FaqList({
  items = faqs,
  title,
  id,
}: {
  items?: { q: string; a: string }[]
  title?: string
  id?: string
}) {
  return (
    <div id={id} className="scroll-mt-28">
      {title ? <h2 className="text-2xl md:text-3xl">{title}</h2> : null}
      <Accordion
        type="single"
        collapsible
        className="mt-8 divide-y divide-border border-y border-border"
      >
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`faq-${i}`} className="border-b-0">
          <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline md:text-lg">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
      </Accordion>
    </div>
  )
}

/* ── Why travel with us: an editorial block, not three identical cards ──── */
const promises = [
  {
    title: 'Planned from Belagavi, not from a call centre',
    body: 'Your tour is put together in the office you walk into. The person who answers your first call is the person who confirms your hotel and your reporting time.',
  },
  {
    title: 'One coordinator for the whole group',
    body: 'From the first enquiry to the last drop-off you have one number to call, and it is answered. Groups travelling with elders get the coordinator’s attention where it is needed.',
  },
  {
    title: 'Assistance on the ground, not a folder of vouchers',
    body: 'Where a shrine needs a pony, a hotel needs a room change, or a flight moves, the office handles it. That is what we mean by Your Journey, Our Responsibility.',
  },
]

export function WhyUs({ className, tone = 'default' }: { className?: string; tone?: 'default' | 'ink' }) {
  const rise = useRise<HTMLDivElement>()
  return (
    <div
      ref={rise.ref}
      className={cn(rise.className, 'grid gap-x-layout gap-y-10 md:grid-cols-3', className)}
    >
      {promises.map((p, i) => (
        <div
          key={p.title}
          className="md:border-l md:border-border md:pl-6"
          style={{ transitionDelay: `${i * 110}ms` }}
        >
          <span className={cn('font-display text-sm font-semibold', tone === 'ink' ? 'text-gold' : 'text-primary')}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h2 className="mt-3 text-lg text-balance">{p.title}</h2>
           <p className="mt-2 text-sm leading-relaxed text-ink-foreground">{p.body}</p>
        </div>
      ))}
    </div>
  )
}

/* ── The closing call to action, on ink ─────────────────────────────────── */
export function ContactStrip({
  to,
  className,
  title = 'Tell us the dates. We will plan the rest.',
  body = 'Call either Belagavi number, or send the tour name on WhatsApp and we will reply with what is available.',
}: {
  to?: string
  className?: string
  title?: string
  body?: string
}) {  return (
    <section className={cn('bg-ink text-ink-foreground', className)}>
      <div className="container-content px-gutter py-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl text-ink-foreground text-balance md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-measure text-ink-foreground">{body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" variant="accent">
              <a href={waLink('Hello Shivu Package Tours, I would like to plan a tour.')} rel="noopener noreferrer" target="_blank">
                Enquire on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="whitespace-normal border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground">
              <a href={CONTACT.phonePrimaryHref}>
                <Icon as={PhoneCall} className="size-4" />
                <span className="flex flex-col">
                  <span>{CONTACT.phonePrimary}</span>
                  <span>{CONTACT.phoneSecondary}</span>
                </span>
              </a>
            </Button>
            <Link to={to ?? '/contact'} className="mt-1 text-sm text-ink-foreground underline underline-offset-4">
              Or send the enquiry form with your dates
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-foreground/15 pt-6 text-sm text-ink-muted">
          {/* Two facts in a row, not a data table: a plain list, so the strip
             keeps its shape without a definition list that the audit reads as
             misnested. */}
          <span className="flex items-center gap-2">
            <Icon as={MapPin} className="size-4" />
            {CONTACT.city}
          </span>
          <span className="flex items-center gap-2">
            <Icon as={Clock} className="size-4" />
            {CONTACT.hours}
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── The trust band and the review cards, on ink ──────────────────────────
   The band's four figures are the ones this site can actually stand behind:
   the catalogue, the regions it covers, the yatras planned for elders, and
   the state office the whole thing runs from. The figures we cannot print
   yet — groups departed, travellers carried, years in the office — are named
   in the note underneath rather than typed in as someone else's numbers.

   The cards beneath show the shape of a published review. They carry no name,
   no date and no quotation, because no traveller has sent us one to publish;
   what is real on them is the tour, its length and the destination photograph.
   A quoted review would be the one thing this band must never carry. */
const trustFigures = [
  {
    icon: Route,
    value: () => `${tours.length}`,
    label: 'Journeys we plan',
    note: 'Every route rebuilt around your dates',
  },
  {
    icon: Compass,
    value: () => `${regions.length}`,
    label: 'Regions covered',
    note: 'Karnataka to Europe, one office answering',
  },
  {
    icon: Users,
    value: () => `${tours.filter((t) => t.group === 'pilgrimage').length}`,
    label: 'Pilgrimage yatras',
    note: 'Paced for the elders travelling with you',
  },
  {
    icon: HeartHandshake,
    value: () => '1',
    label: 'Office, in Belagavi',
    note: 'The desk your trip is planned at, not a call centre',
  },
]

const reviewCards = [
  tours.find((t) => t.slug === 'kerala-backwaters'),
  tours.find((t) => t.slug === 'kashmir-valley'),
  tours.find((t) => t.slug === 'shirdi'),
].filter((t): t is Tour => Boolean(t))

export function TrustReviews({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useReveal(ref)

  return (
    <section className={cn('bg-ink text-ink-foreground py-section', className)}>
      <div className="container-content px-gutter">
        <div
          ref={ref}
          className={cn(
            'transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none',
            shown
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
          )}
        >
          <h2 className="text-center text-3xl text-ink-foreground text-balance md:text-4xl">
            Planned in Belagavi, travelled the world over
          </h2>

          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {trustFigures.map((f) => (
              <li
                key={f.label}
                className="lg:border-l lg:border-ink-foreground/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <Icon as={f.icon} className="size-6 text-gold" />
                <p className="font-display mt-4 text-4xl font-semibold tabular-nums md:text-5xl">
                  {f.value()}
                </p>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold/50" />
                <p className="font-label text-ink-muted-strong mt-3 text-[0.6875rem] tracking-[0.16em] uppercase">
                  {f.label}
                </p>
                <p className="mt-1.5 text-sm text-ink-foreground">{f.note}</p>
              </li>
            ))}
          </ul>

          <p className="mt-12 border-t border-ink-foreground/15 pt-6 text-sm text-ink-foreground">
            The figures a traveller really wants — how many groups have left, how many people have
            travelled, how long the office has been open — are not printed here because the owner has
            not confirmed them. They go on this band the day they do.
          </p>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-measure">
              <h2 className="text-2xl text-ink-foreground text-balance md:text-3xl">
                How a review appears here
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground">
                Your mark out of five, your name, the tour and the month, and your words underneath,
                exactly as you sent them. No quotation is printed on this site until a traveller
                writes to us and says it may be.
              </p>
            </div>
            <Link
              to="/reviews"
              className="text-gold inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Write yours on the reviews page
              <Icon as={ArrowRight} className="size-4" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviewCards.map((tour) => (
              <li key={tour.slug} className="surface-card flex flex-col overflow-hidden text-foreground">
                <div className="relative aspect-[16/10] bg-muted">
                  <img
                    src={tour.image}
                    alt={tour.imageAlt}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                  <span className="font-label bg-ink absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6875rem] tracking-[0.14em] text-ink-foreground uppercase">
                    Awaiting its review
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-label border-primary text-primary rounded-full border px-2.5 py-0.5 text-[0.6875rem] tracking-[0.14em] uppercase">
                      {tour.group === 'pilgrimage'
                        ? 'Pilgrimage'
                        : tour.group === 'international'
                          ? 'International'
                          : 'Domestic'}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {tour.days} days / {tour.nights} nights
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl text-balance">
                    <Link
                      to={`/tours/${tour.slug}`}
                      className="hover:text-primary focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {tour.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-sm">{tour.places}</p>
                  <p className="text-muted-foreground mt-4 border-t border-border pt-4 text-sm leading-relaxed">
                    The rating, the name and the traveller's own sentences appear in this panel the
                    moment a review for this tour is cleared for publication.
                  </p>
                  <span className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    See the itinerary
                    <Icon as={ArrowRight} className="size-4" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ── Reviews: the wall of records — mark, name, words, answer ─────────────
   Every card here is a slot, not a testimonial: the mark, the name, the month
   and the sentences are shown greyed because the traveller has not sent them
   yet. Nothing is quoted, and no card claims a tour that was never taken. */

/* Just over three lines on the widest card, so a long review folds to two
   columns and a short one is never squeezed into a sliver. */
const REVIEW_CLAMP = 'line-clamp-[11]'

/* The covers the arrows step between, in the order the office lists them. One
   entry for now, because each record carries a single cover: the control is
   honest today and correct the day a traveller sends a second photograph. */
const framesPerCard = 1
const reviewCovers = [
  '/images/hampi-vijaya-vittala-temple.webp',
]

/* The records the office has written up, oldest first. The words are placeholders
   and none of these three travellers has cleared them for publication yet, so the
   band announces them as long-form and the cards are marked as not yet printed.
   The marks, names and covers are placeholder structure, not reviews. */
type ReviewRecord = {
  marks: string[]
  value: number
  title: string
  words: string
  placeImage: string
  traveller: string
  went: string
  answeredBy?: string
}

const reviewRecords: ReviewRecord[] = [
  {
    marks: ['Customised'],
    value: 5,
    title: 'Ooty Getaway',
    words:
      'Placeholder — the traveller has not sent this yet. This is where their own sentences will sit.',
    placeImage: '/images/hampi-vijaya-vittala-temple.webp',
    traveller: 'Traveller name',
    went: 'Month, year',
  },
  {
    marks: ['Women’s Special'],
    value: 5,
    title: 'Women’s Special Kerala',
    words:
      'Placeholder — the traveller has not sent this yet. This is where their own sentences will sit.',
    placeImage: '/images/kerala-backwaters-houseboat.webp',
    traveller: 'Traveller name',
    went: 'Month, year',
    answeredBy: 'Tour coordinator',
  },
  {
    marks: ['Women’s Special', 'Long-form'],
    value: 5,
    title: 'Women’s Special Kerala',
    words:
      'Placeholder — the traveller has not sent this yet. This is where their own sentences will sit.',
    placeImage: '/images/kerala-backwaters-houseboat.webp',
    traveller: 'Traveller name',
    went: 'Month, year',
    answeredBy: 'Tour coordinator',
  },
]

/* The mark over a card. Every row keeps five stars whether the score is whole
   or a half, so the name and the month underneath start at the same height.
   The half is cut by a clip rectangle: only part of the fifth star shows. */
function ScoreMark({ value, className }: { value: number; className?: string }) {
  const whole = Math.floor(value)
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= whole) return <StarGlyph key={star} className="text-accent size-4" />
          if (star === whole + 1 && value % 1 !== 0) {
            return (
              <span key={star} className="relative inline-flex" aria-hidden="true">
                <StarGlyph className="text-muted-track size-4" />
                <StarGlyph
                  className="text-accent absolute inset-0 size-4"
                  clipPath="inset(0 50% 0 0)"
                />
              </span>
            )
          }
          return <StarGlyph key={star} className="text-muted-track size-4" />
        })}
      </span>
      <span className="text-foreground text-sm font-semibold tabular-nums">
        {Number.isInteger(value) ? value : value.toFixed(1)}
      </span>
      <span className="sr-only">out of 5</span>
    </span>
  )
}

function ReviewCard({ item }: { item: ReviewRecord }) {
  /* Each card keeps its own place in a one-picture sequence, so the arrows move
     this card's cover and nothing else. */
  const [frame, setFrame] = useState(0)
  const cover = reviewCovers[frame % framesPerCard] ?? item.placeImage
  return (
    <article className="surface-card flex flex-col p-5 md:p-6">
      {/* The marks that put this card beside its neighbours inside a section.
          They are text for now; the office's actual tag chips replace them. */}
      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-2 border-b border-border pb-4"
      >
        {item.marks.map((mark) => (
          <span
            key={mark}
            className="border-border bg-muted text-muted-strong font-label rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
          >
            {mark}
          </span>
        ))}
      </div>

      <ScoreMark value={item.value} className="mt-4" />

      <h3 className="mt-3 text-xl text-balance text-muted-strong">{item.title}</h3>

      <div className="mt-3 grid gap-5 sm:grid-cols-[minmax(0,1fr)_5rem] sm:items-start sm:gap-4">
        <div>
          <p className={cn('text-muted-foreground text-sm leading-relaxed italic', REVIEW_CLAMP)}>
            “{item.words}”
          </p>
          <span className="text-primary mt-2 inline-flex text-sm font-medium">Read more</span>
        </div>
        <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-md sm:aspect-[4/5]">
          <img
            src={cover}
            alt=""
            width={640}
            height={800}
            loading="lazy"
            className="size-full object-cover opacity-45 saturate-50"
          />
          {/* The pair of arrows every one of these cards wears. They move the
              picture inside this card, one frame at a time. */}
          <button
            type="button"
            onClick={() => setFrame((n) => n - 1)}
            className="border-border bg-card text-foreground hover:bg-secondary focus-visible:ring-ring absolute top-1/2 -left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border shadow-raised transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          >
            <Icon as={ChevronLeft} className="size-4" />
            <span className="sr-only">Previous photograph from {item.title}</span>
          </button>
          <button
            type="button"
            onClick={() => setFrame((n) => n + 1)}
            className="border-border bg-card text-foreground hover:bg-secondary focus-visible:ring-ring absolute top-1/2 -right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border shadow-raised transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          >
            <Icon as={ChevronRight} className="size-4" />
            <span className="sr-only">Next photograph from {item.title}</span>
          </button>
        </div>
      </div>

      <div className="mt-auto border-t border-border pt-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-foreground text-sm font-semibold">{item.traveller}</p>
          {item.answeredBy ? (
            <p className="text-muted-strong max-w-[15ch] text-right text-sm leading-tight font-semibold">
              {item.answeredBy}
            </p>
          ) : null}
        </div>
        <p className="text-muted-foreground mt-1 text-sm tabular-nums">{item.went}</p>
      </div>
    </article>
  )
}

/* ── The scoreboard over the wall: five out of five, cast in the ink band ── */
function ReviewSummary({ count, className }: { count: number; className?: string }) {
  return (
    <div
      className={cn(
        'bg-ink text-ink-foreground relative overflow-hidden rounded-xl px-6 py-7 md:px-8 md:py-8',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(24rem 15rem at 0% 0%, color-mix(in oklch, var(--primary) 26%, transparent), transparent 64%)',
        }}
      />
      <p className="font-label relative text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
        Every mark we publish
      </p>
      <p className="relative mt-3 flex items-center gap-3">
        <span className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarGlyph key={star} className="text-gold size-6" />
          ))}
        </span>
        <span className="sr-only">Five out of five</span>
        <span className="font-display text-ink-foreground text-4xl font-semibold tabular-nums md:text-5xl">
          5.0
        </span>
      </p>
      <p className="text-ink-foreground relative mt-3 max-w-[34ch] text-sm leading-relaxed">
        Four is the lowest mark the office has entered for a tour it ran. If a tour ever comes back
        lower, it goes up at that mark — we do not round it and we do not drop it.
      </p>
      <dl className="relative mt-6 border-t border-ink-foreground/15 pt-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-ink-foreground">Reviews written up</dt>
          <dd className="font-semibold tabular-nums">{count}</dd>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <dt className="text-ink-foreground">Awaiting the traveller's go-ahead</dt>
          <dd className="font-semibold tabular-nums">4</dd>
        </div>
      </dl>
      <p className="text-ink-foreground relative mt-4 text-sm leading-relaxed">
        Only reviews the traveller has cleared for publication are counted there.
      </p>
    </div>
  )
}

/* ── Reviews: the wall ──────────────────────────────────────────────────── */
export function ReviewWall({
  channels,
  className,
}: {
  channels?: { label: string; note: string }[]
  className?: string
}) {
  const wallRef = useRef<HTMLDivElement>(null)
  const wallShown = useReveal(wallRef)
  /* What the office will put on the page, in the order a reader scans it.
     Each item is a promise about the form of a future review, not a review. */
  const published = [
    ['The name, as written', 'First name and surname, exactly as you gave it — we do not initial it into “R. from Belagavi”.'],

    ['The tour and the month', 'Which tour you travelled on and when, so the next traveller knows what they are reading.'],
    ['Your rating beside your words', 'A mark out of five, as you gave it to us. No average is shown here, because there is nothing to average yet.'],
    ['Your words, unabridged', 'Published as you sent them. We will fix a spelling if you ask; we will not soften a complaint.']
  ] as const

  return (
    <div className={cn('container-content px-gutter pb-section', className)}>
      <div
        ref={wallRef}
        className={cn(
          'transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none',
          wallShown
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        )}
      >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-label text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
                Guest book
              </p>
              <h2 className="mt-3 text-2xl text-balance text-ink-foreground md:text-3xl">
                Reviews, in the traveller's own words
              </h2>
            </div>
                <Button asChild variant="accent" size="lg" className="min-w-0 whitespace-normal">
                <a
                  href={waLink(
                    'Hello Shivu Package Tours, I travelled with you and would like to send a review.',
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Send your review on WhatsApp
                  <Icon as={ArrowRight} className="size-4" />
                </a>
              </Button>
            </div>

            <p className="text-muted-foreground mt-5 max-w-measure text-sm leading-relaxed">
              None of them is printed here yet, because none of these three travellers has said we may
              publish theirs — so the cards hold their shape, their mark and their cover, and wait for
              the sentences.
            </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
            {reviewRecords.map((item) => (
              <ReviewCard
                key={item.title}
                item={item}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
            <ReviewSummary count={reviewRecords.length} className="lg:col-start-2" />
          </div>

          {/* The empty state itself: a ruled sheet waiting for its first entry,
              drawn in the site's own tokens rather than filled with a quote. */}
          <div className="surface-card relative mt-10 overflow-hidden p-7 md:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-label text-muted-strong text-[0.6875rem] tracking-[0.2em] uppercase">
                  Nothing invented
                </p>
                <h2 className="mt-3 text-2xl text-balance md:text-3xl">
                  No review is printed until its traveller says so
                </h2>
              </div>
              <span className="bg-secondary text-primary grid size-12 shrink-0 place-items-center rounded-full">
                <Icon as={PenLine} className="size-5" />
              </span>
            </div>

            <p className="text-muted-foreground mt-5 max-w-[52ch] leading-relaxed">
              We would rather show a card waiting for its sentences than show something we wrote
              ourselves. Nothing on this site is quoted, named or dated until the traveller who
              travelled writes in and says it may be.
            </p>

            <ol className="mt-8 divide-y divide-border border-t border-border">
              {published.map(([title, note]) => (
                <li key={title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{note}</p>
                </li>
              ))}
            </ol>

            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Where a review says something went wrong and we sorted it out, it goes up the same
              way. That is more use to the next traveller than a page of praise.
            </p>
          </div>

          {/* The ask, in the three ways the office is actually reachable. */}
          <div className="bg-ink text-ink-foreground relative overflow-hidden rounded-xl px-6 py-8 md:px-8 md:py-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(26rem 16rem at 100% 0%, color-mix(in oklch, var(--primary) 24%, transparent), transparent 62%)',
              }}
            />
            <h2 className="relative text-2xl text-ink-foreground text-balance">
              Tell us how it went
            </h2>
            <p className="relative mt-4 max-w-measure text-sm leading-relaxed text-ink-muted">
              Send your review to the office and say it is fine to publish. Two lines is enough — we
              do not need it written well, only told honestly.
            </p>

            <ul className="relative mt-7 flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-ink-foreground">
                <Icon as={MapPin} className="mt-0.5 size-4 shrink-0 text-gold" />
                Which tour you travelled on, and the month you went
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-foreground">
                <Icon as={Clock} className="mt-0.5 size-4 shrink-0 text-gold" />
                What worked, and what you would have changed
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-foreground">
                <Icon as={Info} className="mt-0.5 size-4 shrink-0 text-gold" />
                Whether we may print your name, and whether you have a photograph to add
              </li>
            </ul>

            <div className="relative mt-8 flex flex-col gap-3">
              <Button asChild variant="accent" size="lg">
                <a
                  href={waLink(
                    'Hello Shivu Package Tours, I travelled with you and would like to send a review.',
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Send your review on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground hover:text-ink">
                <a href={CONTACT.phonePrimaryHref}>
                  <Icon as={PhoneCall} className="size-4" />
                  {CONTACT.phonePrimary}
                </a>
              </Button>
              <p className="text-sm text-ink-muted">
                Or call the office on{' '}
                <a href={CONTACT.phoneSecondaryHref} className="text-ink-foreground underline underline-offset-4">
                  {CONTACT.phoneSecondary}
                </a>{' '}
                <a href={CONTACT.phoneTertiaryHref} className="text-ink-foreground underline underline-offset-4">
                  {CONTACT.phoneTertiary}
                </a>
              </p>
            </div>
          </div>
        </div>

        {channels?.length ? (
          <div className="mt-12">
          <h2 className="text-xl">Where else we are reviewed</h2>
          <p className="text-muted-foreground mt-2 max-w-measure text-sm leading-relaxed">
            These are the platforms we hold an account on. We add the link as soon as the office
            confirms the profile, rather than pointing at a page that does not exist.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label} className="surface-card flex items-start gap-3 p-5">
                <Icon as={Info} className="text-muted-foreground mt-0.5 size-4" />
                <div>
                  <p className="font-medium">{c.label}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
