import React from "react";

import { TitleBlock } from "@/components/title-block";
import { VideoPlayer } from "@/components/video-player";
import { TrainingContent } from "@/lib/sanity/types";
import { sanityClient } from "@/lib/sanity/client";
import { getTrainingQuery } from "@/lib/sanity/queries";

async function getBeginnerTrainingContent() {
  const beginnerTrainingContent: TrainingContent["beginnerTraining"] =
    await sanityClient.fetch(getTrainingQuery("beginner"));
  return beginnerTrainingContent;
}

const BeginnerTrainingPage = async () => {
  const content = await getBeginnerTrainingContent();

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Beginner Training"
        subtitle={content.description}
        withSeparator
      />

      <div className="max-w-[690px] rounded-lg bg-accent p-2">
        <VideoPlayer videoUrl="https://youtu.be/X61V49uCNOI?si=6kVAa1MCH2vDjwuh" />
      </div>
    </div>
  );
};

export default BeginnerTrainingPage;
