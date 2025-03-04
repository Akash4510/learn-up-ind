"use client";

import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";

import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { TitleBlock } from "@/components/title-block";

interface ReferralLinkBlockProps {
  code: string;
}

export const ReferralLinkBlock = ({ code }: ReferralLinkBlockProps) => {
  const linkWithReferral = `${process.env.NEXT_PUBLIC_HOME_URL}/auth/register?ref=${code}`;
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(linkWithReferral);
    setCopied(true);

    toast.success("Referral code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-accent border rounded-md p-4 space-y-3">
      <TitleBlock
        title="Your affiliate link"
        subtitle="You can directly share the app link with your refferal code!"
        size="sm"
      />

      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={linkWithReferral}
          readOnly
          className="flex-grow bg-background/60 rounded-md p-2 font-mono border-none focus:border-none outline-none focus:outline-none"
        />

        <Hint label="Copy link" side="top" asChild>
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
