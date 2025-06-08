import { TitleBlock } from "@/components/title-block";
import { VideoPlayer } from "@/components/video-player";
import { TrainingContent } from "@/lib/sanity/types";
import { sanityClient } from "@/lib/sanity/client";
import { getTrainingQuery } from "@/lib/sanity/queries";

async function getAdvancedTrainingContent() {
  const advancedTrainingContent: TrainingContent["advancedTraining"] =
    await sanityClient.fetch(getTrainingQuery("advanced"));
  return advancedTrainingContent;
}

const AdvancedTrainingPage = async () => {
  const content = await getAdvancedTrainingContent();

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Advanced Training"
        subtitle={content.description}
        withSeparator
      />

      <div className="max-w-[690px] rounded-lg bg-accent p-2">
        <VideoPlayer videoUrl={content.videoUrl} />
      </div>
    </div>
  );
};

export default AdvancedTrainingPage;
