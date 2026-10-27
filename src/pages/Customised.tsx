import { useEffect, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { EnquiryForm } from '@/components/EnquiryForm'
import { ContactStrip, FaqList, PageHead } from '@/components/sections'
import { ShieldCheck } from 'lucide-react'
import { Icon } from '@/components/Icon'
import { CONTACT } from '@/data/company'

/* The sheet's “Customise my tour” arrives as /customised?build=1 — the same
   page, scrolled to the form that is the whole point of the visit. */
function focusForm() {
  const el = document.getElementById('start-your-trip')
  el?.scrollIntoView({ block: 'start' })
  el?.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true })
}

function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="container-content px-gutter py-section">
      <div className="max-w-[46rem]">
        <h2 className="font-display text-3xl">{title}</h2>
        <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </section>
  )
}

export default function Customised() {
  const [params] = useSearchParams()
  const startAtForm = params.get('build') === '1'

  useEffect(() => {
    if (startAtForm) focusForm()
  }, [startAtForm])

  const kinds = [
    {
      title: 'Honeymoon and couple trips',
      body: 'Two travellers, a slower pace, and hotels chosen for the two of you rather than for a group. We will tell you honestly which months work at which destination.',
    },
    {
      title: 'Senior citizen journeys',
      body: 'Shorter driving days, ground-floor rooms where we can get them, no long walks before breakfast, and a companion seat beside the aisle.',
    },
    {
      title: 'Family and school groups',
      body: 'One itinerary for ages from six to seventy, with the stops that keep the youngest interested and the seats the oldest are comfortable in.',
    },
    {
      title: 'Group bus tours',
      body: 'You bring the group — a sangha, a company, a family function — and we take the whole coach, with boarding points across Belagavi district.',
    },
  ]

  return (
    <>
      <Meta
        title="Customised holidays planned from Belagavi"
        description="Honeymoon trips, senior citizen journeys, family holidays, group bus tours and tailor-made itineraries planned from Belagavi by Shivu Package Tours."
      />
      <main id="main">
        <PageHead
          label="Customised holidays"
          title="A journey shaped around your family, not a fixed group"
          body="Tell us who is travelling, when you can leave and what the budget is. We plan the route, the hotels and the pace — and we will say when a date range is a bad idea."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/customised', label: 'Customised holidays' },
          ]}
        />

        <section className="container-content px-gutter pb-section">
          <ul className="grid gap-6 md:grid-cols-2">
            {kinds.map((k) => (
              <li key={k.title} className="surface-card p-6">
                <h2 className="font-display text-xl">{k.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{k.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <Prose title="What we need from you">
          <p>
            Four things are enough to start: who is travelling and their ages, the dates you can
            travel, how many days you have, and roughly what you want to spend per person. Anything
            else — a particular temple, a relative to visit, a wedding to reach — helps us plan
            better, but it is not a prerequisite.
          </p>
          <p>
            Send them on WhatsApp and you will usually have a first outline the same day. If it
            changes after that, it changes; nothing is booked until you approve it.
          </p>
        </Prose>

        <section className="bg-secondary/60 py-section">
          <div className="container-content px-gutter">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start">
              <div>
                <Icon as={ShieldCheck} className="size-6 text-primary" />
                <h2 className="font-display mt-4 text-3xl">The booking runs through the office</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A custom journey can also start here. Because this site has no booking engine
                  behind it yet, nothing you send is stored — the form checks what you have typed and
                  hands you the message to send, or you can ring the office directly.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <a href="/contact">Open the enquiry form</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={CONTACT.phonePrimaryHref}>Call {CONTACT.phonePrimary}</a>
                  </Button>
                </div>
              </div>
              <FaqList
                title="Questions people ask before a custom trip"
                items={[
                  {
                    q: 'Can you book an itinerary for two people only?',
                    a: 'Yes. Couples, pairs of friends and single families are all planned as private journeys — a car, a driver and the hotels, rather than a seat on a coach.',
                  },
                  {
                    q: 'Do you arrange travel from Belagavi itself?',
                    a: 'Yes. Flights, train tickets and the coach from Belagavi are part of the plan for most customised itineraries, and the office books them together with the ground arrangements.',
                  },
                  {
                    q: 'What if the budget is fixed?',
                    a: 'Say the number at the start rather than at the end. We will tell you which destinations are realistic in that range and which are not, instead of trimming the itinerary down to fit.',
                  },
                  {
                    q: 'How do instalments work?',
                    a: 'Usually a booking advance at confirmation with the balance before departure, and anything outside that is up to the office. Ask when you enquire, and get it in writing on the confirmation.',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <ContactStrip />

        <section id="start-your-trip" className="container-content scroll-mt-24 px-gutter pb-section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2 className="text-3xl text-balance md:text-4xl">Start with what you have in mind</h2>
              <p className="mt-4 max-w-measure text-muted-foreground">
                Even the shape of the trip is enough to begin. Send the month, the number of
                travellers and anything that cannot move, and we will come back with a plan you can
                push against.
              </p>
            </div>
            <EnquiryForm defaults={{ requirements: 'I would like a customised holiday.' }} />
          </div>
        </section>

      </main>
    </>
  )
}
