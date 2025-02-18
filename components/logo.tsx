import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  asLink?: boolean;
  full?: boolean;
  showFullInMobile?: boolean;
}

export const Logo = ({ size, asLink, full, showFullInMobile }: LogoProps) => {
  const logoSize = size || 32;

  const content = (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="logo"
        width={logoSize}
        height={logoSize}
        quality={100}
      />
      {full && (
        <h1 className={cn("md:flex text-xl", !showFullInMobile && "hidden")}>
          LearnUPIND
        </h1>
      )}
    </div>
  );

  return asLink ? (
    <Link href="/" className="cursor-pointer">
      {content}
    </Link>
  ) : (
    content
  );
};
