"use client";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export const metadata: Metadata = {
  title: "An error occurred",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  // Refresh the page and try to rerender the server component
  function refreshAndReset() {
    // Start a transition to ensure refresh and reset happen at the same time
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  useEffect(() => {
    // Log the error in development
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h2 className="text-4xl">Something went wrong!</h2>
      <Button onClick={refreshAndReset}>Try again</Button>
    </div>
  );
}
