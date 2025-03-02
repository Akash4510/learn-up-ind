"use client";

import Link from "next/link";
import { PlayCircle, BookOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { CourseWithChapterAndProgress } from "@/types/course";

interface CourseSidebarProps {
  course: CourseWithChapterAndProgress;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/courses/${course.id}`}>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h1 className="text-xl truncate font-medium">
                    {course.title}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {course.category?.name}
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Chapters Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Chapters</SidebarGroupLabel>
          <SidebarMenu>
            {course.chapters.map((chapter) => (
              <SidebarMenuItem key={chapter.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/courses/${course.id}/chapters/${chapter.id}`}>
                    <PlayCircle className="h-4 w-4" />
                    <span>{chapter.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Progress Group */}
        {course.progress !== undefined && (
          <SidebarGroup>
            <SidebarGroupLabel>Progress</SidebarGroupLabel>
            <div className="px-4 py-2">
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {course.progress}% completed
              </p>
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={`/courses/${course.id}/resources`}>
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
