"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ShoppingCart, PlayCircle, IndianRupee } from "lucide-react";
import { CourseWithProgress } from "@/types/course";
import { Progress } from "@/components/ui/progress";

interface CourseCardProps {
  course: CourseWithProgress;
  isCreator?: boolean;
  isPurchased?: boolean;
}

export const CourseCard = ({
  course,
  isCreator = false,
  isPurchased = false,
}: CourseCardProps) => {
  const {
    id,
    title,
    description,
    thumbnail,
    price,
    isPublished,
    chapters,
    progress,
  } = course;

  return (
    <div className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center bg-muted h-full">
            <PlayCircle className="h-10 w-10 text-muted-foreground" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40" />
        {/* Category and Chapters */}
        <div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between gap-2 mt-3 px-4 py-2">
          {course.category && (
            <Badge variant="outline" className="text-xs bg-accent">
              {course.category.name}
            </Badge>
          )}

          <span className="text-sm text-muted-foreground">
            {chapters.length} chapters
          </span>
        </div>
      </div>

      {/* Course Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-3">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        {isPurchased && progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
            <span className="text-sm text-muted-foreground mt-1">
              {40}% completed
            </span>
          </div>
        )}

        {/* Price and Status */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {!isPurchased && price !== null && (
              <span className="text-lg font-semibold flex items-center">
                <IndianRupee className="size-5" />
                {price.toFixed(2)}
              </span>
            )}
            {isCreator && !isPublished && (
              <Badge variant="secondary" className="text-xs">
                Draft
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isCreator ? (
              // Creator Actions
              <Button size="sm" variant="outline" asChild>
                <Link href={`/studio/courses/${id}`}>
                  <Edit className="size-4" />
                  Edit
                </Link>
              </Button>
            ) : isPurchased ? (
              // User Actions (Purchased)
              <Button size="sm" asChild>
                <Link href={`/courses/${id}`} target="_blank">
                  <PlayCircle className="size-4" />
                  Continue
                </Link>
              </Button>
            ) : (
              // User Actions (Not Purchased)
              <Button size="sm" asChild>
                <Link href={`/courses/${id}?action=enroll`} target="_blank">
                  <ShoppingCart className="size-4" />
                  Enroll
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
