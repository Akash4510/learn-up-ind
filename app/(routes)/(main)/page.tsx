import React from "react";

import { Hero } from "@/components/main-page/hero";
import { CoursesSection } from "@/components/main-page/courses-section";
import { FounderAndCEO } from "@/components/main-page/founder-and-ceo";
import { Instructors } from "@/components/main-page/instructors";
import { WhyUPIND } from "@/components/main-page/why-upind";
import { Testimonials } from "@/components/main-page/testimonials";
import { Certificates } from "@/components/main-page/certificates";
import { Achievers } from "@/components/main-page/achievers";
import { Milestone } from "@/components/main-page/milestone";
import { MediaDocument } from "@/lib/sanity/types";
import { sanityClient } from "@/lib/sanity/client";
import { mediaQuery } from "@/lib/sanity/queries";
import { UpcomingCoursesSection } from "@/components/main-page/upcoming-courses";

export async function getAllMedia(): Promise<MediaDocument | null> {
  const data = await sanityClient.fetch<MediaDocument>(mediaQuery);
  return data || null;
}

const HomePage = async () => {
  const media = await getAllMedia();

  return (
    <div>
      <Hero heroImage={media?.heroImage} />
      <UpcomingCoursesSection
        upcomingCoursesImages={media?.upcomingCoursesImages}
      />
      <CoursesSection />
      <Milestone />
      <FounderAndCEO ceo={media?.ceo} />
      <Instructors instructorImages={media?.instructorImages} />
      <WhyUPIND whyUsImages={media?.whyUsImages} />
      <Testimonials testimonialVideos={media?.testimonialVideos} />
      <Certificates certificateImages={media?.certificateImages} />
      <Achievers achieversImages={media?.achieversImages} />
    </div>
  );
};

export default HomePage;
