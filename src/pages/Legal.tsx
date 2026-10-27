import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Meta } from '@/components/Meta'
import { PageHead } from '@/components/sections'
import { CONTACT } from '@/data/company'

function Legal({
  label,
  title,
  description,
  intro,
  sections,
}: {
  label: string
  title: string
  description: string
  intro: ReactNode
  sections: { h: string; p: ReactNode }[]
}) {
  return (
    <>
      {/* route-meta: title and description set from the policy this block renders */}
      <Meta title={title} description={description} />
      <main id="main">
        <PageHead label={label} title={title} body={intro} />
        <section className="container-content px-gutter pb-section">
          <div className="max-w-[46rem] space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl">{s.h}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{s.p}</div>
              </div>
            ))}
            <div className="surface-card p-6">
              <h2 className="font-display text-xl">Where to take a question</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Shivu Package Tours, {CONTACT.city}. Call {CONTACT.phonePrimary} or{' '}
                {CONTACT.phoneSecondary}, or message {CONTACT.whatsapp} on WhatsApp. This website has
                no server behind it, so it does not store anything you type and cannot be used to
                make or change a booking —{' '}
                <Link to="/contact" className="text-primary underline-offset-4 hover:underline">
                  contact the office
                </Link>{' '}
                for anything that needs a record.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const updated = 'Last reviewed: this page is current as published, and the owner’s own terms replace it wherever they differ.'

export function Privacy() {
  return (
    <Legal
      label="Privacy"
      title="Privacy policy"
      description="What Shivu Package Tours does with the information you send through this website, and what it currently cannot do."
      intro="Written to describe what actually happens on this site, not a template's idea of it."
      sections={[
        {
          h: 'What this website collects',
          p: (
            <p>
              Nothing is stored. There is no account, no database and no cookie set by this site
              beyond what your browser needs to render a page. The enquiry form checks your details
              in the browser and then hands you a WhatsApp message to send yourself.
            </p>
          ),
        },
        {
          h: 'What you send us directly',
          p: (
            <p>
              When you call, message on WhatsApp or send an email, we receive your name, phone number
              and whatever you tell us about your travel plans. We use it to answer your enquiry and
              to plan and run your tour, and for nothing else.
            </p>
          ),
        },
        {
          h: 'Sharing it',
          p: (
            <p>
              Hotel, airline, transporter and visa details are shared with the suppliers who need
              them to provide your booking. We do not sell your details, and we do not pass them to
              anyone for marketing.
            </p>
          ),
        },
        {
          h: 'Photographs and reviews',
          p: (
            <p>
              We publish a photograph or a review taken on a tour only where the traveller has told
              us it may be published, and we take it down if they later change their mind.
            </p>
          ),
        },
        {
          h: 'Keeping your information',
          p: (
            <p>
              Booking records are kept as long as the law and the accounts require, and then
              discarded. You can ask us to delete an enquiry that never became a booking.
            </p>
          ),
        },
        { h: 'Review', p: <p>{updated}</p> },
      ]}
    />
  )
}

export function Terms() {
  return (
    <Legal
      label="Terms"
      title="Terms and conditions"
      description="The terms on which Shivu Package Tours sells its journeys, and how this website should be read while its catalogue is being filled in."
      intro="Plain terms: what we promise, what you agree to, and which parts of this site are still provisional."
      sections={[
        {
          h: 'What this website is',
          p: (
            <p>
              A description of the journeys we plan. It is not a booking engine: no booking is
              created, no price is fixed and no seat is held by anything you do on this site. A
              journey exists when the office confirms it to you.
            </p>
          ),
        },
        {
          h: 'The tour catalogue',
          p: (
            <p>
              Tours marked Demonstration describe the kind of journey we plan. Tours marked To be
              confirmed carry a price, a date or a seat count that the office has not finalised.
              Where a figure is not confirmed, the page says so rather than showing one.
            </p>
          ),
        },
        {
          h: 'Booking and payment',
          p: (
            <p>
              Your booking is confirmed on payment of the advance stated by the office, and the
              balance falls due before departure. Instalment options, if any, are agreed in writing
              on your confirmation.
            </p>
          ),
        },
        {
          h: 'Your documents and your health',
          p: (
            <p>
              You are responsible for identity documents, and for any visa or permit an itinerary
              needs, unless the office has explicitly taken that on. Tell us before booking about a
              medical condition, a mobility difficulty or a dietary requirement that affects the
              tour.
            </p>
          ),
        },
        {
          h: 'Changes to an itinerary',
          p: (
            <p>
              Weather, road conditions, temple timings and railway schedules can force a change
              during a tour. Where that happens we provide an alternative of comparable standard; the
              cost difference, if any, is settled as the office's stated policy provides.
            </p>
          ),
        },
        {
          h: 'Governing law',
          p: (
            <p>
              Bookings made with Shivu Package Tours in Belagavi are governed by the law of India,
              with jurisdiction in Belagavi, Karnataka.
            </p>
          ),
        },
        { h: 'Review', p: <p>{updated}</p> },
      ]}
    />
  )
}

export function Cancellation() {
  return (
    <Legal
      label="Cancellation"
      title="Cancellation and refund policy"
      description="How cancellations, refunds and changes work on tours booked with Shivu Package Tours in Belagavi, and what is still to be confirmed."
      intro="A stated policy rather than a table of invented percentages — the exact figures come from the office with your confirmation."
      sections={[
        {
          h: 'How to cancel',
          p: (
            <p>
              Tell the office by phone or message as soon as you know. A cancellation counts from the
              moment we receive it, not from the date you first thought about it, so a message that
              reaches us today saves money.
            </p>
          ),
        },
        {
          h: 'What is refunded',
          p: (
            <p>
              Refunds depend on what has already been paid out on your behalf — an air ticket, a
              hotel's cancellation window, a coach booking, a permit. Where those suppliers refund
              us, we pass it on less their charges; where they do not, we cannot.
            </p>
          ),
        },
        {
          h: 'Closer to departure',
          p: (
            <p>
              The nearer to departure you cancel, the more of the package becomes non-refundable,
              because hotels and transport have committed. The exact bands for a given tour are
              written on your confirmation — ask for them before you pay the advance.
            </p>
          ),
        },
        {
          h: 'Cancelled by us',
          p: (
            <p>
              If a departure cannot run — because the minimum group did not form, or because a route
              is closed — you are offered an alternative date or a full refund of what you have
              paid to us. We do not keep a booking advance for a tour we did not run.
            </p>
          ),
        },
        {
          h: 'Changing a booking',
          p: (
            <p>
              Moving to another date or another tour is generally easier than cancelling, and it
              depends on the same supplier windows. Ask the office and we will tell you what is
              possible before you commit.
            </p>
          ),
        },
        { h: 'Review', p: <p>{updated}</p> },
      ]}
    />
  )
}
