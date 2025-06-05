import Image from "next/image";

import { TitleBlock } from "@/components/title-block";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const WhyUPIND = ({
  whyUsImages,
}: {
  whyUsImages?: MediaDocument["whyUsImages"];
}) => {
  return (
    <div className="my-10 md:mt-20 space-y-4 md:space-y-6 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title="Why Choose LearnUPIND"
          subtitle="Level up your career with Learnupind Industry-leading training programs and expert guidance for success"
        />
      </div>

      <div>
        <Accordion
          type="multiple"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
        >
          {whyUsImages?.map((whyImg, idx) => (
            <AccordionItem key={idx} value={whyImg.title || `item-${idx + 1}`}>
              <AccordionTrigger className="uppercase">
                <div className="flex items-center gap-2">
                  <div className="bg-accent/60 p-1 rounded-md aspect-square">
                    <Image
                      src={urlFor(whyImg).url()}
                      alt={whyImg.alt || "hello"}
                      quality={100}
                      width={65}
                      height={65}
                      className="rounded-md aspect-square"
                    />
                  </div>
                  {idx + 1}. {whyImg.title}
                </div>
              </AccordionTrigger>
              <AccordionContent>{whyImg.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
