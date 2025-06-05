import Image from "next/image";
import { PlayCircle } from "lucide-react";

import { TitleBlock } from "@/components/title-block";
import { AutoScroll } from "../auto-scroll";
import { HomePageContent } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";

export const UpcomingCoursesSection = async ({
  content,
}: {
  content: HomePageContent["upcomingCoursesSection"];
}) => {
  return (
    <div>
      <div className="space-y-10 my-10 md:my-20">
        <div className="lg:text-center">
          <TitleBlock
            title={content.sectionTitle}
            subtitle={content.sectionDescription}
          />
        </div>

        {content.courses?.length ? (
          <AutoScroll pauseDuration={3000} scrollDuration={500}>
            {content.courses?.map((course, idx) => (
              <div
                key={idx}
                className="w-full max-w-full min-w-[300px] inline-block snap-start mr-4 last:mr-0 md:max-w-[400px]"
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-background">
                  {course.image.asset ? (
                    <Image
                      src={urlFor(course.image).url()}
                      alt={course.image.alt || "course"}
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
        ) : (
          <p className="lg:text-center pb-10">No upcoming courses</p>
        )}
      </div>
    </div>
  );
};
