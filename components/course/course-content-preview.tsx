import { CourseWithChapterAndProgress } from "@/types/course";
import { BookOpen } from "lucide-react";

interface CourseContentPreviewProps {
  course: CourseWithChapterAndProgress;
}

export const CourseContentPreview = ({ course }: CourseContentPreviewProps) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>

      <div className="divide-y divide-border border rounded-lg">
        {course.chapters.map((chapter, chapterIndex) => (
          <div
            key={chapter.id}
            className="p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-medium">
                {chapterIndex + 1}
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <BookOpen className="size-4 text-muted-foreground" />
                <span className="font-medium">{chapter.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
