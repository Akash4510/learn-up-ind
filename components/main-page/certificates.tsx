import Image from "next/image";

import { TitleBlock } from "@/components/title-block";

export const Certificates = () => {
  return (
    <div className="my-10 lg:mt-20 space-y-12 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title="Our Certificates"
          subtitle="Over the years, we have received numerous certificates from trustworthy sources including Government as a consequence of our dedication to excellence"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-accent/10 rounded-md flex items-center justify-center"
          >
            <Image
              src={`/images/certificates-${index + 1}.png`}
              alt="Certificate"
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
