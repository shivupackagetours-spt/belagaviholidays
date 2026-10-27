import { Link } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { waLink } from '@/data/company'

/* The catalogue has no tour on this address. Kept in its own component so the
   route renders exactly one h1 whichever branch it takes. */
export function TourNotFound() {
  return (
    <main id="main" className="container-content px-gutter py-section">
      <Meta title="Tour not found" description="That tour is not in the catalogue." />
      <h1 className="font-display text-4xl">We cannot find that tour</h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        The link may be out of date, or the tour may not be listed yet. The catalogue has every
        journey on it, and the office will plan anything that is not.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/tours">See all tour packages</Link>
        </Button>
        <Button asChild variant="accent">
          <a
            href={waLink(
              'Hello Shivu Package Tours, I am looking for a tour I cannot find on your website.',
            )}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ask on WhatsApp
          </a>
        </Button>
      </div>
    </main>
  )
}
