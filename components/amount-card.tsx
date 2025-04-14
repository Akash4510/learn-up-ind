"use client";

import { IndianRupee } from "lucide-react";
import CountUp from "react-countup";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface AmountCardProps {
  title: string;
  amount: number;
  shouldAnimate?: boolean;
  duration?: number;
  className?: string;
}

export const AmountCard = ({
  title,
  amount,
  shouldAnimate = true,
  duration = 2,
  className,
}: AmountCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-2xl">
          <IndianRupee className="size-5" />{" "}
          {shouldAnimate ? (
            <CountUp end={amount} duration={duration} />
          ) : (
            `${amount}`
          )}
        </div>
      </CardContent>
    </Card>
  );
};
