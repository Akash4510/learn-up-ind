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
import { HomePageContent } from "@/lib/sanity/types";
import { sanityClient } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { UpcomingCoursesSection } from "@/components/main-page/upcoming-courses";

async function getHomePageContent() {
  const homePageData: HomePageContent = await sanityClient.fetch(homePageQuery);
  return homePageData;
}

const HomePage = async () => {
  const homePageContent = await getHomePageContent();

  return (
    <div>
      <Hero content={homePageContent.heroSection} />
      <UpcomingCoursesSection
        content={homePageContent.upcomingCoursesSection}
      />
      <CoursesSection content={homePageContent.exploreCoursesSection} />
      <Milestone content={homePageContent.milestonesSection} />
      <FounderAndCEO content={homePageContent.founderSection} />
      <Instructors content={homePageContent.instructorsSection} />
      <WhyUPIND content={homePageContent.whyChooseUsSection} />
      <Testimonials content={homePageContent.testimonialsSection} />
      <Certificates content={homePageContent.certificatesSection} />
      <Achievers content={homePageContent.achieversSection} />
    </div>
  );
};

export default HomePage;
