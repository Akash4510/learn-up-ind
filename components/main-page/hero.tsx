import Image from "next/image";

import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Hero = async ({
  content,
}: {
  content: HomePageContent["heroSection"];
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl p-2">
      <Image
        src={urlFor(content.image).url()}
        alt="Hero"
        width={1920}
        height={1080}
        className="rounded-xl"
      />
    </div>
  );
};
