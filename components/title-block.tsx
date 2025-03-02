"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

// Define variants using cva
const titleBlockVariants = cva("space-y-1", {
  variants: {
    size: {
      sm: "space-y-0.5",
      md: "space-y-1",
      lg: "space-y-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const titleVariants = cva("font-bold tracking-wider", {
  variants: {
    size: {
      sm: "text-xl",
      md: "text-[1.75rem] md:text-3xl",
      lg: "text-4xl md:text-5xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const subtitleVariants = cva("text-sm text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface TitleBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof titleBlockVariants>,
    VariantProps<typeof titleVariants>,
    VariantProps<typeof subtitleVariants> {
  title: string;
  subtitle?: string;
  withSeparator?: boolean;
}

export const TitleBlock = ({
  title,
  subtitle,
  size,
  withSeparator,
  className,
  ...props
}: TitleBlockProps) => {
  return (
    <div
      className={cn(titleBlockVariants({ size, className }))}
      {...props}
      aria-label={title}
    >
      <h1 className={cn(titleVariants({ size }))}>{title}</h1>
      {subtitle && (
        <h2
          className={cn(subtitleVariants({ size }))}
          aria-describedby="subtitle"
        >
          {subtitle}
        </h2>
      )}

      {withSeparator && <Separator className="!mt-3" />}
    </div>
  );
};
