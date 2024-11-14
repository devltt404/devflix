import { cn } from "@/lib/utils/helper.util";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <span className={cn("font-extrabold tracking-wider", className)}>
      DEV<span className="text-primary">FLIX</span>
    </span>
  );
}
