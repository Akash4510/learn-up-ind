import Image from "next/image";

import { sanityClient } from "@/lib/sanity/client";
import { LiveOffers } from "@/lib/sanity/types";
import { getLiveOffersQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/utils";

export async function getLiveOffers(): Promise<LiveOffers["offers"]> {
  const result = await sanityClient.fetch<LiveOffers>(getLiveOffersQuery);
  return result?.offers || [];
}

const LiveOffersPage = async () => {
  const liveOffers = await getLiveOffers();
  console.log({ liveOffers });

  return (
    <div className="space-y-6">
      {liveOffers?.map((offer, i) => (
        <div
          key={i}
          className="h-[400px] max-w-[690px] rounded-lg bg-accent p-2"
        >
          <div className="relative h-full w-full">
            <Image
              src={urlFor(offer.image).url()}
              alt="live-offer"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveOffersPage;
