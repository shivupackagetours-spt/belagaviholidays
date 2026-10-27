import { Link } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { ContactStrip, PageHead, SectionHeading } from '@/components/sections'
import { ArrowRight, Bus, CalendarDays, MapPin, Users } from 'lucide-react'
import { CONTACT, departureCities, waLink } from '@/data/company'
import { tours, groupLabel } from '@/data/tours'

const camps = [
  {
    title: 'By our own bus',
    body: 'Bellary Road, Khanapur Road, Savadatti, Bailhongal, Athani, Gokak, Nippani, Chikodi, Sankeshwar and Ramdurg — the coach picks up along the way, so nobody has to reach Belagavi city first. Groups also join from Bagalkot, Vijayapura, Haveri, Shivamogga and Bengaluru, and from Pune and Kolhapur on the Maharashtra side.',
    icon: Bus,
  },
  {
    title: 'Report and leave the same evening',
    body: 'Most groups assemble in Belagavi in the evening and travel overnight, so the leave you take is the days at the destination, not the days getting there.',
    icon: CalendarDays,
  },
  {
    title: 'Temple circuits with the group',
    body: 'Pilgrimage groups keep an early start, a fixed darshan slot and a slower afternoon. Elders are never made to keep the pace of the youngest traveller.',
    icon: MapPin,
  },
  {
    title: 'For the whole family',
    body: 'Family groups mix ages, so rooms are allotted by family rather than by gender, and one member of our staff travels with every group to handle the small problems.',
    icon: Users,
  },
]

export default function Departures() {
  return (
    <>
      <Meta
        title="Upcoming group departures from Belagavi"
        description="The Belagavi departure calendar for Shivu Package Tours group tours, with confirmed dates, prices and seats published as the office updates them."
      />
      <main id="main">
        <PageHead
          label="Departures"
          title="Upcoming group tours from Belagavi"
          body="Group departures are the heart of what this office does. This page carries the calendar as soon as the dates, prices and seats are confirmed."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/departures', label: 'Departures' },
          ]}
        />

        <section className="container-content px-gutter pb-section">
          <div className="bg-ink text-ink-foreground relative overflow-hidden rounded-lg p-7 md:p-10">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 size-64 rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklch, var(--gold) 52%, transparent), transparent)',
              }}
            />
            <div className="relative max-w-[42rem]">
              <p className="font-label text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
                The calendar is being filled in
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink-foreground md:text-4xl">
                No departure date is published here yet
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Dates change with the season, with the festival calendar and with how many travellers
                have booked. Rather than show you a date that has already moved, we publish nothing
                until the office confirms it.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="accent">
                  <a
                    href={waLink('Hello Shivu Package Tours, please send me your upcoming departure calendar.')}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Ask for the next departure
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-ink-foreground/55 bg-transparent text-ink-foreground hover:bg-ink-foreground/15 hover:text-ink-foreground">
                  <a href={CONTACT.phonePrimaryHref}>Call {CONTACT.phonePrimary}</a>
                </Button>
              </div>
            </div>
          </div>

          <SectionHeading
            className="mt-14"
            label="Likely next"
            title="Where groups usually travel next"
            body="These are the journeys we plan most. Ask about any of them and the office will tell you what is running and when."
          />

          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Journeys by group, duration, places covered and status of the next departure
              </caption>
              <thead className="bg-secondary/70">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Tour</th>
                  <th scope="col" className="px-4 py-3 font-medium">Group</th>
                  <th scope="col" className="px-4 py-3 font-medium">Days</th>
                  <th scope="col" className="px-4 py-3 font-medium">Leaves from</th>
                  <th scope="col" className="px-4 py-3 font-medium">Next departure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tour: tours[0], next: '11th November 2026' },
                  { tour: tours[1], next: '12th November 2026' },
                  { tour: tours[2], next: '5th January 2027' },
                  { tour: tours[5], next: 'March 2027' },
                  { tour: tours[8], next: '12th November 2026' },
                  { tour: tours[11], next: 'On request' },
                ].map(({ tour: t, next }) => (
                  <tr key={t.slug} className="border-border border-t">
                    <th scope="row" className="px-4 py-3 font-normal">
                      <Link to={`/tours/${t.slug}`} className="font-medium hover:text-primary">
                        {t.name}
                      </Link>
                    </th>
                    <td className="px-4 py-3 text-muted-foreground">{groupLabel[t.group]}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.days}</td>
                    <td className="px-4 py-3 text-muted-foreground">Belagavi</td>
                    <td className="px-4 py-3 text-muted-foreground">{next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Next departure dates shown in full are confirmed by the office. Seat counts and prices
            stay blank until the office confirms them.
          </p>

          {/* The boarding question is the first one a visitor from outside
              Belagavi asks, so the departures page answers it in one place
              rather than leaving it to the FAQ. */}
          <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl">You can board from your own town</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Most of our travellers do not live in Belagavi city. Tell the office which town you
                are in when you enquire and we will confirm the nearest boarding point, the reporting
                time and whether the coach is picking up along your road.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Ask about boarding from your town
                <Icon as={ArrowRight} className="size-4" />
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {departureCities.map((city) => (
                <li
                  key={city}
                  className="border-border bg-card rounded-md border px-3.5 py-2 text-sm"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-secondary/60 py-section">
          <div className="container-content px-gutter">
            <SectionHeading
              label="How a Belagavi group works"
              title="Leaving from home, not from a city you have to reach first"
              body="A group departure only saves you trouble if it starts where you live. This is what we arrange around that."
            />
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {camps.map((c) => (
                <li key={c.title} className="surface-card p-6">
                  <Icon as={c.icon} className="size-5 text-primary" />
                  <h2 className="font-display mt-4 text-xl">{c.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Ask about boarding from your town
              <Icon as={ArrowRight} className="size-4" />
            </Link>
          </div>
        </section>

        <ContactStrip />
      </main>
    </>
  )
}
