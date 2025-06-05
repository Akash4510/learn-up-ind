import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Certificates = ({
  content,
}: {
  content: HomePageContent["certificatesSection"];
}) => {
  return (
    <div className="my-10 lg:mt-20 space-y-12 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
        {content.certificateImages?.map((certImg, index) => (
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
