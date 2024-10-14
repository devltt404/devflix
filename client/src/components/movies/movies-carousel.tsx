import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SimpleMovie } from "@/lib/definitions";
import MovieCard from "./movie-card";

export function MoviesCarousel({ movies }: { movies: SimpleMovie[] }) {
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
          <CarouselItem key={movie.id} className="basis-auto">
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
