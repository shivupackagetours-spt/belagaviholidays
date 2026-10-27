import { useId, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { CheckCircle2, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTACT, departureCities, waLink } from '@/data/company'

export type EnquiryDefaults = {
  destination?: string
  departure?: string
  travellers?: string
  requirements?: string
}

/* There is no server behind this site yet, so the form cannot deliver a message.
   It validates, and then it hands the visitor the two things that do work: a
   prefilled WhatsApp message and the office phone numbers. It never says a
   message was sent, because none is. */
export function EnquiryForm({
  defaults,
  className,
  compact = false,
}: {
  defaults?: EnquiryDefaults
  className?: string
  compact?: boolean
}) {
  const uid = useId()
  const [values, setValues] = useState({
    name: '',
    mobile: '',
    email: '',
    destination: defaults?.destination ?? '',
    date: defaults?.departure ?? '',
    travellers: defaults?.travellers ?? '2',
    requirements: defaults?.requirements ?? '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stage, setStage] = useState<'idle' | 'ready'>('idle')
  const summaryRef = useRef<HTMLDivElement>(null)

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest)
  }

  const message = `Hello Shivu Package Tours,
Name: ${values.name || '—'}
Mobile: ${values.mobile || '—'}${values.email ? `\nEmail: ${values.email}` : ''}
Destination: ${values.destination || '—'}
Preferred departure: ${values.date || '—'}
Travellers: ${values.travellers}
${values.requirements ? `Requirements: ${values.requirements}` : ''}`

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Please tell us who is travelling.'
    if (!/^[0-9+\-\s()]{10,16}$/.test(values.mobile.trim()))
      next.mobile = 'A mobile number we can call back on, with at least 10 digits.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'This email address looks incomplete.'
    if (!values.destination.trim()) next.destination = 'Which destination or tour are you asking about?'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(`${uid}-${Object.keys(next)[0]}`)
      first?.focus()
      return
    }
    setStage('ready')
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  const field = 'mt-1.5 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary'

  function Field({
    id,
    label,
    optional,
    error,
    children,
  }: {
    id: string
    label: string
    optional?: boolean
    error?: string
    children: React.ReactNode
  }) {
    return (
      <div>
        <label htmlFor={`${uid}-${id}`} className="font-label text-xs font-medium tracking-[0.08em] text-foreground uppercase">
          {label}
          {optional ? <span className="ml-1.5 normal-case tracking-normal text-muted-foreground">optional</span> : null}
        </label>
        {children}
        {error ? (
          <p id={`${uid}-${id}-error`} className="mt-1.5 text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    )
  }

  if (stage === 'ready') {
    return (
      <div
        ref={summaryRef}
        tabIndex={-1}
        className={cn('surface-card bg-card text-card-foreground border-primary/30 p-6 md:p-8', className)}
      >
        <Icon as={CheckCircle2} className="size-7 text-primary" />
        <h3 className="text-foreground mt-4 text-2xl">Your enquiry is ready to send</h3>
        <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted-foreground">
          This site has no server yet, so nothing has been sent and nothing has been stored — the
          form cannot deliver a message on its own. Press the button below and WhatsApp opens with
          everything you just entered, ready to send to our office. Or call us and read it out.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent">
            <a href={waLink(message)} rel="noopener noreferrer" target="_blank">
              Open WhatsApp with this enquiry
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={CONTACT.phonePrimaryHref}>Call {CONTACT.phonePrimary}</a>
          </Button>
        </div>
        <dl className="mt-7 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
          {[
            ['Name', values.name],
            ['Mobile', values.mobile],
            ['Email', values.email || '—'],
            ['Destination', values.destination],
            ['Preferred departure', values.date || '—'],
            ['Travellers', values.travellers],
            ['Requirements', values.requirements || '—'],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="font-label text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">{k}</dt>
              <dd className="mt-1 break-words text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => setStage('idle')}
          className="mt-6 text-sm text-primary underline underline-offset-4"
        >
          Edit these details
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn('surface-card bg-card text-card-foreground p-6 md:p-8', className)}>
      <div className={cn('grid gap-5', compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2')}>
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={() => !values.name.trim() && setErrors((e) => ({ ...e, name: 'Please tell us who is travelling.' }))}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            aria-invalid={Boolean(errors.name)}
            className={field}
            placeholder="Sushma Patil"
          />
        </Field>

        <Field id="mobile" label="Mobile number" error={errors.mobile}>
          <input
            id={`${uid}-mobile`}
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.mobile}
            onChange={set('mobile')}
            aria-describedby={errors.mobile ? `${uid}-mobile-error` : undefined}
            aria-invalid={Boolean(errors.mobile)}
            className={field}
            placeholder="+91 98450 00000"
          />
        </Field>

        <Field id="email" label="Email address" optional error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            aria-invalid={Boolean(errors.email)}
            className={field}
            placeholder="you@example.com"
          />
        </Field>

        <Field id="destination" label="Destination or tour" error={errors.destination}>
          <input
            id={`${uid}-destination`}
            name="destination"
            value={values.destination}
            onChange={set('destination')}
            aria-describedby={errors.destination ? `${uid}-destination-error` : undefined}
            aria-invalid={Boolean(errors.destination)}
            className={field}
            placeholder="Char Dham Yatra, or somewhere you have in mind"
          />
        </Field>

        <Field id="date" label="Preferred departure" optional>
          <input
            id={`${uid}-date`}
            name="date"
            type="date"
            aria-label="Date and month"
            value={values.date}
            onChange={set('date')}
            className={field}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">Date and month</p>
        </Field>

        <Field id="travellers" label="Number of travellers">
          <select
            id={`${uid}-travellers`}
            name="travellers"
            value={values.travellers}
            onChange={set('travellers')}
            className={field}
          >
            {['1', '2', '3', '4', '5', '6', '7 to 10', 'More than 10'].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="requirements" label="Anything we should know" optional>
          <textarea
            id={`${uid}-requirements`}
            name="requirements"
            rows={compact ? 2 : 3}
            value={values.requirements}
            onChange={set('requirements')}
            className={field}
            placeholder="Elders in the group, a room on a lower floor, a Jain menu, a temple you want to include."
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="accent">
          Check and send this enquiry
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-[22rem]">
          Nothing is stored on this site. You review the message before it leaves, and it goes to the
          office on WhatsApp.
        </p>
      </div>
    </form>
  )
}

/* ── The hero search panel ──────────────────────────────────────────────── */
const destinations = [
  'Kashmir',
  'Kerala',
  'Rajasthan',
  'Goa',
  'Andaman',
  'Jagannath Puri',
  'Ganga Sagar',
  'Kashi',
  'Shirdi',
  'Thailand',
  'Dubai',
  'Singapore',
  'Bali',
]

export function HeroSearch({ className }: { className?: string }) {
  const [, setSearchParams] = useSearchParams()
  const [destination, setDestination] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travellers, setTravellers] = useState('2')

  return (
    <form
      className={cn('border-border bg-card text-card-foreground shadow-raised rounded-lg border p-5 md:p-6', className)}
      onSubmit={(e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (destination) params.set('destination', destination)
        if (travelDate) params.set('month', travelDate.slice(0, 7))
        params.set('travellers', travellers)
        setSearchParams(params)
        window.location.assign(`/tours?${params.toString()}`)
      }}
    >
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-end">
        <div>
          <label htmlFor="search-destination" className="font-label text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground uppercase">
            Destination
          </label>
          <div className="relative mt-2">
            <select
              id="search-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full appearance-none rounded-md border border-input bg-card py-2.5 pr-9 pl-3.5 text-sm text-foreground placeholder:text-muted-foreground"
            >
              <option value="">Where would you like to go?</option>
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Icon as={ChevronDown} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground" />
          </div>
        </div>

        <div>
          <label htmlFor="search-from" className="font-label text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground uppercase">
            Departing from
          </label>
          <div className="relative mt-2">
            <select
              id="search-from"
              defaultValue="Belagavi"
              className="w-full appearance-none rounded-md border border-input bg-card py-2.5 pr-9 pl-3.5 text-sm text-foreground"
            >
              {departureCities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
            <Icon as={ChevronDown} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="min-w-0">
          <span id="search-date-label" className="font-label text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground uppercase">
            Travel month
          </span>
          <input
            id="search-date"
            type="month"
            aria-label="Date and month"
            aria-labelledby="search-date-label"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="search-travellers" className="font-label text-[0.6875rem] font-semibold tracking-[0.16em] text-foreground uppercase">
            Travellers
          </label>
          <select
            id="search-travellers"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            className="mt-2 w-full appearance-none rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground"
          >
            {['1', '2', '3', '4', '5', '6', '7 to 10', 'More than 10'].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" size="lg" className="h-11 w-full md:h-[3.25rem] md:w-auto md:self-end md:px-6">
          <Icon as={Search} className="size-4" />
          Search tours
        </Button>
      </div>
    </form>
  )
}
