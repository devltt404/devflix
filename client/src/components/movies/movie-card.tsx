import { DisplayMovie } from "@/lib/definitions";
import { cn, getTmdbThumb, slugify } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import MovieScore from "./movie-score";

interface MovieCardProps {
  movie: DisplayMovie;
  className?: string;
}

export default async function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link href={`/movie/${slugify(movie.title)}-${movie.id}`}>
      <div className={cn("relative aspect-video", className)}>
        <img
          src={getTmdbThumb(movie.backdrop_path)}
          className="h-full w-full rounded-md object-cover"
          alt="Movie Thumbnail"
        />

        <div className="group absolute inset-0 bottom-0 z-10 flex cursor-pointer flex-col justify-end rounded-sm bg-gradient-to-t from-black to-[rgba(0,0,0,0.1)] px-4 py-2 transition lg:opacity-0 lg:hover:opacity-100">
          <div className="text-white transition lg:translate-y-6 lg:group-hover:translate-y-0">
            <MovieScore score={movie.vote_average} />
            <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
              {movie.title}
            </h3>
            <div className="hidden flex-wrap gap-2 md:flex">
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge className="text-white" variant="outline" key={genre}>
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="my-2 flex items-center gap-4 text-sm">
              {movie.runtime >= 60 ? `${Math.floor(movie.runtime / 60)}h` : ""}
              {movie.runtime % 60}m
              <Separator orientation="vertical" className="h-4 bg-gray-700" />
              {new Date(movie.release_date).getFullYear()}
            </div>
          </div>

          <ArrowRight className="absolute bottom-6 right-4 h-6 w-6 text-white" />
        </div>
      </div>

      <span className="sr-only">{movie.title}</span>
    </Link>
  );
}
