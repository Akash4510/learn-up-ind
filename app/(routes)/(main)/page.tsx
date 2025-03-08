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

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CoursesSection />
      <Milestone />
      <FounderAndCEO />
      <Instructors />
      <WhyUPIND />
      <Testimonials />
      <Certificates />
      <Achievers />
    </div>
  );
};

export default HomePage;
