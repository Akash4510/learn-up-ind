import { TitleBlock } from "@/components/title-block";
import { MediaDocument } from "@/lib/sanity/types";

export const Testimonials = ({
  testimonialVideos,
}: {
  testimonialVideos?: MediaDocument["testimonialVideos"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4">
      <div className="lg:text-center">
        <TitleBlock title="Testimonials" subtitle="What they say about us" />
      </div>

      <div className="flex items-center justify-center gap-6">
        {testimonialVideos?.map((testimonial, idx) => (
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
