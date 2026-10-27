import { Meta } from '@/components/Meta'
import { ContactStrip, PageHead } from '@/components/sections'
import { SignOff } from '@/components/SignOff'
import { Icon } from '@/components/Icon'
import { Compass, HeartHandshake, Phone, ShieldCheck } from 'lucide-react'

export default function About() {
  const pillars = [
    {
      title: 'The departure is the product',
      body: 'A group tour is only worth it if it starts near you. Every journey here leaves from Belagavi, with boarding points across the district, so the holiday begins at home rather than at an airport three hours away.',
      icon: Compass,
    },
    {
      title: 'Pilgrimage gets its own pace',
      body: 'Darshan timings, prasadam, resting rooms and how far an elderly traveller can walk — these decide a pilgrimage itinerary, not the sightseeing list. Our temple circuits are planned around them.',
      icon: ShieldCheck,
    },
    {
      title: 'Someone answers the phone',
      body: 'You will speak to a person who knows the tour you are asking about — not a call centre. Ask about the hotel, the walking, or whether your mother can manage the steps, and you will get a straight answer.',
      icon: Phone,
    },
    {
      title: 'Customised when a group does not fit',
      body: 'Honeymoon couples, parents travelling with a young child, a family that wants its own car: all planned individually, with the same driver and the same checks.',
      icon: HeartHandshake,
    },
  ]
  return (
    <>
      <Meta
        title="About Shivu Package Tours, Belagavi"
        description="A Belagavi travel office planning domestic and international group tours, pilgrimage yatras, family holidays and customised journeys across Karnataka and Maharashtra."
      />
      <main id="main">
        <PageHead
          label="About us"
          title="A Belagavi travel office, planning journeys from home"
          body="Shivu Package Tours plans domestic and international holidays, group departures, pilgrimage yatras and customised family trips — the kind that start at a boarding point in Belagavi and end with you back on your own street."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About us' },
          ]}
        />

        <section className="container-content px-gutter pb-section">
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((p) => (
              <article key={p.title} className="surface-card p-6 md:p-7">
                <Icon as={p.icon} className="size-5 text-primary" />
                <h2 className="font-display mt-4 text-2xl">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-ink text-ink-foreground py-section">
          <div className="container-content px-gutter">
            <div className="max-w-[46rem]">
              <p className="font-label text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
                Our promise
              </p>
              <h2 className="font-display mt-4 text-3xl text-ink-foreground md:text-4xl">
                 &ldquo;Your Comfort Is Our Priority&rdquo; is a working instruction
              </h2>
              <p className="mt-5 leading-relaxed text-ink-muted">
                It means the itinerary you are shown is the itinerary you travel. It means that if a
                hotel lets us down, the office moves you rather than leaving you to argue at the
                desk. It means the person who took your booking is reachable on the phone while you
                are away.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                It also means we tell you what we are not certain about. Where a price, a date or a
                seat count is not confirmed, this site says so rather than filling the gap with a
                number that looks reassuring.
              </p>
            </div>
          </div>
        </section>

        <section className="container-content px-gutter py-section">
          <div className="max-w-[46rem]">
            <h2 className="font-display text-3xl">Who we plan for</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Mostly families and groups from Belagavi, Bailhongal, Gokak, Athani, Chikodi, Nippani
              and the towns around them, travelling together — a joint family to Kashmir, a
              neighbourhood group to Shirdi, a circle of colleagues to Thailand. Also couples on a
              honeymoon, parents taking a child to see the sea for the first time, and retired
              travellers who want the comfort of a planned group without the rush of one.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The office has been arranging journeys of this kind for travellers across Karnataka and
              the Marathi-speaking belt of the state's border districts, and the site is built to add
              Kannada and Marathi alongside English once the translations are supplied.
            </p>
          </div>
        </section>

        <section className="container-content px-gutter py-section">
          <SignOff />
        </section>

        <ContactStrip
          title="Come and talk it through"
          body="A holiday is easier to plan in conversation than in a form. Ring the office, or send a message on WhatsApp and we will reply with what is actually available."
        />
      </main>
    </>
  )
}
