"use client";
import { cn } from "@/lib/utils/helper.util";
import { useEffect, useRef, useState } from "react";

const SectionHeading = ({
  children,
  className,
  showFullLine = true,
}: {
  children: React.ReactNode;
  className?: string;
  showFullLine?: boolean;
}) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [headingWidth, setHeadingWidth] = useState<number>(0);

  useEffect(() => {
    if (headingRef.current) {
      setHeadingWidth(headingRef.current.offsetWidth + 5);
    }
  }, [children]);

  return (
    <div className={cn("mb-6 sm:mb-12", className)}>
      <h2 ref={headingRef} className="inline-block text-3xl font-semibold">
        {children}
      </h2>
      <div className={cn("relative mt-3 h-[3px]", showFullLine && "bg-muted")}>
        <div
          style={{ width: headingWidth }} // Set the width of the line to the width of the heading
          className="mb-6 h-[3px] rounded-full bg-primary transition-all duration-300 ease-in-out"
        ></div>
      </div>
    </div>
  );
};

export default SectionHeading;
