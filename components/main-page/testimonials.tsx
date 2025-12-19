import { TitleBlock } from "@/components/title-block";
import { HomePageContent } from "@/lib/sanity/types";
import { VideoPlayer } from "../video-player";
import { AutoScroll } from "../auto-scroll";

export const Testimonials = ({
  content,
}: {
  content: HomePageContent["testimonialsSection"];
}) => {
  return (
    <div className="my-10 lg:mt-20 py-4 space-y-8">
      <div className="lg:text-center">
        <TitleBlock
          title={content.sectionTitle}
          subtitle={content.sectionDescription}
        />
      </div>

      {content.testimonials.length ? (
        <AutoScroll pauseDuration={4000} scrollDuration={600} infinite={true}>
          {content.testimonials?.map((testimonial, idx) => {
            return (
              <div
                key={idx}
                className="relative shrink-0 inline-block snap-start mr-4 rounded-xl overflow-hidden bg-black shadow-lg border w-[280px] md:w-[320px]"
              >
                <VideoPlayer
                  videoUrl={testimonial.videoUrl}
                  showControls={false}
                />
              </div>
            );
          })}
        </AutoScroll>
      ) : (
        <></>
      )}
    </div>
  );
};
