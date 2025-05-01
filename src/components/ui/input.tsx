
import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={cn("relative", type === "price" && "flex items-center", type === "room-number" && "w-24")}>
        {type === "price" && (
          <span className="absolute left-3 text-muted-foreground">$</span>
        )}
        {type === "room-number" && (
          <span className="absolute left-3 text-muted-foreground text-xs">#</span>
        )}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          type={type === "price" || type === "room-number" ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            type === "price" && "pl-7",
            type === "room-number" && "pl-7",
            icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
