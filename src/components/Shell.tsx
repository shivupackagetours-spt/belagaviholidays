/* The shell, and the whole of it.

   On ink the bar carries the mark, a search field, four sections of the
   catalogue and the one action that matters — WhatsApp. At 360 it keeps the
   mark and two controls: the WhatsApp button, and a sheet holding the rest.
   The footer is the other half of the shell: contact, hours, the section links
   people actually look for, and the policies. */
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { Brand } from '@/components/Brand'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EnquiryForm } from '@/components/EnquiryForm'
import { PhotoCredits } from '@/components/PhotoCredits'
import { ChevronDown, Clock, ExternalLink, Mail, MapPin, Menu, Pencil, PhoneCall, Search, X } from 'lucide-react'
import { CONTACT, MAP_OFFICE_URL, waLink } from '@/data/company'
import { regions, searchTours } from '@/data/tours'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/tours', label: 'All tours' },
  { to: '/domestic', label: 'India' },
  { to: '/international', label: 'International' },
  { to: '/pilgrimage', label: 'Pilgrimage' },
]

const more = [
  { to: '/customised', label: 'Customised holidays' },
  { to: '/departures', label: 'Upcoming departures' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
]

const policies = [
  { to: '/faq', label: 'Questions' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/cancellation', label: 'Cancellation and refund' },
]

/* ── All destinations, in one panel ─────────────────────────────────────────
   The bar's four links say how we sell a tour. This panel says where we go,
   which is the question a visitor actually arrives with. It holds every
   destination we plan under its region, so Kashmir is two clicks from the
   home page without knowing our catalogue. Hover or focus opens it; the links
   are ordinary links, so a keyboard reaches every one of them. */
function SearchField({
  id,
  onSubmitQuery,
}: {
  id: string
  onSubmitQuery: (q: string) => void
}) {
  /* What is typed here is a filter over the catalogue, not a detour: the field
     asks the catalogue itself after three characters and the panel opens under
     the bar with what matched, so naming a destination answers on the spot
     instead of after a submit. Enter still hands the query to the catalogue
     page, which is where a longer look belongs. */
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const id2 = `${id}-results`
  const inputRef = useRef<HTMLInputElement>(null)

  const needle = value.trim().toLowerCase()
  const results = useMemo(() => {
    if (needle.length < 3) return []
    return searchTours(needle).slice(0, 6)
  }, [needle])

  const listOpen = open && needle.length >= 3

  /* A click anywhere else shuts the panel. Pointerdown rather than click, so
     the panel is still mounted when the click on a result lands on it. */
  useEffect(() => {
    if (!open) return
    function onDown(e: PointerEvent) {
      if (!inputRef.current?.closest('[data-search-panel]')?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  function go(q: string) {
    onSubmitQuery(q)
    setOpen(false)
    setValue(q)
  }

  return (
    <div data-search-panel className="relative flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          go(needle)
        }}
        role="search"
        aria-label="Search the tour catalogue"
        className="relative"
      >
        <label htmlFor={id} className="sr-only">
          Search the tour catalogue
        </label>
        <Icon
          as={Search}
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted"
        />
        <input
          ref={inputRef}
          id={id}
          name="q"
          type="search"
          value={value}
          role="combobox"
          aria-expanded={listOpen}
          aria-controls={id2}
          aria-autocomplete="list"
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder="Search Kashmir, Dubai, Char Dham"
          className="placeholder:text-ink-muted-strong focus-visible:border-ink-foreground/60 w-full rounded-md border border-ink-foreground/45 bg-ink py-2 pr-3 pl-9 text-sm text-ink-foreground"
        />
      </form>

      {listOpen ? (
        <div
          id={id2}
          className="bg-card text-card-foreground border-border absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-lg border shadow-raised"
        >
          {results.length === 0 ? (
            <p className="text-muted-foreground px-4 py-3 text-sm">
              Nothing in the catalogue is named “{value.trim()}”. Send it to the catalogue page and
              we will read it against the whole list.
            </p>
          ) : (
            <ul className="divide-border divide-y">
              {results.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/tours?q=${encodeURIComponent(t.name)}`}
                    onClick={() => {
                      setOpen(false)
                      setValue('')
                    }}
                    className="hover:bg-muted focus-visible:bg-muted block px-4 py-2.5 focus-visible:outline-none"
                  >
                    <span className="font-display text-foreground block text-sm">{t.name}</span>
                    <span className="text-muted-foreground mt-0.5 block text-xs">{t.places}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => go(value.trim())}
            className="border-border text-primary hover:bg-muted block w-full border-t px-4 py-2.5 text-left text-sm font-medium"
          >
            {results.length > 0
              ? `See these ${results.length} on the catalogue page`
              : 'Search the catalogue page'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function DestinationMenu() {
  const [open, setOpen] = useState(false)
  /* Leaving the wrapper closes the panel, but only after a beat. The pointer
     crosses the bar-to-panel gap on the way from the button to a destination,
     and a straight mouseleave would shut the panel under the cursor while it
     was still travelling. The timer is cleared on every re-entry, so a pointer
     that comes back never sees the close at all. */
  const closeTimer = useRef<number | undefined>(undefined)

  function openNow() {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function closeSoon() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 180)
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="text-ink-foreground flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-ink-foreground/10"
      >
        All destinations
        <Icon as={ChevronDown} className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>

      {/* The wrapper is the panel's own hit area, not just the visible card: the
          top padding covers the space between the button and the panel, so the
          pointer never leaves the wrapper on its way down to a destination. */}
      <div
        className={cn(
          'absolute top-full left-1/2 z-50 w-[54rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-2 transition-opacity duration-150 ease-out',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="bg-ink border-ink-foreground/30 rounded-lg border p-6 shadow-raised">
          <div className="grid grid-cols-4 gap-6">
          {regions.map((r) => (
            <div key={r.id}>
              <Link
                to={r.to}
                className="font-label text-gold text-[0.6875rem] tracking-[0.18em] uppercase hover:underline"
              >
                {r.name}
              </Link>
              <ul className="mt-3 flex flex-col gap-1.5">
                {r.destinations.map((d) => (
                  <li key={d.name}>
                    <Link
                      to={`${r.to}?to=${encodeURIComponent(d.name)}`}
                      className="text-ink-foreground hover:text-gold block text-sm leading-snug"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const searchId = useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname, search])

  /* The mark is the way home from anywhere. Clicked on the home page itself it
     has nothing to navigate to, so it scrolls back to the top rather than
     sitting still. From any other route it is an ordinary link to `/`. */
  function onLogoClick() {
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onSearch(q: string) {
    navigate(q ? `/tours?q=${encodeURIComponent(q)}` : '/tours')
  }

  return (
    <header className="bg-ink text-ink-foreground sticky top-0 z-40 animate-[bar-settle_420ms_ease-out_both] motion-reduce:animate-none">
      <div className="container-content px-gutter flex h-16 items-center gap-4 md:h-[4.5rem]">
          {/* The artwork is navy on white, so the bar plate is part of the mark,
              not a decoration behind it — cut close so it reads as the logo's
              own ground rather than a sticker on the navy. */}
          <Link
            to="/"
            onClick={onLogoClick}
            aria-label="Shivu Package Tours, Belagavi — home"
            className="bg-card focus-visible:ring-gold shrink-0 rounded-md px-2.5 py-1.5 focus-visible:ring-2 focus-visible:outline-none"
          >
            <Brand tone="ink" variant="compact" height={30} />
          </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm text-ink-foreground transition-colors hover:bg-ink-raised hover:text-gold',
                  isActive && 'text-ink-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <DestinationMenu />
        </nav>

        <div
          className="ml-auto hidden max-w-[19rem] flex-1 items-center gap-2 md:flex"
        >
          <SearchField id={searchId} onSubmitQuery={onSearch} />
          <Button
            type="submit"
            form={searchId}
            size="icon-lg"
            variant="accent"
            aria-label="Search the tour catalogue"
          >
            <Icon as={Search} className="size-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {/* The bar's own WhatsApp button. --accent-foreground is an ink label,
              which is invisible on the ink bar behind it, so the link states the
              bar's light label on a raised ink plate that lifts it off the bar. */}
          <Button
            asChild
            size="sm"
            variant="outline-on-ink"
            className="border-gold/70 bg-ink-raised text-gold hover:border-gold hover:bg-ink-foreground/15 hidden h-10 sm:inline-flex"
          >
            <a
              href={waLink('Hello Shivu Package Tours, I would like to enquire about a tour.')}
              rel="noopener noreferrer"
              target="_blank"
            >
              Enquire on WhatsApp
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                aria-label={open ? 'Close menu' : 'Open menu'}
                 className="border-ink-foreground/60 text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground border bg-transparent lg:hidden"
              >
                <Icon as={Menu} className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="bg-ink text-ink-foreground px-gutter w-full border-ink-foreground/20 sm:max-w-sm"
            >
              <div className="flex items-center justify-between border-b border-ink-foreground/15 py-4">
                <SheetTitle asChild>
                  <span className="bg-card rounded-md px-3 py-2">
                    <Brand tone="ink" height={40} />
                  </span>
                </SheetTitle>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Close menu"
                    className="text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
                  >
                    <Icon as={X} className="size-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* The sheet repeats the mark the bar already carries, one
                  register up — it is the only brand anchor on a full-height
                  panel at 360. */}
              <div className="overflow-y-auto py-4">
                <SearchField id={`${searchId}-sheet`} onSubmitQuery={onSearch} />

                <nav aria-label="All sections" className="mt-6">
                  <ul className="flex flex-col">
                    {[
                      ...nav,
                      ...more,
                      { to: '/customised?build=1', label: 'Customise my tour' },
                      { to: '/contact', label: 'Contact us' },
                    ].map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="font-body hover:text-gold block border-b border-ink-foreground/15 py-4 text-lg"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild size="lg" variant="accent">
                    <a
                      href={waLink(
                        'Hello Shivu Package Tours, I would like to enquire about a tour.',
                      )}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                     className="border-ink-foreground/55 text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground bg-transparent"
                  >
                    <a href={CONTACT.phonePrimaryHref}>
                      <Icon as={PhoneCall} className="size-4" />
                      {CONTACT.phonePrimary}
                    </a>
                  </Button>
                </div>

                <p className="font-display text-gold mt-6 text-base">
                  Your comfort is our priority.
                </p>
                <p className="text-ink-muted mt-2 text-sm">{CONTACT.hours}</p>
                <p className="text-ink-muted mt-1 text-sm">{CONTACT.city}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground pb-16 md:pb-0">
      <div className="container-content px-gutter py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <span className="bg-card inline-flex rounded-md px-3 py-2">
              <Brand tone="ink" height={44} />
            </span>
            <p className="font-display text-gold mt-3 text-lg leading-snug">
              Your comfort is our priority.
            </p>
            <p className="text-ink-foreground mt-3 max-w-[22rem] text-sm leading-relaxed">
              Group tours, pilgrimage journeys and customised holidays, planned by an office in
              Belagavi for travellers across Karnataka and Maharashtra.
            </p>
            <p className="text-ink-foreground mt-5 flex items-start gap-2 overflow-hidden text-sm">
              <Icon as={MapPin} className="text-gold mt-0.5 size-4 shrink-0" />
              <span className="min-w-0 break-words">
                {CONTACT.office}, {CONTACT.city}
              </span>
            </p>
            {/* The address is always a working route to the pin. A real 44px
                target, its own row. */}
            <a
              href={MAP_OFFICE_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="text-gold-strong focus-visible:ring-gold mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm underline decoration-1 underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
            >
              Open the office in Google Maps
              <Icon as={ExternalLink} className="size-3.5 shrink-0" />
            </a>
          </div>

          <nav aria-label="Tours">
            <h2 className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.2em] uppercase">
              Tours
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {[
                { to: '/tours', label: 'All tour packages' },
                { to: '/domestic', label: 'Domestic tours' },
                { to: '/international', label: 'International tours' },
                { to: '/pilgrimage', label: 'Pilgrimage tours' },
                { to: '/customised', label: 'Customised holidays' },
                { to: '/departures', label: 'Upcoming departures' },
                { to: '/gallery', label: 'Gallery' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink-foreground hover:text-gold hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Policies and help">
            <h2 className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.2em] uppercase">
              Help
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {[
                { to: '/reviews', label: 'Customer reviews' },
                ...policies,
                { to: '/contact', label: 'Contact us' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink-foreground hover:text-gold hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.2em] uppercase">
              Reach the office
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={CONTACT.phonePrimaryHref}
                  className="text-ink-foreground flex items-center gap-2.5"
                >
                  <Icon as={PhoneCall} className="text-gold size-4" />
                  {CONTACT.phonePrimary}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneSecondaryHref}
                  className="text-ink-foreground flex items-center gap-2.5"
                >
                  <Icon as={PhoneCall} className="text-gold size-4" />
                  {CONTACT.phoneSecondary}
                </a>
              </li>
              <li>
                <a
                  href={waLink('Hello Shivu Package Tours, I would like to enquire about a tour.')}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-ink-foreground flex items-center gap-2.5"
                >
                  <WhatsAppGlyph className="text-gold size-4" />
                  {CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="text-ink-foreground flex items-center gap-2.5"
                >
                  <Icon as={Mail} className="text-gold size-4" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-ink-foreground flex items-start gap-2.5">
                <Icon as={MapPin} className="text-gold mt-0.5 size-4" />
                <span>
                  {CONTACT.office}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
              <li className="text-ink-foreground flex items-start gap-2.5">
                <Icon as={Clock} className="text-gold mt-0.5 size-4" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* The photographs carry the whole design, so the people who took them
            are named in the footer rather than buried in a file nobody opens. */}
        <PhotoCredits className="mt-12 border-t border-ink-foreground/15 pt-6" />
      </div>
    </footer>
  )
}

/* ── The two one-tap ways to reach us, on every page ──────────────────────
   A stacked pair of rounds, call above WhatsApp, so the two things a visitor
   actually does from a phone are in the same corner on every route, from the
   first screen on. Both wear the glow ring from the tokens, so the pair reads
   as one lit control rather than a card shadow under two grey discs. Nothing
   here changes the layout beneath it. */
/* ── Customise, without leaving the page you were reading ───────────────────
   The customised page is the long way round to the same form, so the form is
   also here: a visitor on the first screen of a tour page can ask for it made
   their own in one tap. The form is the site's own, so it still validates and
   still ends on WhatsApp — this dialog adds a route to it, not a backend. */
function CustomiseDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="border-ink/20 bg-card text-ink shadow-glow hover:border-primary hover:bg-secondary flex h-12 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-[color,background-color,border-color,box-shadow] hover:shadow-raised focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Icon as={Pencil} className="size-4" />
          Customise my tour
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92dvh] overflow-y-auto p-0 sm:max-w-2xl"
      >
        <div className="bg-ink text-ink-foreground px-gutter py-5">
          <DialogHeader className="gap-1.5 sm:text-left">
            <DialogTitle className="font-display text-2xl leading-tight">
              Have it built around you
            </DialogTitle>
            <DialogDescription className="text-ink-muted text-sm leading-relaxed">
              Send us the dates, the destination and who is travelling. The office replies with a
              day-wise plan, hotels and a price on WhatsApp.
            </DialogDescription>
          </DialogHeader>
        </div>
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="text-ink-foreground absolute top-4 right-4 hover:bg-ink-foreground/10 hover:text-ink-foreground"
          >
            <Icon as={X} className="size-5" />
          </Button>
        </SheetClose>
        <div className="px-gutter py-6">
          <EnquiryForm compact className="border-border border p-5 shadow-none md:p-6" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    // The floating pair is always there, on every route and at every scroll
    // position — a visitor on the first screen of the home page can call or
    // message without hunting. Only the mobile bar waits: it is fixed to the
    // bottom edge and would otherwise sit over the content the phone is
    // reading, so it comes in once the visitor has scrolled past the first
    // screen on the home page, or 400px in everywhere else.
    const threshold = pathname === '/' ? window.innerHeight : 400
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <>
      {/* The pair is fixed, so it sits outside `main`; without a region of its
          own its call and WhatsApp links are the content axe reports as
          uncontained. */}
      <nav
        aria-label="Quick contact"
        className="fixed right-4 bottom-20 z-30 hidden max-w-[calc(100vw-2rem)] flex-col items-end gap-3 md:right-5 md:bottom-6 md:flex"
      >
        <CustomiseDialog />
        <a
          href={CONTACT.phonePrimaryHref}
          className="bg-call text-call-foreground shadow-glow hover:bg-ink relative isolate grid size-14 place-items-center overflow-visible rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className="border-call-foreground/60 pointer-events-none absolute inset-0 rounded-full border [animation:action-beacon_3s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden"
          />
          <span className="sr-only">Call the office on {CONTACT.phonePrimary}</span>
          <Icon as={PhoneCall} className="size-6" />
        </a>
        <a
          href={waLink('Hello Shivu Package Tours, I would like to enquire about a tour.')}
          rel="noopener noreferrer"
          target="_blank"
          className="bg-primary text-primary-foreground shadow-glow hover:bg-ink relative isolate grid size-14 place-items-center overflow-visible rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className="border-gold/70 pointer-events-none absolute inset-0 rounded-full border [animation:action-beacon_3s_cubic-bezier(0,0,0.2,1)_infinite_0.35s] motion-reduce:hidden"
          />
          <span className="sr-only">Enquire on WhatsApp</span>
          <WhatsAppGlyph className="size-7" />
        </a>
      </nav>

      {/* The bar is fixed, so it sits outside every other landmark; without a
          region of its own its two one-tap links are the page content axe
          reports as uncontained below `main`. */}
      <nav
        aria-label="Contact shortcuts"
        className={cn(
          'bg-ink fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-ink-foreground/15 transition-transform duration-200 ease-out md:hidden',
          visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
        )}
      >
        <a
          href={CONTACT.phonePrimaryHref}
          className="text-ink-foreground flex min-h-[3.25rem] items-center justify-center gap-2 text-sm font-medium"
        >
          <Icon as={PhoneCall} className="text-gold size-4" />
          Call the office
        </a>
        <a
          href={waLink('Hello Shivu Package Tours, I would like to enquire about a tour.')}
          rel="noopener noreferrer"
          target="_blank"
          className="bg-primary text-primary-foreground flex min-h-[3.25rem] items-center justify-center gap-2 text-sm font-medium"
        >
          <WhatsAppGlyph className="size-4" />
          WhatsApp
        </a>
      </nav>
    </>
  )
}

/* ── Every page opens at the top ─────────────────────────────────────────────
   React Router keeps the window where it was, so a link followed from the
   middle of the home page used to land the visitor halfway down the next
   route. Only the path resets the scroll: a departure-city or filter link is
   anchored to a part of the page you are already on, and jumping to the top
   for one of those would lose the visitor's place. The hash is left to the
   browser to satisfy. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.location.hash) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'instant' })
  }, [pathname])

  return null
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1 md:pb-0">{children}</div>
      <Footer />
      <FloatingActions />
    </div>
  )
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.7 4.85-1.27A9.9 9.9 0 1 0 12.04 2Zm0 1.9a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.13l-.3-.18-2.87.75.77-2.8-.19-.3A8 8 0 0 1 12.04 3.9Zm-3.4 3.6c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.11.16 1.68 2.57 4.08 3.5 2 .78 2.4.62 2.84.58.43-.04 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.12-.12.3-.34.44-.5.14-.18.18-.3.28-.5.1-.2.05-.37-.01-.49-.06-.12-.52-1.28-.74-1.75-.19-.4-.38-.4-.53-.41h-.5Z" />
    </svg>
  )
}
