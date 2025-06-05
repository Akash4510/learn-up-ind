import { TitleBlock } from "@/components/title-block";
import { HomePageContent } from "@/lib/sanity/types";

export const Testimonials = ({
  content,
}: {
  content: HomePageContent["testimonialsSection"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      <div className="flex items-center justify-center gap-6">
        {content.testimonials?.map((testimonial, idx) => (
          <div
            key={idx}
            className="relative m-4 aspect-square w-[400px] rounded-md bg-accent "
          >
            {testimonial.description}
          </div>
        ))}
      </div>
    </div>
  );
};
