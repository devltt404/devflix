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
    <div className={cn(className)}>
      <h2 ref={headingRef} className="text-3xl font-semibold inline-block">
        {children}
      </h2>
      <div className={cn("h-[3px] relative mt-3", showFullLine && "bg-muted")}>
        <div
          style={{ width: headingWidth }} // Set the width of the line to the width of the heading
          className="h-[3px] bg-primary mb-6 rounded-full transition-all duration-300 ease-in-out"
        ></div>
      </div>
    </div>
  );
};

export default SectionHeading;
