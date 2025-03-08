import React from "react";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col gap-2 h-full items-center justify-center py-28">
      <Loader2 className="size-6 animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
};

export default LoadingPage;
