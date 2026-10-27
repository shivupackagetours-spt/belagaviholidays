import { Meta } from '@/components/Meta'
import { PageHead } from '@/components/sections'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Icon } from '@/components/Icon'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { CONTACT, waLink } from '@/data/company'

export default function Contact() {
  const numbers = [
    { label: 'Office line 1', value: CONTACT.phonePrimary, href: CONTACT.phonePrimaryHref, icon: Phone },
    { label: 'Office line 2', value: CONTACT.phoneSecondary, href: CONTACT.phoneSecondaryHref, icon: Phone },
  ]

  return (
    <>
      <Meta
        title="Contact Shivu Package Tours, Belagavi"
        description="Ring, message or send an enquiry to Shivu Package Tours in Belagavi about group departures, pilgrimage yatras, family holidays and customised tours."
      />
      <main id="main">
        <PageHead
          label="Contact"
          title="Talk to the office in Belagavi"
          body="Two lines and a WhatsApp number, answered by the people who plan the tours. Tell us the destination and the dates you have in mind and we will tell you what is possible."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/contact', label: 'Contact' },
          ]}
        />

        <div className="container-content px-gutter pb-section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <ul className="space-y-4">
                {numbers.map((n) => (
                  <li key={n.label}>
                    <a
                      href={n.href}
                      className="surface-card flex min-h-16 items-center gap-4 px-5 py-4 transition-colors hover:border-primary/40"
                    >
                      <span className="bg-secondary grid size-11 shrink-0 place-items-center rounded-md">
                        <Icon as={n.icon} className="size-5 text-primary" />
                      </span>
                      <span>
                        <span className="font-label block text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                          {n.label}
                        </span>
                        <span className="mt-0.5 block text-lg font-medium">{n.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={waLink('Hello Shivu Package Tours, I would like to enquire about a tour.')}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="surface-card flex min-h-16 items-center gap-4 px-5 py-4 transition-colors hover:border-primary/40"
                  >
                    <span className="bg-secondary grid size-11 shrink-0 place-items-center rounded-md">
                      <Icon as={MessageCircle} className="size-5 text-primary" />
                    </span>
                    <span>
                      <span className="font-label block text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block text-lg font-medium">{CONTACT.whatsapp}</span>
                    </span>
                  </a>
                </li>
              </ul>

              {/* A `dl` takes `div` children only when each div holds its own
                  dt/dd pair, directly. The icon and the label sit inside the
                  dt here so no wrapper intervenes. */}
              <dl className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <dt className="flex gap-4 font-medium">
                    <Icon as={MapPin} className="mt-0.5 size-5 shrink-0 text-primary" />
                    Office
                  </dt>
                  <dd className="text-muted-foreground">
                    {CONTACT.office}, {CONTACT.city}. Full street address and the map are added as
                    soon as the office confirms them.
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="flex gap-4 font-medium">
                    <Icon as={Clock} className="mt-0.5 size-5 shrink-0 text-primary" />
                    Hours
                  </dt>
                  <dd className="text-muted-foreground">
                    {CONTACT.hours}. Groups often leave in the evening, so do ring ahead before
                    travelling to the office.
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="flex gap-4 font-medium">
                    <Icon as={Mail} className="mt-0.5 size-5 shrink-0 text-primary" />
                    Email
                  </dt>
                  <dd className="text-muted-foreground">
                    Not supplied yet — until it is, WhatsApp is the fastest way to send documents
                    and get a reply.
                  </dd>
                </div>
              </dl>

              <div
                className="bg-secondary/70 mt-8 rounded-lg p-6"
                role="note"
                aria-label="About the map"
              >
                <h2 className="font-display text-lg">The map is not here yet</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A Google Map is worth showing only against the correct street address. Once you
                  send it, the map goes here with directions and the nearest landmark.
                </p>
              </div>
            </div>

            <EnquiryForm className="lg:sticky lg:top-28" />
          </div>
        </div>
      </main>
    </>
  )
}
