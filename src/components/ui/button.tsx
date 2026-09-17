import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-all duration-300 focus-visible:outline-1 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-bone hover:bg-[#2a2a2a] active:scale-[0.98]',
        outline:
          'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone',
        ghost: 'text-ink hover:bg-ink/5',
        gold: 'bg-gold text-ink hover:bg-[#c6ab72]',
        light: 'bg-bone text-ink hover:bg-white',
      },
      size: {
        default: 'h-11 px-7',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }