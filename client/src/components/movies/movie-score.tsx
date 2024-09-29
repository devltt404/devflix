import { cn } from "@/lib/utils/helper.util";
import { StarIcon } from "lucide-react";

export default function MovieScore({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      <StarIcon className="text-yellow-400 w-4 h-4" fill="rgb(250,204,21)" />
      <span
        className={cn(
          "font-semibold",
          score > 8
            ? "text-green-500"
            : score > 5
            ? "text-orange-400"
            : "text-red-600"
        )}
      >
        {score.toFixed(1)}
      </span>
      <span className="opacity-65">/ 10</span>
    </div>
  );
}
