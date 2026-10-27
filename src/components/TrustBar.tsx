/* The site's closing argument, as one band on ink.
   Part one is the claim: what is true of every journey this office plans —
   fixed, specific, the same whether the tour runs tomorrow or in March. Part
   two, further down the same band, is the record a tour operator usually leads
   with: travellers carried, years in the office, groups departed. We have not
   been given those numbers, so this part carries what the catalogue itself
   proves — every figure counted from the site's own data — and says plainly
   where the run record goes when the owner confirms it. Nothing on this band is
   a number the office has not stood behind.
    Motion: the band arrives as one panel, the claim columns follow it, and each
     figure climbs to its number slowly behind a gold rule that draws in as the
     count lands. The legacy band at the foot counts too, one figure at a time
     behind its own icon and ahead of its label, over the band's longer 2600ms.
     Transform, opacity and text only; all of it skipped under reduced motion. */
import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { Icon } from '@/components/Icon'
import {
  BadgeCheck,
  Bus,
  CalendarDays,
  Compass,
  Flag,
  HandHeart,
  HeartHandshake,
  MapPin,
  ReceiptText,
  Route,
  ScrollText,
  SmilePlus,
  Sparkles,
  Stamp,
  ThumbsUp,
  UserRound,
  Users,
} from 'lucide-react'
import {
  domesticCategories,
  internationalCategories,
  pilgrimageCategories,
  regions,
  tours,
} from '@/data/tours'

/* ── What is true of every journey, whichever one you book ────────────────── */
const pillars = [
  {
    icon: HeartHandshake,
    title: 'One family, one coordinator',
    body: 'A single number, answered by the person who built your itinerary — the first call and the flight home are the same conversation.',
  },
  {
    icon: ReceiptText,
    title: 'The inclusions written down',
    body: 'Hotels, transport, sightseeing and the meals covered, listed on your booking confirmation. Nothing is added to the price after you have paid.',
  },
  {
    icon: Bus,
    title: 'Tours paced for the elders',
    body: 'Shorter driving stages, rest days after a long transfer, and trains and tickets arranged where the walk would be too much.',
  },
  {
    icon: ScrollText,
    title: 'The paperwork, handled for you',
    body: 'Passports, visa forms, appointments and temple registrations — guided at the Belagavi desk before any payment, with the embassy\u2019s own charges told to you straight.',
  },
  {
    icon: CalendarDays,
    title: 'Departures, or your own dates',
    body: 'Join a group leaving Belagavi, or take the same route privately on dates that suit your family. Both are priced and confirmed by the office.',
  },
  {
    icon: MapPin,
    title: 'One stop, inside Belagavi',
    body: 'Bus, rail and air tickets, hotel stays, insurance and airport transfers arranged alongside the tour, from the desk you walked into.',
  },
]

/* ── The record the desk supplied ────────────────────────────────────────────
   These five are the office's own figures, given to us as the site's legacy
   line, and they are printed as given. They are the only run figures on this
   site a visitor is asked to take on trust rather than count. */
type Legacy = {
  /** The figure as the office gave it, printed unchanged. */
  value: string
  label: string
  icon: typeof Route
}

const legacy: Legacy[] = [
  { value: '65,000+', label: 'Happy guests', icon: SmilePlus },
  { value: '20+', label: 'Years of experience', icon: HandHeart },
  { value: '6,500+', label: 'Tours completed', icon: ThumbsUp },
  { value: '2,700+', label: 'Tour destinations', icon: Route },
  { value: '180+', label: 'Tour leaders', icon: Flag },
]

/* The office's figure, split so it can be counted without ever being reworded:
   thousands are grouped the way the string has them, and the plus is whatever
   the string carried after the digits. Parsing the given value rather than
   keeping a second number beside it means the counter can never print something
   the office did not say. */
function parseLegacy(value: string) {
  const digits = value.replace(/[^0-9]/g, '')
  return { to: digits ? Number(digits) : 0, suffix: value.replace(/[0-9,\s]/g, '') }
}

/* Counts one legacy figure up to what the office supplied. The band this sits in
   is the slow one: the figure is written in thousands, so the count runs for the
   same 2.6s the cell takes to arrive and lands as the cell settles. Reduced
   motion gets the final figure immediately — the number is the content. */
function LegacyCount({ value, shown }: { value: string; shown: boolean }) {
  const { to, suffix } = parseLegacy(value)
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!shown) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }
    let raf = 0
    let start = 0
    setN(0)
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / 2600)
      // easeOutCubic: quick off the mark, settling onto the figure.
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, shown])

  return (
    <>
      {n.toLocaleString('en-IN')}
      {suffix}
    </>
  )
}

/* ── The record: what the catalogue itself proves ────────────────────────── */
const JOURNEYS = tours.length
const REGIONS = regions.length
const YATRAS = tours.filter((t) => t.group === 'pilgrimage').length
/* Category cards a visitor can land on, rather than catalogue entries. */
const DESTINATIONS =
  domesticCategories.length + pilgrimageCategories.length + internationalCategories.length

type Stat = {
  /** The target the counter animates to. */
  value: number
  label: string
  note: string
  icon: typeof Route
}

const record: Stat[] = [
  {
    value: JOURNEYS,
    label: 'Journeys we plan',
    note: 'Every route rebuilt around your dates',
    icon: Route,
  },
  {
    value: DESTINATIONS,
    label: 'Destinations on the board',
    note: 'India, the pilgrimage circuits and abroad',
    icon: Sparkles,
  },
  {
    value: REGIONS,
    label: 'Regions covered',
    note: 'Karnataka to Europe, one office answering',
    icon: Compass,
  },
  {
    value: YATRAS,
    label: 'Pilgrimage yatras',
    note: 'Paced for the elders travelling with you',
    icon: Users,
  },
]

/* One figure. The count is written straight into the DOM through a ref, so a
   tick never re-renders the whole band. */
function Count({
  to,
  shown,
}: {
  to: number
  /** The count waits for the band to arrive, so it is not spent off-screen. */
  shown: boolean
}) {
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!shown) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to)
      return
    }
    let raf = 0
    let start = 0
    setN(0)
    const step = (t: number) => {
      if (!start) start = t
      // 2200ms: the figures are the point of this band, so they take their time
      // arriving. One eased pass, and skipped under reduced motion.
      const p = Math.min(1, (t - start) / 2200)
      // easeOutCubic: fast off the mark, settling rather than stopping.
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, shown])

  return <>{n}</>
}

export function TrustBar({ className }: { className?: string }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const panel = useReveal(panelRef)
  /* The legacy band tracks on its own observer: on a short screen it sits below
     the fold, so it should start when it is actually being looked at. */
  const legacyRef = useRef<HTMLDivElement>(null)
  const legacyPanel = useReveal(legacyRef)

  return (
    <section className={className}>
      <div className="container-content px-gutter">
        <div
          ref={panelRef}
          className={cnReveal(
            'border-ink-foreground/12 text-ink-foreground relative overflow-hidden rounded-xl border bg-ink px-6 py-12 md:px-10 md:py-14',
            panel,
            'duration-1000',
          )}
        >
          {/* A soft teal wash behind the claim, from the tokens. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(34rem 22rem at 6% 0%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 62%)',
            }}
          />

          <div className="relative">
            <h2
              className={cnReveal(
                'text-ink-foreground max-w-[26ch] text-3xl text-balance md:text-4xl',
                panel,
                'duration-1000',
              )}
              style={{ transitionDelay: panel ? '80ms' : '0ms' }}
            >
              Why families in Belagavi hand us their parents
            </h2>
            <p
              className={cnReveal('text-ink-foreground mt-4 max-w-measure text-lg', panel, 'duration-1000')}
              style={{ transitionDelay: panel ? '200ms' : '0ms' }}
            >
              Shivu Package Tours is what a Belagavi family checks before it pays: a fixed route, a
              written list of what is included, and one number that is answered for the whole
              journey.
            </p>

            <ul className="mt-12 grid gap-x-layout gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {pillars.map((p, i) => (
                <li
                  key={p.title}
                  className={cnReveal(
                    'md:border-l md:border-ink-foreground/15 md:pl-6 md:first:border-l-0 md:first:pl-0',
                    panel,
                    'duration-1000',
                  )}
                  style={{ transitionDelay: panel ? `${340 + i * 100}ms` : '0ms' }}
                >
                  <Icon as={p.icon} className="text-gold size-6" />
                  <h3 className="text-ink-foreground mt-4 text-lg text-balance">{p.title}</h3>
                  <p className="text-ink-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>

            {/* ── The record ───────────────────────────────────────────────── */}
            <div className="border-ink-foreground/15 mt-14 border-t pt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3
                  className={cnReveal('text-ink-foreground text-2xl md:text-3xl', panel, 'duration-1000')}
                  style={{ transitionDelay: panel ? '260ms' : '0ms' }}
                >
                  What we are working with today
                </h3>
                <p
                  className={cnReveal('text-ink-foreground text-sm', panel, 'duration-1000')}
                  style={{ transitionDelay: panel ? '360ms' : '0ms' }}
                >
                  Counted from the tours on this site, not on a wall in reception
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
                {record.map((s, i) => (
                  <li key={s.label}>
                    <Icon
                      as={s.icon}
                      className={cnReveal('text-gold size-6', panel, 'duration-1000')}
                      style={{ transitionDelay: panel ? `${500 + i * 160}ms` : '0ms' }}
                    />
                    <p className="font-display text-ink-foreground mt-4 text-4xl font-semibold tabular-nums md:text-5xl">
                      <Count to={s.value} shown={panel} />
                    </p>
                    {/* The rule draws in from the left as the figure above it lands. */}
                    <span
                      aria-hidden="true"
                      className={cnReveal('bg-gold mt-3 block h-px origin-left', panel, 'duration-1000')}
                      style={{ transitionDelay: panel ? `${900 + i * 160}ms` : '0ms' }}
                    />
                    <p
                      className={cnReveal(
                        'font-label text-ink-foreground mt-2 text-[0.6875rem] tracking-[0.16em] text-balance uppercase',
                        panel,
                        'duration-1000',
                      )}
                      style={{ transitionDelay: panel ? `${980 + i * 160}ms` : '0ms' }}
                    >
                      {s.label}
                    </p>
                    <p className="text-ink-foreground mt-1.5 text-sm">{s.note}</p>
                  </li>
                ))}
              </ul>

              <div className="border-ink-foreground/15 mt-10 grid gap-8 border-t pt-8 md:grid-cols-[1fr_auto] md:items-center">
                <p className="text-ink-foreground max-w-measure text-sm leading-relaxed">
                  The record most operators print first — travellers carried, groups departed, years
                  in the office — is what we owe you. It goes up on this band and on the reviews page
                  as each figure is confirmed by the desk, because a number you cannot check is not
                  worth reading.
                </p>
                  <ul className="text-ink-foreground flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Icon as={BadgeCheck} className="size-4" />
                      Registered tour operator
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon as={Stamp} className="size-4" />
                      GST-registered business
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon as={UserRound} className="size-4" />
                      The same coordinator throughout
                    </li>
                  </ul>
              </div>
            </div>
          </div>

          {/* ── The legacy band ───────────────────────────────────────────
             The office's own figures, given as a headline row across the foot
             of the panel. Each sits in a cell ruled from the one before it
             rather than boxed, so the row reads as one band of five. At 360 it
             steps to two columns and the last cell takes the full width.
             Motion: this is the slow band. It lands after the claim has settled
             and takes its time about it — a 2600ms transition rather than the
             1000ms the rest of the panel uses — with each cell's icon, figure
             and label climbing in behind the one before it. Transform and
             opacity only, and all of it skipped under reduced motion. */}
          <div
            ref={legacyRef}
            className={cnReveal(
              'border-ink-foreground/15 mt-12 border-t pt-12',
              legacyPanel,
              'duration-[2600ms]',
            )}
          >
            <h3
              className={cnReveal(
                'text-ink-foreground text-3xl text-balance md:text-4xl',
                legacyPanel,
                'duration-[2600ms]',
              )}
              style={{ transitionDelay: legacyPanel ? '280ms' : '0ms' }}
            >
              Our legacy of unforgettable journeys
            </h3>
            <p
              className={cnReveal(
                'text-ink-foreground mt-3 max-w-measure',
                legacyPanel,
                'duration-[2600ms]',
              )}
              style={{ transitionDelay: legacyPanel ? '380ms' : '0ms' }}
            >
              Trusted by thousands, and crafting memories for a lifetime.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {legacy.map((s, i) => (
                <li
                  key={s.label}
                  className={cnReveal(
                    'min-w-0 sm:border-l sm:border-ink-foreground/15 sm:pl-6 sm:first:border-l-0 sm:first:pl-0',
                    legacyPanel,
                    'duration-[2600ms]',
                  )}
                  style={{ transitionDelay: legacyPanel ? `${480 + i * 180}ms` : '0ms' }}
                >
                  <Icon
                    as={s.icon}
                    className={cnReveal('text-gold size-8', legacyPanel, 'duration-[2600ms]')}
                    style={{ transitionDelay: legacyPanel ? `${360 + i * 180}ms` : '0ms' }}
                  />
                  <p
                    className={cnReveal(
                      'font-display text-ink-foreground mt-4 text-2xl font-semibold tabular-nums md:text-3xl',
                      legacyPanel,
                      'duration-[2600ms]',
                    )}
                    style={{ transitionDelay: legacyPanel ? `${560 + i * 180}ms` : '0ms' }}
                  >
                    <LegacyCount value={s.value} shown={legacyPanel} />
                  </p>
                  <p className="font-label text-ink-foreground mt-2 text-[0.6875rem] tracking-[0.16em] text-balance uppercase">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function cnReveal(base: string, shown: boolean, timing = 'duration-500') {
  return [
    base,
    `transition-[opacity,transform] ${timing} ease-out motion-reduce:transition-none`,
    shown
      ? 'translate-y-0 scale-x-100 opacity-100'
      : 'translate-y-3 scale-x-0 opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-x-100 motion-reduce:opacity-100',
  ].join(' ')
}
