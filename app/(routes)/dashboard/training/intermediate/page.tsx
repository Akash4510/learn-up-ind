import React from "react";

import { TitleBlock } from "@/components/title-block";
import { VideoPlayer } from "@/components/video-player";
import { TrainingContent } from "@/lib/sanity/types";
import { sanityClient } from "@/lib/sanity/client";
import { getTrainingQuery } from "@/lib/sanity/queries";

async function getIntermediateTrainingContent() {
  const intermediateTrainingContent: TrainingContent["intermediateTraining"] =
    await sanityClient.fetch(getTrainingQuery("intermediate"));
  return intermediateTrainingContent;
}

const IntermediateTrainingPage = async () => {
  const content = await getIntermediateTrainingContent();

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Intermediate Training"
        subtitle={content.description}
        withSeparator
      />

      <div className="max-w-[690px] rounded-lg bg-accent p-2">
        <VideoPlayer videoUrl={content.videoUrl} />
      </div>
    </div>
  );
};

export default IntermediateTrainingPage;
