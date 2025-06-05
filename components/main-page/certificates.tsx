import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Certificates = ({
  certificateImages,
}: {
  certificateImages?: MediaDocument["certificateImages"];
}) => {
  return (
    <div className="my-10 lg:mt-20 space-y-12 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title="Our Certificates"
          subtitle="Over the years, we have received numerous certificates from trustworthy sources including Government as a consequence of our dedication to excellence"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {certificateImages?.map((certImg, index) => (
          <div
            key={index}
            className="bg-accent/10 rounded-md flex items-center justify-center"
          >
            <Image
              src={urlFor(certImg).url()}
              alt={certImg.alt || "certificate"}
              quality={100}
              width={120}
              height={120}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
