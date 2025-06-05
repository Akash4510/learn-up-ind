import Image from "next/image";

import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Hero = async ({
  heroImage,
}: {
  heroImage?: MediaDocument["heroImage"];
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl p-2">
      <Image
        src={urlFor(heroImage).url()}
        alt="Hero"
        width={1920}
        height={1080}
        className="rounded-xl"
      />
    </div>
  );
};
