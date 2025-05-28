import Image from "next/image";

import { sanityClient } from "@/lib/sanity/client";
import { heroImageQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/utils";
import { MediaDocument } from "@/lib/sanity/types";

export async function getHeroImage(): Promise<
  MediaDocument["heroImage"] | null
> {
  const data = await sanityClient.fetch<Pick<MediaDocument, "heroImage">>(
    heroImageQuery
  );
  return data?.heroImage || null;
}

export const Hero = async () => {
  const heroImage = await getHeroImage();

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
