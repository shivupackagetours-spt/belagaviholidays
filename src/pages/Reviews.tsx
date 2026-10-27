import { useState } from 'react'
import { Meta } from '@/components/Meta'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/Icon'
import { ContactStrip, FaqList, PageHead, ReviewWall, TrustReviews } from '@/components/sections'
import { RatingDisplay, RatingPicker, ratingWords } from '@/components/ReviewStars'
import { CONTACT, waLink } from '@/data/company'
import { tours } from '@/data/tours'
import { MessageSquareQuote } from 'lucide-react'

/* The traveller's own words, handed to WhatsApp. Nothing is sent from this page
   and nothing is stored: the fields build the message and the visitor sends it
   from their own phone, which is how the office actually receives reviews. */
function ReviewComposer() {
  const [name, setName] = useState('')
  const [tour, setTour] = useState('')
  const [travelled, setTravelled] = useState('')
  const [note, setNote] = useState('')
  const [rating, setRating] = useState(0)
  const [mayPublish, setMayPublish] = useState(true)

  const ready = name.trim().length > 0 && note.trim().length > 0 && rating > 0
  const missing = !name.trim()
    ? 'Your name and your review are needed first.'
    : !note.trim()
      ? 'Your name and your review are needed first.'
      : 'Pick a rating between a half and five before you send.'
  const message = [
    'Hello Shivu Package Tours, here is my review.',
    `Name: ${name.trim() || '—'}`,
    `Tour: ${tour.trim() || '—'}`,
    `Travelled in: ${travelled.trim() || '—'}`,
    `Rating: ${rating > 0 ? `${rating} out of 5 — ${ratingWords(rating)}` : '—'}`,
    '',
    note.trim(),
    '',
    mayPublish
      ? 'You may publish this with my name on it.'
      : 'Please do not publish this — it is for the office only.',
  ].join('\n')

  return (
    <section className="bg-secondary py-section">
      <div className="container-content px-gutter">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <span className="bg-card text-primary grid size-12 place-items-center rounded-full">
              <Icon as={MessageSquareQuote} className="size-5" />
            </span>
            <h2 className="mt-5 text-3xl text-balance md:text-4xl">Write yours here</h2>
            <p className="text-muted-foreground mt-4 max-w-measure leading-relaxed">
              Fill this in and the button below opens WhatsApp with your review already written out.
              You send it yourself, from your own number, and the office reads it and writes back.
              Nothing you type here leaves the page on its own.
            </p>
            <p className="text-muted-foreground mt-4 max-w-measure text-sm leading-relaxed">
              Rate the tour out of five — halves count — and write what you thought. If anything
              went wrong, put that in too: we would rather answer it on WhatsApp than have you hold
              it in.
            </p>
            <p className="text-muted-foreground mt-6 max-w-measure text-sm leading-relaxed">
              Here is how your rating reads once the office puts it up with your permission — your
              mark, your name, your tour, your words underneath, and nothing averaged or tidied.
            </p>
            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
              <p className="font-label text-muted-foreground text-[0.6875rem] tracking-[0.2em] uppercase">
                As it will appear
              </p>
              <RatingDisplay value={rating} withLabel={false} />
              <p className="text-foreground font-medium">
                {name.trim() || 'Your name here'}
                <span className="text-muted-foreground font-normal">
                  {' · '}
                  {tour.trim() || 'your tour'}
                  {travelled.trim() ? ` · ${travelled.trim()}` : ''}
                </span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                {note.trim()
                  ? `“${note.trim()}”`
                  : 'Your own sentences, exactly as you wrote them — nothing tidied up, nothing added.'}
              </p>
            </div>
          </div>

          <form
            className="surface-card flex flex-col gap-5 p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(waLink(message), '_blank', 'noopener,noreferrer')
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="review-name" className="text-sm font-medium">
                  Your name
                </label>
                <input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="border-input bg-background focus-visible:ring-ring h-11 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="review-travelled" className="text-sm font-medium">
                  Which month did you travel
                </label>
                <input
                  id="review-travelled"
                  value={travelled}
                  onChange={(e) => setTravelled(e.target.value)}
                  placeholder="For example, November last year"
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring h-11 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="review-tour" className="text-sm font-medium">
                Which tour
              </label>
              <input
                id="review-tour"
                value={tour}
                onChange={(e) => setTour(e.target.value)}
                list="review-tour-options"
                placeholder="Start typing, or name your own"
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring h-11 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
              <datalist id="review-tour-options">
                {tours.map((t) => (
                  <option key={t.slug} value={t.name} />
                ))}
              </datalist>
            </div>

                        <RatingPicker value={rating} onChange={setRating} />

            <div className="flex flex-col gap-2">
              <label htmlFor="review-note" className="text-sm font-medium">
                Your review
              </label>
              <textarea
                id="review-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={6}
                placeholder="What the tour was like — the hotel, the coordinator, the pace, the food, what you would have changed."
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring resize-y rounded-md border px-3 py-2.5 text-sm leading-relaxed focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            <div className="border-border flex items-start gap-3 border-t pt-5">
              <input
                id="review-publish"
                type="checkbox"
                checked={mayPublish}
                onChange={(e) => setMayPublish(e.target.checked)}
                className="accent-primary focus-visible:ring-ring mt-0.5 size-5 shrink-0 focus-visible:ring-2 focus-visible:outline-none"
              />
              <label htmlFor="review-publish" className="text-sm leading-relaxed">
                <span className="font-medium">You may publish this with my name on it.</span>{' '}
                <span className="text-muted-foreground">
                  Untick it and the review is read by the office and goes no further.
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" variant="accent" size="lg" disabled={!ready}>
                Open WhatsApp with this review
              </Button>
              <p className="text-muted-foreground text-sm" aria-live="polite">
                {ready ? 'Opens in a new tab — press send there.' : missing}
              </p>
            </div>

            <p className="border-border text-muted-foreground border-t pt-5 text-sm leading-relaxed">
              Unable to use WhatsApp? Call the office on{' '}
              <a href={CONTACT.phonePrimaryHref} className="text-primary underline underline-offset-4">
                {CONTACT.phonePrimary}
              </a>{' '}
              or{' '}
              <a href={CONTACT.phoneSecondaryHref} className="text-primary underline underline-offset-4">
                {CONTACT.phoneSecondary}
              </a>{' '}
              and dictate it — someone will write it down.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default function Reviews() {
  return (
    <>
      <Meta
        title="Customer reviews"
        description="Reviews of Shivu Package Tours, published only with the consent of the traveller who wrote them — and the places to read what people say while this page is empty."
      />
      <main id="main">
        <PageHead
          label="Reviews"
          title="What our travellers say, in their own words"
          body="Nothing on this page is written by us. A review appears here only after the traveller who wrote it says we may publish it."
          breadcrumb={[
            { to: '/', label: 'Home' },
            { to: '/reviews', label: 'Reviews' },
          ]}
        />

        <TrustReviews />

        <section className="container-content px-gutter py-section">
          <ReviewWall />
        </section>

        <ReviewComposer />

        <section className="bg-secondary/60 py-section">
          <div className="container-content px-gutter">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start">
              <div>
                <h2 className="font-display text-3xl">Why this page is empty right now</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A tour company that posts five-star quotes with first names and no faces is telling
                  you nothing. We would rather leave the space empty and fill it with real reviews,
                  photographs included, as travellers agree to have them shown.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  If you have travelled with us, ask us to take a short written review, or send it
                  to the office on WhatsApp and tell us it is fine to publish.
                </p>
              </div>
              <FaqList
                title="About reviews and photographs"
                items={[
                  {
                    q: 'Do you publish reviews without asking?',
                    a: 'No. We ask the traveller first, in writing, and we use their review as they wrote it rather than tidying it up.',
                  },
                  {
                    q: 'Can I leave a review even if something went wrong?',
                    a: 'Yes, and it will be published the same way. A trip that had a problem and was sorted out is more useful to the next traveller than one that was perfect.',
                  },
                  {
                    q: 'What rating should I give?',
                    a: 'Whatever you actually felt, in halves if that is where you land — four and a half for a good hotel and a long coach day is a fair mark. It is published as your mark, not folded into an average.',
                  },
                  {
                    q: 'Where else can I read about you?',
                    a: 'Wherever the office has a verified listing — a business profile or a travel platform. When those links are supplied they will be listed here rather than described.',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <ContactStrip />
      </main>
    </>
  )
}
