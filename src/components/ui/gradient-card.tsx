import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hero" | "subtle";
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-card border shadow-md",
      hero: "bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-lg",
      subtle: "bg-gradient-to-br from-muted/50 to-background border shadow-sm"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-6 text-card-foreground transition-all duration-300",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

GradientCard.displayName = "GradientCard";

export { GradientCard };