import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Achievers = ({
  achieversImages,
}: {
  achieversImages?: MediaDocument["achieversImages"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title="Our Achievers"
          subtitle="These are our top achievers who took these courses"
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        {achieversImages?.map((achieverImg, idx) => (
          <div
            key={idx}
            className="relative m-4 aspect-square w-[400px] rounded-md bg-accent "
          >
            <Image
              src={urlFor(achieverImg).url()}
              alt={achieverImg.alt || "instructor"}
              className="rounded-md"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};
