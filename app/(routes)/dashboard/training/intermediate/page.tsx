import React from "react";

import { TitleBlock } from "@/components/title-block";
import { VideoPlayer } from "@/components/video-player";

const IntermediateTrainingPage = () => {
  return (
    <div className="space-y-6">
      <TitleBlock
        title="Intermediate Training"
        subtitle="This is intermediate training for the ones who completed the beginner training"
        withSeparator
      />

      <div className="max-w-[690px] rounded-lg bg-accent p-2">
        <VideoPlayer videoUrl="https://youtu.be/4BzC7ky0uw8?si=jR9OH_R7DmKEd5Rd" />
      </div>
    </div>
  );
};

export default IntermediateTrainingPage;
