import Image from "next/image";

import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const FounderAndCEO = ({
  content,
}: {
  content: HomePageContent["founderSection"];
}) => {
  return (
    <div className="my-10 md:mt-20 flex flex-col md:flex-row gap-6">
      <div className="rounded-md max-w-[320px] relative bg-accent">
        <Image
          src={urlFor(content.image).url()}
          alt={content.image?.alt || "ceo"}
          width={1080}
          height={1350}
          className="object-cover rounded-md"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-white/80">{content.designation}</h3>
          <h1 className="text-[1.75rem] md:text-3xl font-bold tracking-wider">
            {content.name}
          </h1>
        </div>

        <p className="text-muted-foreground">{content.description}</p>
      </div>
    </div>
  );
};
