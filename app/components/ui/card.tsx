import { forwardRef } from "react"
import clsx from "clsx"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx("p-4", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent" 