import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Certificates = () => {
  return (
    <div className="my-10 lg:mt-20 space-y-12 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title="Our Certificates"
          subtitle="Over the years, we have received numerous certificates from trustworthy sources including Government as a consequence of our dedication to excellence"
        />
      </div>

      <ScrollArea className="rounded-md">
        <div className="relative flex w-full h-56 items-center justify-center gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-72 h-44 bg-accent/10 rounded-md flex items-center justify-center"
            >
              <Image
                src={`/images/certificates-${index + 1}.png`}
                alt="Certificate"
                quality={100}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
