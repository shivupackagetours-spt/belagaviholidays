import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Home from '@/pages/Home'
import { Shell } from '@/components/Shell'
import { Meta } from '@/components/Meta'

// Routes are code-split so the first paint carries only the landing page. The
// landing route stays eager; everything else is fetched when it is asked for.
const Tours = lazy(() => import('@/pages/Tours'))
const TourDetail = lazy(() => import('@/pages/TourDetail'))
const Departures = lazy(() => import('@/pages/Departures'))
const Customised = lazy(() => import('@/pages/Customised'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Reviews = lazy(() => import('@/pages/Reviews'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Faq = lazy(() => import('@/pages/Faq'))
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Terms })))
const Cancellation = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.Cancellation })),
)
const NotFound = lazy(() => import('@/pages/NotFound'))

/* The shell — top bar, footer, the one-tap call bar and the floating WhatsApp
   button — wraps every route. Each page owns its own `main`. */
export default function App() {
  return (
    <Shell>
      <Suspense
        fallback={
          <div className="container-content px-gutter py-32 text-sm text-muted-foreground">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route
            index
            element={
              <>
                <Meta
                  title="Shivu Package Tours, Belagavi — domestic, international and pilgrimage tours"
                  description="Group tours, pilgrimage yatras, family holidays and customised journeys planned from Belagavi. Your Journey, Our Responsibility."
                />
                <Home />
              </>
            }
          />
          <Route path="tours" element={<><Meta title="All tour packages from Belagavi" description="Domestic, international and pilgrimage packages planned from Belagavi — Kashmir, Kerala, Rajasthan, Thailand, Dubai, Char Dham, Shirdi and more. Filter by region, duration and departure month." /><Tours /></>} />
          <Route path="tours/:slug" element={<><Meta title="Tour package from Belagavi" description="Day-wise plan, inclusions, hotel and transport details for this package, with the office confirming prices and dates before any booking." /><TourDetail /></>} />
          <Route path="domestic" element={<><Meta title="Domestic tour packages from Belagavi" description="Kashmir, Kerala, Rajasthan, the Northeast, Karnataka and the rest of India, planned as group and private packages from Belagavi." /><Tours /></>} />
          <Route path="international" element={<><Meta title="International tour packages from Belagavi" description="Thailand, Dubai, Nepal, Singapore, Bali, Sri Lanka, Bhutan and Europe — visas, flights and departures planned from Belagavi." /><Tours /></>} />
          <Route path="pilgrimage" element={<><Meta title="Pilgrimage tours from Belagavi" description="Char Dham, Kashi, Ayodhya, Shirdi and the Ashtavinayak circuit — assisted yatra planning from Belagavi with one person answerable throughout." /><Tours /></>} />
          <Route path="departures" element={<><Meta title="Upcoming group departures from Belagavi" description="Group tours leaving Belagavi, with the destinations, durations and reporting points. Ask the office to hold a seat on the departure that suits you." /><Departures /></>} />
          <Route path="customised" element={<><Meta title="Customised holidays and private tours" description="Honeymoons, family trips, senior citizen journeys and group bus tours built around your dates, your pace and your budget, planned from Belagavi." /><Customised /></>} />
          <Route path="gallery" element={<><Meta title="Destinations we plan from Belagavi" description="Photographs of the places our Belagavi groups travel to — the Himalaya, the Kerala backwaters, Rajasthan's forts, the Varanasi ghats and the coast." /><Gallery /></>} />
          <Route path="reviews" element={<><Meta title="Traveller reviews" description="Feedback from travellers who have booked with Shivu Package Tours in Belagavi. Reviews are published only with the traveller's permission." /><Reviews /></>} />
          <Route path="about" element={<><Meta title="About Shivu Package Tours, Belagavi" description="A Belagavi tour operator planning group journeys, pilgrimages and family holidays — with one person answerable for your trip from the first call to the journey home." /><About /></>} />
          <Route path="contact" element={<><Meta title="Contact Shivu Package Tours" description="Call the Belagavi office on +91 99804 49921 or +91 77602 10382, message WhatsApp, or send the enquiry form with your dates and destination." /><Contact /></>} />
          <Route path="faq" element={<><Meta title="Booking questions answered" description="Advance payment, cancellation, passports, visas, boarding points and travelling with children and senior citizens — answered plainly." /><Faq /></>} />
          <Route path="privacy" element={<><Meta title="Privacy policy" description="What Shivu Package Tours does with the details you share on WhatsApp, by phone or in an enquiry — and why nothing you type here is stored." /><Privacy /></>} />
          <Route path="terms" element={<><Meta title="Terms and conditions" description="Booking, payment, documentation and traveller responsibilities for tours arranged by Shivu Package Tours, Belagavi." /><Terms /></>} />
          <Route path="cancellation" element={<><Meta title="Cancellation and refund policy" description="How to cancel a booking, what is refundable and when, and which costs hotels, airlines and railways do not return." /><Cancellation /></>} />
          <Route
            path="*"
            element={
              <>
                <Meta title="Page not found" description="That page is not on this site." />
                <NotFound />
              </>
            }
          />
        </Routes>
      </Suspense>
    </Shell>
  )
}
