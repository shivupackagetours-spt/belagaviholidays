/* Rating, drawn not decorated. The scale is the one the office will actually
   ask a returning traveller for, and every word a visitor reads is on the
   right of it — a bare row of stars tells nobody what the fourth one is for.
   The current step is filled, the rest are outlines, so the whole control
   stays inside the brown/gold pair the site already uses on light grounds.
   A drawn star, not an icon font: it lives inside another graphic or badge as
   often as it sits in a row, and one path is lighter than the icon set. */
import { Icon } from '@/components/Icon'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Half steps are on the scale because "four and a half" is what people say
   when a hotel was good and the coach was not. */
export const RATING_STEPS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export function ratingWords(value: number) {
  if (value < 2) return 'Below what we aim for'
  if (value < 3) return 'Not what you were promised'
  if (value < 4) return 'Good, with something to fix'
  if (value < 4.5) return 'A good tour'
  if (value < 5) return 'Very good'
  return 'Could not have been better'
}

/* The five-pointed mark, drawn once. Filled or outlined by the classes at the
   call site, so it takes the token colour wherever it appears. */
export function StarGlyph({
  className,
  clipPath,
  filled = true,
}: {
  className?: string
  clipPath?: string
  filled?: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : 1.75}
      aria-hidden="true"
      focusable="false"
      style={clipPath ? { clipPath } : undefined}
      className={cn('size-4 shrink-0', className)}
    >
      <path d="M12 1.8l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.57l-6.18 3.25L7 13.94l-5-4.87 6.91-1.01z" />
    </svg>
  )
}

/* ── The ten-point control ───────────────────────────────────────────────── */
export function RatingPicker({
  value,
  onChange,
  name = 'rating',
  className,
}: {
  value: number
  onChange: (value: number) => void
  name?: string
  className?: string
}) {
  return (
    <fieldset className={cn('border-border rounded-lg border p-4 sm:p-5', className)}>
      <legend className="font-label text-muted-foreground px-2 text-[0.6875rem] tracking-[0.2em] uppercase">
        Your rating
      </legend>
      {/* A radio group: arrow keys step through the scale and one tab stop
          takes the visitor in and back out again. */}
      <div className="mt-1 flex flex-wrap gap-2">
        {RATING_STEPS.map((step) => {
          const selected = step === value
          const filled = Math.ceil(step)
          return (
            <label
              key={step}
              className={cn(
                'flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 transition-colors duration-150 motion-reduce:transition-none',
                selected
                  ? 'border-primary bg-secondary'
                  : 'border-input hover:bg-muted has-focus-visible:border-primary',
              )}
            >
              <input
                type="radio"
                name={name}
                value={step}
                checked={selected}
                onChange={() => onChange(step)}
                className="sr-only"
              />
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    as={Star}
                    className={cn(
                      'size-3.5',
                      star <= filled ? 'fill-accent text-accent' : 'text-muted-track',
                    )}
                  />
                ))}
              </span>
              <span className={cn('text-sm font-medium tabular-nums', selected ? 'text-foreground' : 'text-muted-foreground')}>
                {step}
              </span>
            </label>
          )
        })}
      </div>
      <p className="text-muted-foreground mt-3 text-sm" aria-live="polite">
        {value ? `${value} out of 5 — ${ratingWords(value)}` : 'Pick a rating, in steps of a half.'}
      </p>
    </fieldset>
  )
}

/* ── The same stars, read only, for a tour line ──────────────────────────── */
export function RatingDisplay({
  value,
  className,
  withLabel = true,
}: {
  value: number
  className?: string
  withLabel?: boolean
}) {
  const filled = Math.ceil(value)
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <StarGlyph
              key={star}
              filled={star <= filled}
              className={cn('size-4', star <= filled ? 'text-accent' : 'text-muted-track')}
            />
        ))}
        <span className="sr-only">{`${value} out of 5`}</span>
      </span>
      {withLabel ? (
        <span className="text-muted-foreground text-sm">
          <span className="text-foreground font-medium tabular-nums">{value}</span> / 5 — {ratingWords(value)}
        </span>
      ) : null}
    </span>
  )
}
