import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { TitleBlock } from "@/components/title-block";
import { Button } from "@/components/ui/button";

const CoursesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleBlock
          title="Courses"
          subtitle="Add, edit, and delete courses here"
        />

        <div>
          <Button asChild>
            <Link href="/studio/courses/new">
              <Plus className="size-4" />
              Create New Course
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
