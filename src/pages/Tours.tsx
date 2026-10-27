import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { DemoNote, PageHead, ContactStrip, TourCard } from '@/components/sections'
import { Search, X } from 'lucide-react'
import { waLink } from '@/data/company'
import { tours, searchTours, DURATION_BANDS, groupLabel, themeById, type Group } from '@/data/tours'

const groups: { value: Group | 'all'; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
]

export default function Tours() {
  const [params, setParams] = useSearchParams()
  /* The bar links to /domestic, /international and /pilgrimage, but the region
     filter lives in `?group=`. Read the section off the path and fall back to
     the parameter, so following "International" opens the international tours
     rather than the whole catalogue. */
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const section = pathname.split('/')[1]
  const fromPath = groups.find((g) => g.value !== 'all' && g.value === section)?.value
  const q = params.get('q') ?? ''
  const group = (params.get('group') ?? fromPath ?? 'all') as Group | 'all'
  const band = params.get('duration') ?? 'any'
  const destination = params.get('to') ?? params.get('destination') ?? 'any'
  const theme = params.get('theme') ?? 'any'

  // The header's search and the links into this page arrive as `?q=`, so the
  // field follows the URL rather than holding a copy of it: a second search
  // from the top bar, or a destination link followed from the footer, has to
  // land in the box the visitor is looking at.
  const [query, setQuery] = useState(q)
  useEffect(() => setQuery(q), [q])

  const destinations = useMemo(() => {
    const names = new Set<string>()
    for (const t of tours) for (const p of t.places.split(' · ')) names.add(p)
    return [...names].sort()
  }, [])

  const results = useMemo(() => {
    /* The text half of the match is `searchTours`, the same rule the header's
       field answers with, so a word that finds a tour in the bar finds it here
       too. The rest is the filters, which are about how a tour is sold rather
       than what it is called. */
    const matched = new Set(searchTours(q))
    return tours.filter((t) => {
      if (!matched.has(t)) return false
      if (group !== 'all' && t.group !== group) return false
      if (band !== 'any') {
        const b = DURATION_BANDS.find((x) => x.id === band)
        if (b && !b.test(t)) return false
      }
      if (destination !== 'any' && !t.places.toLowerCase().includes(destination.toLowerCase())) return false
      if (theme !== 'any') {
        const th = themeById(theme)
        if (th && !th.test(t)) return false
      }
      return true
    })
  }, [q, group, band, destination, theme])

  /* The section links are their own routes, so a region picked here goes to the
     route that stands for it and keeps the rest of the filters with it. */
  function setGroup(value: Group | 'all') {
    const next = new URLSearchParams(params)
    next.delete('group')
    if (value === 'all') navigate({ pathname: '/tours', search: next.toString() })
    else navigate({ pathname: `/${value}`, search: next.toString() })
  }

  function update(patch: Record<string, string | null>) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(patch)) {
      if (!value || value === 'any' || value === 'all') next.delete(key)
      else next.set(key, value)
    }
    setParams(next, { replace: true })
  }

  const filtered = group !== 'all' || band !== 'any' || destination !== 'any' || theme !== 'any' || q.trim() !== ''

  return (
    <>
      <Meta
        title={
          group === 'all'
            ? `All tour packages · ${tours.length} tours from Belagavi`
            : `${groupLabel[group]} tour packages from Belagavi`
        }
        description="Browse every Shivu Package Tours journey — hill stations, temples, beaches, desert circuits and international holidays — and filter by region, destination and number of days."
      />
      <main id="main">
        <PageHead
          label="Catalogue"
          title={group === 'all' ? 'Every tour we run' : `${groupLabel[group]} tours`}
          body="Filter by region, destination or how many days you have. Every journey here can also be rebuilt around your own dates and your own group."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/tours', label: 'All tours' },
          ]}
        />

        <div className="container-content px-gutter pb-section">
          <DemoNote />
          <form
            className="surface-card mt-8 grid gap-5 p-5 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_auto] lg:items-end"
            onSubmit={(e) => {
              e.preventDefault()
              update({ q: query.trim() || null })
            }}
            role="search"
          >
            <div>
              <label htmlFor="f-q" className="font-label text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                Search a destination or tour
              </label>
              <div className="relative mt-2">
                <Icon as={Search} className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="f-q"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Kashmir, Shirdi, Thailand"
                  className="border-input bg-background h-11 w-full rounded-md border pr-3 pl-9 text-sm focus-visible:border-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="f-to" className="font-label text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                Destination
              </label>
              <select
                id="f-to"
                value={destination}
                onChange={(e) => update({ to: e.target.value })}
                className="border-input bg-background mt-2 h-11 w-full rounded-md border px-3 text-sm focus-visible:border-ring"
              >
                <option value="any">Any destination</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="f-dur" className="font-label text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                Duration
              </label>
              <select
                id="f-dur"
                value={band}
                onChange={(e) => update({ duration: e.target.value })}
                className="border-input bg-background mt-2 h-11 w-full rounded-md border px-3 text-sm focus-visible:border-ring"
              >
                <option value="any">Any number of days</option>
                {DURATION_BANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" size="lg" className="h-11">
              Search tours
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-label mr-1 text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              Region
            </span>
            {groups.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGroup(g.value)}
                aria-pressed={group === g.value}
                className={
                  group === g.value
                    ? 'bg-primary text-primary-foreground min-h-11 rounded-full px-4 text-sm font-medium'
                    : 'border-border hover:border-primary min-h-11 rounded-full border px-4 text-sm'                }
              >
                {g.label}
              </button>
            ))}
            {filtered ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setParams(new URLSearchParams(), { replace: true })
                  navigate('/tours')
                }}
                className="ml-auto min-h-11 rounded-full px-3 text-sm text-primary underline underline-offset-4"
              >
                Clear the filters
              </button>
            ) : null}
          </div>

          {theme !== 'any' && themeById(theme) ? (
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-label text-muted-foreground text-[0.6875rem] tracking-[0.16em] uppercase">
                Starting from
              </span>
              <span className="bg-secondary text-foreground inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
                {themeById(theme)!.name}
                <button
                  type="button"
                  onClick={() => update({ theme: null })}
                  aria-label={`Remove the ${themeById(theme)!.name} filter`}
                  className="text-muted-foreground hover:text-foreground -mr-1 grid size-5 place-items-center rounded-full"
                >
                  <Icon as={X} className="size-3.5" />
                </button>
              </span>
            </p>
          ) : null}

          <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
            {results.length === 0
              ? 'No tours match this search.'
              : `${results.length} ${results.length === 1 ? 'tour' : 'tours'}${group === 'all' ? '' : ` in ${groupLabel[group].toLowerCase()}`}.`}
          </p>

          {/* The results are shown the moment they exist. A list that starts at
             opacity-0 and waits for an observer to lift it is a list a visitor
             can be left staring at, so a filter change is stated by the count
             above, not by an entrance the pictures have to wait on. */}
          {results.length === 0 ? (
            <div className="surface-card mt-6 p-8 text-center">
              <h2 className="font-display text-2xl text-ink-foreground">We still plan this one for you</h2>
              <p className="mx-auto mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                Nothing in the catalogue matches that search, but a search here only covers what we
                have listed. Tell the office the place you have in mind and we will price it for your
                group and dates.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="accent">
                  <a
                    href={waLink('Hello Shivu Package Tours, I am looking for a tour that is not on your website.')}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Ask on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/tours">See the whole catalogue</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tour) => (
                <li key={tour.slug}>
                  <TourCard tour={tour} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <ContactStrip />
      </main>
    </>
  )
}
