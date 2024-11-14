import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SimpleMovie } from "@/lib/definitions.ts";
import { getTmdbPoster, slugify } from "@/lib/utils/helper.util";
import { Info, Play } from "lucide-react";
import Link from "next/link";

interface HeroCarouselProps {
  movies?: SimpleMovie[];
}

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {movies &&
          movies.map((movie) => {
            return (
              <CarouselItem key={movie.id}>
                <div className="relative h-[80vh] lg:h-[min(calc(9/16*100vw),100vh)]">
                  <div
                    className="absolute inset-x-0 h-full bg-opacity-85 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${getTmdbPoster(
                        movie.backdrop_path,
                      )})`,
                    }}
                  ></div>
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-background to-transparent"></div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-transparent dark:from-[rgba(0,0,0,0.3)]"></div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background to-transparent"></div>

                  <div className="absolute bottom-40 z-[1] mx-8 sm:mx-20 md:bottom-52 lg:ml-32">
                    <Badge
                      variant="outline"
                      className="mb-4 border-black text-xs dark:border-white md:text-sm"
                    >
                      Popular
                    </Badge>
                    <h2 className="mb-5 max-w-[35rem] text-4xl font-semibold md:text-6xl">
                      {movie.title}
                    </h2>

                    <p className="mb-8 line-clamp-1 max-w-[35rem] leading-7 text-gray-800 dark:text-gray-300 lg:line-clamp-2 xl:line-clamp-3">
                      {movie.overview}
                    </p>

                    <div className="flex items-center gap-4">
                      <Button
                        asChild
                        className="group h-11 gap-2 rounded-md px-4 md:px-8"
                      >
                        <Link
                          href={`/movie/${slugify(movie.title)}-${movie.id}`}
                        >
                          <Play className="h-[1.2rem] w-[1.2rem] transition group-hover:fill-white group-hover:text-white" />
                          Watch Trailer
                        </Link>
                      </Button>

                      <Button
                        asChild
                        className="h-11 gap-2 rounded-md px-4 md:px-8"
                        variant="outline"
                      >
                        <Link
                          href={`/movie/${slugify(movie.title)}-${movie.id}`}
                        >
                          <Info className="h-[1.2rem] w-[1.2rem] transition" />
                          More Info
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicator className="bottom-20 right-8 lg:bottom-40 lg:right-24" />
    </Carousel>
  );
}
