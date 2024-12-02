import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IMovieCard } from "@/lib/definitions";
import MovieCard from "./movie-card";

interface MoviesCarouselProps {
  movies: IMovieCard[];
}

export function MoviesCarousel({ movies }: MoviesCarouselProps) {
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
              <MovieCard className="w-[20rem] sm:w-[22rem]" movie={movie} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
