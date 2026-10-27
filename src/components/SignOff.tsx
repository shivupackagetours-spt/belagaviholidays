/* The full lockup, not decoration: the owner's mark and the line the office
   signs with, set in Fraunces rather than repeated as gold text — the lockup
   already carries the line in the artwork, so the wrapper stays quiet. Used on
   the 404 and as the closing mark on policy pages. */
import { Brand } from '@/components/Brand'
import { CONTACT } from '@/data/company'
import { cn } from '@/lib/utils'

export function SignOff({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-5 border-t border-border pt-8 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <Brand height={48} />
      <p className="font-label max-w-[22rem] text-sm leading-relaxed text-ink-foreground">
        Group tours, pilgrimage yatras and customised holidays, planned from Belagavi. Ring the
        office on{' '}
        <a href={CONTACT.phonePrimaryHref} className="text-foreground underline underline-offset-4">
          {CONTACT.phonePrimary}
        </a>
        .
      </p>
    </div>
  )
}
