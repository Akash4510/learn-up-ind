import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Achievers = ({
  content,
}: {
  content: HomePageContent["achieversSection"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:px-2 pt-8">
        {content.achievers?.map((achiever, idx) => (
          <div key={idx} className="text-center space-y-4">
            <div className="relative aspect-square w-full rounded-md bg-accent">
              <Image
                src={urlFor(achiever.image).url()}
                alt={achiever.image.alt || "achiever"}
                className="rounded-md object-cover"
                fill
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg">{achiever.name}</h3>
              <p className="text-muted-foreground">{achiever.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
