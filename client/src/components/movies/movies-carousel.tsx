import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SimpleMovie } from "@/lib/definitions";
import { cn } from "@/lib/utils/helper.util";
import Link from "next/link";
import MovieCard from "./movie-card";

export function MoviesCarousel({
  movies,
  size = "lg",
}: {
  movies: SimpleMovie[];
  size?: "md" | "lg";
}) {
  const sizes = {
    md: "md:basis-1/3 lg:basis-1/4",
    lg: "md:basis-1/2 lg:basis-1/5",
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="ml-0">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className={cn(sizes[size])}>
              <div className="p-1">
                <MovieCard movie={movie} />
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
