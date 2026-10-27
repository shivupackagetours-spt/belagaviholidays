/* The one icon weight for the whole site. Lucide draws at stroke-width 2 by
   default; 1.75 sits between the editorial 1.5 and the heavy 2 and is recorded
   in DESIGN.md. Import icons by name from lucide-react and pass them through
   here so no call site can disagree. */
import type { ComponentProps, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ICON_STROKE = 1.75

export function Icon({
  as: Glyph,
  className,
  children,
  ...props
}: { as: LucideIcon; className?: string; children?: ReactNode } & Omit<
  ComponentProps<LucideIcon>,
  'ref' | 'children'
>) {
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      strokeWidth={ICON_STROKE}
      className={cn('size-5 shrink-0', className)}
      {...props}
    />
  )
}
