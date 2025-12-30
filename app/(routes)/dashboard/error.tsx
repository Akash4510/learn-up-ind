"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  // Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-20 text-center flex items-center justify-center flex-col space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl">Something went wrong!</h2>
        <p className="text-sm">
          The page you&apos;re looking might be under maintainance or it might
          be temporarily removed.
        </p>
      </div>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        <Button
          variant="secondary"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <RotateCw className="size-4" />
          Try again
        </Button>

        <Button variant="secondary" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="size-4" />
            Go to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
