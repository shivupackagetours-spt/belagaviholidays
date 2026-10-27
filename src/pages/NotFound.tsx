import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { ArrowRight, MapPin } from 'lucide-react'
import { groupLabel } from '@/data/tours'
import { waLink } from '@/data/company'

const places = [
  { to: '/tours?q=Kashmir', label: 'Kashmir' },
  { to: '/tours?q=Kerala', label: 'Kerala' },
  { to: '/tours?q=Rajasthan', label: 'Rajasthan' },
  { to: '/pilgrimage', label: 'Pilgrimage tours' },
  { to: '/international', label: 'Tours abroad' },
  { to: '/departures', label: 'Departures from Belagavi' },
]

export default function NotFound() {
  return (
    <main id="main" className="container-content px-gutter py-section">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
        <div>
          <p className="font-label text-[0.6875rem] tracking-[0.2em] text-primary uppercase">404</p>
          <h1 className="font-display mt-4 text-4xl md:text-5xl">This road is not on the map</h1>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
            The address may be mistyped, or the tour may have moved. Everything we plan is listed in
            the catalogue, and the office will plan anything that is not.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/tours">See all tour packages</Link>
            </Button>
              <Button asChild size="lg" variant="accent">
              <a
                href={waLink('Hello Shivu Package Tours, I was looking for a tour and could not find it on the website.')}
                rel="noopener noreferrer"
                target="_blank"
              >
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="surface-card p-6 md:p-8">
          <Icon as={MapPin} className="size-5 text-primary" />
          <h2 className="font-display mt-3 text-2xl">Try one of these instead</h2>
          <ul className="mt-5 divide-y divide-border">
            {places.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="flex min-h-11 items-center justify-between gap-4 py-3 text-sm font-medium transition-colors hover:text-primary"
                >
                  {p.label}
                  <Icon as={ArrowRight} className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            Grouped as {groupLabel.domestic.toLowerCase()}, {groupLabel.pilgrimage.toLowerCase()} and{' '}
            {groupLabel.international.toLowerCase()} in the full catalogue.
          </p>
        </div>
      </div>
    </main>
  )
}
