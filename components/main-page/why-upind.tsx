import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const WhyUPIND = ({
  content,
}: {
  content: HomePageContent["whyChooseUsSection"];
}) => {
  return (
    <div className="my-10 md:mt-20 space-y-4 md:space-y-6 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-2 py-4">
        {content.reasons?.map((reason, idx) => (
          <div
            key={idx}
            className="rounded-md bg-gradient-to-tr from-card to-accent flex flex-col gap-2 items-center p-6 px-8 text-center hover:scale-[102%]"
          >
            <div className="rounded-md aspect-square">
              <Image
                src={urlFor(reason.image).url()}
                alt={reason.image.alt || "hello"}
                quality={100}
                width={80}
                height={80}
                className="rounded-md aspect-square"
              />
            </div>
            <h3 className="font-semibold text-xl text-primary">
              {reason.title}
            </h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
