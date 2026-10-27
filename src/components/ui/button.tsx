import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /* The hover step darkens to --ink rather than mixing the teal towards
           the page it sits on: a 90% alpha let the warm ground through and
           dropped the label under 4.5:1 for the duration of the hover. --ink
           with --primary-foreground is 13.9:1. */
        default: "bg-primary text-primary-foreground hover:bg-ink",
        destructive:
          "bg-destructive text-accent-foreground hover:bg-ink focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
         /* The outline button's hover paints the same accent plate, so it takes
            the same opaque step rather than the mixed one. */
         /* The resting outline button sits on the warm-white page, so it states
            its own ink label rather than inheriting one: on an ink band the
            inherited label was ink on ink before the pointer arrived. */
        /* --input rather than --border: a hairline of the border tint is a
           1.2:1 graphic on the warm ground, and this outline is the only edge
           some of these buttons have. --input is the step that clears 3:1 on
           the page, on --secondary and on the white card. */
        outline:
            "border-input bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        /* On an ink band the same hover plate would put --accent-foreground (an
           ink label) on an ink plate. The band's own variant keeps the light
           label and the ink hover, so the button stays readable both before and
           during the hover. */
        "outline-on-ink":
          "border-ink-foreground/45 bg-transparent text-ink-foreground shadow-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-ink-foreground/50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        "ghost-on-ink":
          "text-ink-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ink-foreground/50 dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        /* The accent plate is opaque on hover. At 85% alpha the warm ground
           lifts the surface and the near-white label on it falls under
           4.5:1 for as long as the pointer rests there. --ink keeps the
           hover step 9:1 or better. */
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-ink hover:text-ink-foreground focus-visible:ring-accent/40",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
