/* Every photograph on this site is a real picture of the place it names, and
   each one was taken by somebody. The credits live in
   `src/data/photo-credits.json`, written when the files were added; this is the
   one place they are rendered, at the foot of the footer, in the smallest
   register the page has. A credit nobody reads is still a credit owed. */
import credits from '@/data/photo-credits.json'

type Credit = {
  file: string
  photographer: string
  /** The library the photograph came from. `office` means the owner's own
   *  picture, which has no page to link to. */
  provider: string
  /** Present only for a photograph that came from a stock library. */
  source_url?: string
}

const PROVIDERS: Record<string, string> = {
  pexels: 'Pexels',
  unsplash: 'Unsplash',
}

export function PhotoCredits({ className }: { className?: string }) {
  if (credits.length === 0) return null

  return (
    <section aria-labelledby="photo-credits-heading" className={className}>
      <h2
        id="photo-credits-heading"
        className="font-label text-ink-foreground text-[0.6875rem] tracking-[0.2em] uppercase"
      >
        Photograph credits
      </h2>
      <p className="text-ink-foreground mt-3 max-w-[68rem] text-xs leading-relaxed">
        Destination photographs on this site are by{' '}
        {(credits as Credit[]).map((credit, i) => (
          <span key={credit.file}>
            {i > 0 && (i === credits.length - 1 ? ' and ' : ', ')}
            {credit.source_url ? (
              <a
                href={credit.source_url}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="hover:text-gold text-ink-foreground underline underline-offset-2"
              >
                {credit.photographer.trim()}
              </a>
            ) : (
              <span className="text-ink-foreground">{credit.photographer.trim()}</span>
            )}
            {credit.provider && ` (${PROVIDERS[credit.provider] ?? credit.provider})`}
          </span>
        ))}
        .
      </p>
    </section>
  )
}
