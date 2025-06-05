import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const Instructors = ({
  instructorImages,
}: {
  instructorImages?: MediaDocument["instructorImages"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4">
      <div className="lg:text-center space-y-4">
        <TitleBlock
          title="Our Instructors"
          subtitle="Accelerate your digital journey with our featured online course, designed to empower you with the latest tools and strategies for sustainable growth"
        />

        <div className="flex items-center justify-center gap-6">
          {instructorImages?.map((insImg, idx) => (
            <div
              key={idx}
              className="relative m-4 aspect-square w-[400px] rounded-md bg-accent "
            >
              <Image
                src={urlFor(insImg).url()}
                alt={insImg.alt || "instructor"}
                className="rounded-md"
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
