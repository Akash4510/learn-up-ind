import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";
import Image from "next/image";

export const FounderAndCEO = ({ ceo }: { ceo?: MediaDocument["ceo"] }) => {
  return (
    <div className="my-10 md:mt-20 flex flex-col md:flex-row gap-6">
      <div className="rounded-md max-w-[320px] relative bg-accent">
        <Image
          src={urlFor(ceo).url()}
          alt={ceo?.alt || "ceo"}
          width={1080}
          height={1350}
          className="object-cover rounded-md"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-primary-foreground/80">Founder & CEO</h3>
          <h1 className="text-[1.75rem] md:text-3xl font-bold tracking-wider">
            {ceo?.name}
          </h1>
        </div>

        <p className="text-muted-foreground">{ceo?.about}</p>
      </div>
    </div>
  );
};
