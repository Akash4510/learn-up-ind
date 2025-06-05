import Image from "next/image";

import { sanityClient } from "@/lib/sanity/client";
import { aboutPageQuery } from "@/lib/sanity/queries";
import { AboutPageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

async function getAboutPageContent() {
  const aboutPageContent: AboutPageContent = await sanityClient.fetch(
    aboutPageQuery
  );
  return aboutPageContent;
}

const AboutPage = async () => {
  const content = await getAboutPageContent();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
      <div className="relative overflow-hidden">
        <Image
          src={urlFor(content.image).url()}
          alt={content.image.alt || "About us"}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <div className="p-4 py-6 mb-10 space-y-4">
          <h1 className="text-3xl md:text-4xl">{content.title}</h1>

          <div className="space-y-1.5">{content.aboutText}</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
