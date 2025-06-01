"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";

import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { TitleBlock } from "@/components/title-block";

interface ReferralCodeBlockProps {
  code: string;
}

export const ReferralCodeBlock = ({ code }: ReferralCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    toast.success("Referral code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border rounded-md p-4 space-y-3">
      <TitleBlock
        title="Your affiliate code"
        subtitle="Share your referral code to others! Users can make purchase using your referral code"
        size="sm"
      />

      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={code}
          readOnly
          className="flex-grow bg-background/60 rounded-md p-2 font-mono border-none focus:border-none outline-none focus:outline-none"
        />

        <Hint label="Copy code" side="top" asChild>
          <Button
            size="icon"
            className="bg-foreground/80 hover:bg-foreground/60"
            onClick={onCopy}
          >
            {copied ? (
              <CopyCheck className="size-4 text-emerald-700" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </Hint>
      </div>
    </div>
  );
};
