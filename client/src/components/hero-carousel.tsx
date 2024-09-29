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
import { getTmdbImg } from "@/lib/utils/helper.util";
import { Info, Play } from "lucide-react";
import { Separator } from "./ui/separator";

export default function HeroCarousel({ movies }: { movies?: SimpleMovie[] }) {
  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {movies &&
          movies.map((movie) => {
            return (
              <CarouselItem key={movie.id}>
                <div className="relative h-screen">
                  <div
                    className="absolute inset-x-0 h-full bg-center bg-no-repeat bg-opacity-85 bg-cover"
                    style={{
                      backgroundImage: `url(${getTmdbImg(
                        movie.backdrop_path
                      )})`,
                    }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
                  <div className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-52 ml-32 z-[1]">
                    <Badge variant="outline" className="mb-4 text-sm">
                      Popular
                    </Badge>
                    <h2 className="text-6xl font-semibold max-w-[35rem]">
                      {movie.title}
                    </h2>

                    <div className="my-4 text-gray-300 flex gap-2 items-center text-sm">
                      {movie.genres.join(", ")}
                      <Separator
                        orientation="vertical"
                        className="bg-gray-400 h-4"
                      />
                      {new Date(movie.release_date).getFullYear()}
                    </div>

                    <p className="max-w-[35rem] line-clamp-3 mb-8 leading-7 text-gray-300">
                      {movie.overview}
                    </p>

                    <div className="flex items-center gap-4">
                      <Button className="group gap-2" size="lg">
                        <Play className="w-[1.2rem] h-[1.2rem] group-hover:fill-white group-hover:text-white transition" />
                        Watch Trailer
                      </Button>

                      <Button className="gap-2" size="lg" variant="outline">
                        <Info className="w-[1.2rem] h-[1.2rem] transition" />
                        More Info
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
      <CarouselIndicator />
    </Carousel>
  );
}
