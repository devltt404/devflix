import { cn } from "@/lib/utils/helper.util";
import { StarIcon } from "lucide-react";

interface MovieScoreProps {
  score: number;
}

export default function MovieScore({ score }: MovieScoreProps) {
  return (
    <div className="flex items-center gap-1">
      <StarIcon className="h-4 w-4 text-yellow-400" fill="rgb(250,204,21)" />
      <span
        className={cn(
          "font-semibold",
          score > 8
            ? "text-green-500"
            : score > 5
              ? "text-orange-400"
              : "text-red-600",
        )}
      >
        {score.toFixed(1)}
      </span>
      <span className="opacity-65">/ 10</span>
    </div>
  );
}
