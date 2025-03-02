import React from "react";

import { TitleBlock } from "@/components/title-block";
import { VideoPlayer } from "@/components/video-player";

const BeginnerTrainingPage = () => {
  return (
    <div className="space-y-6">
      <TitleBlock
        title="Beginner Training"
        subtitle="This training is well structured for beginners to learn"
        withSeparator
      />

      <div className="max-w-[690px] rounded-lg bg-accent p-2">
        <VideoPlayer videoUrl="https://youtu.be/4BzC7ky0uw8?si=jR9OH_R7DmKEd5Rd" />
      </div>
    </div>
  );
};

export default BeginnerTrainingPage;
