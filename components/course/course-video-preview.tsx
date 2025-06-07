import { CourseWithChapterAndProgress } from "@/types/course";
import { VideoPlayer } from "../video-player";

interface CourseVideoPreviewProps {
  course: CourseWithChapterAndProgress;
}

export const CourseVideoPreview = ({ course }: CourseVideoPreviewProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div>
        {course.chapters
          .filter((chapter) => chapter.isFree)
          .map((chapter) => (
            <div key={chapter.id} className="space-y-2">
              {/* <h3 className="text-xl font-bold">{chapter.title}</h3> */}
              <VideoPlayer videoUrl={chapter.videoUrl || ""} />
            </div>
          ))}
      </div>
    </div>
  );
};
