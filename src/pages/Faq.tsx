import { Link } from 'react-router'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { ContactStrip, FaqList, PageHead, SectionHeading } from '@/components/sections'
import { ArrowRight } from 'lucide-react'
import { CONTACT, waLink } from '@/data/company'

const faqs = [
  {
    q: 'Where do your tours leave from?',
    a: 'From Belagavi. Group departures assemble at a fixed point in the city and pick up along the way — Bellary Road, Khanapur Road, Savadatti, Bailhongal, Athani, Gokak, Nippani, Chikodi, Sankeshwar and Ramdurg. Outside the district we join groups from Hubballi, Dharwad, Bagalkot, Vijayapura, Haveri, Shivamogga, Bengaluru and Nipani, and from Pune and Kolhapur in Maharashtra, who meet the coach on the route. Tell us which town you are in and the office will confirm the nearest boarding point.',
  },
  {
    q: 'How do I book, and how much do I pay in advance?',
    a: 'Ring the office or send a WhatsApp message with the tour and the number of travellers. Booking advances and instalment terms are set by the office per tour, so ask for them in writing on your confirmation rather than relying on a figure on this site.',
  },
  {
    q: 'When will the prices and departure dates appear on the website?',
    a: 'As soon as the owner supplies them. Everything here is marked either demonstration or to be confirmed, because a package price changes with the season and the room sharing, and a seat count changes the moment somebody books.',
  },
  {
    q: 'Can elderly travellers join a group tour?',
    a: 'Yes, and pilgrimage groups are planned with them in mind — an early start, a fixed darshan slot, a slower afternoon and ground-floor rooms where they can be had. Tell us the ages when you enquire so the hotel and the coach seats are chosen accordingly.',
  },
  {
    q: 'What is included in a package?',
    a: 'It varies by tour. Each tour page lists what a package of that kind normally covers — transport, stay, meals, sightseeing, the permits a route needs — and marks everything else as extra. Always confirm the final list on the written confirmation.',
  },
  {
    q: 'Can I book a private trip instead of joining a group?',
    a: 'Yes. Couples, single families and small circles of friends are planned as private journeys with their own car and driver. Go to Customised Holidays and tell us who is travelling and when.',
  },
  {
    q: 'Do you arrange flights and trains as well?',
    a: 'Air and rail tickets are part of the plan for most journeys and the office books them together with the ground arrangements. Say so at the start and it is built into the itinerary.',
  },
  {
    q: 'What happens after I send the enquiry form?',
    a: 'The form checks what you have typed and puts your details into a WhatsApp message for you to send, because this website has no server behind it and cannot store or deliver your enquiry. If you would rather not use WhatsApp, ring either office number.',
  },
  {
    q: 'Can you cancel or change a booking?',
    a: 'Cancellation and refund terms are set by the office and depend on how close to departure you are and what has already been paid to hotels and transporters. Ask for the terms when you book — they are put in writing with your confirmation.',
  },
  {
    q: 'Do you plan tours for groups from outside Belagavi?',
    a: 'Frequently — groups travel to us from across Karnataka and the Marathi-speaking towns over the border. Bengaluru, Hubballi, Dharwad, Bagalkot, Vijayapura, Haveri, Shivamogga, Pune and Kolhapur are all towns we board from. We can plan the journey to Belagavi, or arrange for the group to join the tour further along the route.',
  },
]

export default function Faq() {
  return (
    <>
      <Meta
        title="Frequently asked questions"
        description="How Shivu Package Tours plans group departures from Belagavi — boarding points, booking advances, inclusions, pilgrimage tours, private trips and enquiry handling."
      />
      <main id="main">
        <PageHead
          label="Help"
          title="Questions travellers ask us before booking"
          body="Boarding points, advances, what a package covers and what this website can and cannot do yet. If your question is not here, the office will answer it in a minute."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/faq', label: 'FAQ' },
          ]}
        />

        <section className="container-content px-gutter pb-section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
            <FaqList title="Booking, boarding and packages" items={faqs.slice(0, 7)} id="booking" />
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                label="Still unsure"
                title="Ask the office directly"
                body="Two phone lines and a WhatsApp number, answered during working hours."
              />
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild size="lg" variant="accent">
                  <a
                    href={waLink('Hello Shivu Package Tours, I have a question about booking a tour.')}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Message on WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={CONTACT.phonePrimaryHref}>Call {CONTACT.phonePrimary}</a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href={CONTACT.phoneSecondaryHref}>Call {CONTACT.phoneSecondary}</a>
                </Button>
              </div>
              <Link
                to="/tours"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Browse the tour packages
                <Icon as={ArrowRight} className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-secondary/60 py-section">
          <div className="container-content px-gutter">
            <FaqList title="Booking terms and practical matters" items={faqs.slice(7)} id="practical" />
          </div>
        </section>

        <ContactStrip />
      </main>
    </>
  )
}
