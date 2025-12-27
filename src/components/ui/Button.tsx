import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button Component - Combat Clutter LLC
 * 
 * Reusable button with multiple variants and sizes.
 * Follows Combat Clutter brand design system.
 * 
 * Usage:
 *   <Button variant="primary" size="lg">Click me</Button>
 *   <Button asChild><Link href="/about">Learn More</Link></Button>
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-secondary hover:bg-primary/90 shadow-lg',
        secondary:
          'bg-secondary text-primary border-2 border-primary hover:bg-neutral-100',
        accent:
          'bg-accent text-primary hover:bg-accent/90 shadow-lg',
        outline:
          'border-2 border-primary bg-transparent hover:bg-primary hover:text-secondary',
        ghost: 'hover:bg-neutral-100 hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-11 rounded-md px-8',
        lg: 'h-14 rounded-md px-10 text-base',
        xl: 'h-16 rounded-md px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
