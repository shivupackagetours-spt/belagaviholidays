/* The business appears wherever its name does through this one component.

   The owner's logo file is the mark, at every size and in every place. It is
   never redrawn, traced, recoloured or simplified — the site does not draw a
   second version of it. `shivu-logo.webp` is the supplied artwork: the emblem —
   palm, plane, train, coach and suitcase — over SHIVU PACKAGE TOURS ruled, with
   "Your Comfort Is Our Priority" beneath. The name is not set beside it: the
   lockup already spells it.

   The artwork is dark text and orange on white, so on the ink bar and the footer
   it sits on a light plate rather than a recoloured copy — a navy wordmark on a
   navy ground is not a logo, it is a smudge. `shivu-symbol.webp` is the emblem
   cropped from the same artwork, for the places where three lines of name are
   too small to read: the top bar and the sheet, and the footer, which is only
   44px deep. */
import { cn } from '@/lib/utils'

const LOCKUP = '/images/shivu-logo.webp'
const SYMBOL = '/images/shivu-symbol.webp'

/* The supplied files' own proportions: the full lockup with its three lines of
   name, and the emblem crop taken from the top of the same artwork. */
const LOCKUP_RATIO = 1000 / 657
const SYMBOL_RATIO = 663 / 449

export function Brand({
  className,
  tone = 'default',
  height = 44,
  variant = 'full',
}: {
  className?: string
  /** `ink` is the navy bar and the footer, where the mark sits on a light plate. */
  tone?: 'default' | 'ink'
  /** Rendered height in px. Width follows the artwork's own proportions. */
  height?: number
  /** `full` is the whole lockup; `compact` is the emblem alone, for the bar,
   *  where the name under it would be illegible. `only` renders nothing, for a
   *  footer that has already introduced the business. */
  variant?: 'full' | 'compact' | 'only'
}) {
  if (variant === 'only') return null

  const ink = tone === 'ink'
  const logo = variant === 'compact' || ink ? SYMBOL : LOCKUP
  const ratio = variant === 'compact' || ink ? SYMBOL_RATIO : LOCKUP_RATIO
  const h = height
  const w = Math.round(h * ratio)

  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={logo}
        alt="Shivu Package Tours, Belagavi — Your Comfort Is Our Priority"
        width={w}
        height={h}
        style={{ width: w, height: h }}
        className="block max-w-none object-contain"
      />
    </span>
  )
}
