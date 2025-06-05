import Image from "next/image";
import { PlayCircle } from "lucide-react";

import { TitleBlock } from "@/components/title-block";
import { AutoScroll } from "../auto-scroll";
import { MediaDocument } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const UpcomingCoursesSection = async ({
  upcomingCoursesImages,
}: {
  upcomingCoursesImages?: MediaDocument["upcomingCoursesImages"];
}) => {
  return (
    <div>
      <div className="space-y-10 my-10">
        <div className="lg:text-center">
          <TitleBlock
            title="Upcoming Courses"
            subtitle="Accelerate your digital journey with our featured online course,
          designed to empower you with the latest tools and strategies for
          sustainable growth"
          />
        </div>

        <AutoScroll pauseDuration={3000} scrollDuration={500}>
          {upcomingCoursesImages?.map((courseImage, idx) => (
            <div
              key={idx}
              className="w-full max-w-full min-w-[300px] inline-block snap-start mr-4 last:mr-0 md:max-w-[400px]"
            >
              <div className="relative aspect-video rounded-md overflow-hidden bg-background">
                {courseImage.asset.url ? (
                  <Image
                    src={urlFor(courseImage).url()}
                    alt={courseImage.alt || "course"}
                    fill
                    className="object-cover group-hover:scale-105 transition-all"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-muted h-full">
                    <PlayCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </AutoScroll>
      </div>
    </div>
  );
};
