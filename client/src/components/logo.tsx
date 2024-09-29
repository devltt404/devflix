import { cn } from "@/lib/utils/helper.util";

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold tracking-wider", className)}>
      DEV<span className="text-primary">FLIX</span>
    </span>
  );
}
