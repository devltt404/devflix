import LazyYouTubeIframe from "@/components/lazy-youtube-iframe";
import AddFavoriteBtn from "@/components/movies/add-favorite-btn";
import MovieDetailSection from "@/components/movies/movie-detail-section";
import RecommendedMovies from "@/components/movies/recommended-movies";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { getMovie } from "@/lib//fetchers/movie";
import { FetchError } from "@/lib/errors";
import {
  getTmdbPoster,
  getTmdbProfile,
  getTmdbThumb,
  isNonEmptyArray,
  unSlugify,
} from "@/lib/utils";
import { Clock } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface MoviePageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({
  params: { slug },
}: MoviePageProps): Metadata {
  return {
    title: `${unSlugify(slug)} | Movie`,
    description: `Discover about ${unSlugify(slug)} movie with ${
      process.env.NEXT_PUBLIC_APP_NAME
    }.`,
  };
}

const MoviePage = async ({ params: { slug } }: MoviePageProps) => {
  const id = parseInt(slug.split("-").pop() || "0");
  if (!id) return notFound();

  let movie;

  try {
    movie = await getMovie(id);
  } catch (error) {
    if (error instanceof FetchError && error.statusCode === 404) {
      return notFound();
    }

    throw error;
  }

  if (!movie) return notFound();

  return (
    <div className="animate-page-enter">
      <div
        style={{
          backgroundImage: `url(${getTmdbPoster(movie.backdrop_path)})`,
        }}
        className="relative h-[30rem] bg-cover bg-fixed bg-[center_top] bg-no-repeat"
      >
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background to-background/10"></div>
      </div>

      <div className="container relative -mb-72 -translate-y-96 lg:-mb-20 lg:-translate-y-60">
        <div className="order-1 mb-14 grid items-end gap-x-20 gap-y-8 lg:grid-cols-[20rem_1fr] lg:gap-y-6">
          <div className="mx-auto aspect-[3/4.5] w-[80%] shrink-0 sm:w-[55%] lg:w-full">
            <img
              className="h-full w-full object-cover"
              src={getTmdbThumb(movie.poster_path)}
            />
          </div>

          <div className="order-3 flex flex-col">
            <div className="flex items-center">
              <p className="text-2xl font-semibold">
                {movie.release_date.split("-")[0]}
              </p>
              <div className="mx-3 h-1 w-1 rounded-full bg-gray-500"></div>
              <Clock className="mr-2 h-4 w-4 stroke-[3px]" />
              <p>
                {movie.runtime >= 60
                  ? `${Math.floor(movie.runtime / 60)}h `
                  : ""}
                {movie.runtime % 60}m
              </p>
            </div>

            <h1 className="my-2 text-4xl font-bold md:text-5xl">
              {movie.title}
            </h1>

            <p className="my-3 text-lg leading-8">{movie.overview}</p>

            <div className="mb-7 mt-4 flex flex-wrap items-center gap-2">
              <p className="mr-2 text-xl font-semibold">Genres</p>
              {movie.genres.map((genre) => (
                <Badge className="py-1" variant="outline" key={genre.name}>
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <div>
                <span className="mr-2 text-3xl font-semibold">
                  {movie.vote_average.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground">TMDB</span>
              </div>
              <Separator orientation="vertical" className="h-12 w-[2px]" />
              <div>
                <span className="mr-2 text-3xl font-semibold">
                  {movie.vote_count}
                </span>
                <span className="text-xl text-muted-foreground">Ratings</span>
              </div>
            </div>
          </div>

          <AddFavoriteBtn movieId={id} />
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {isNonEmptyArray(movie.credits.cast) && (
            <MovieDetailSection title="Cast & Crew">
              <Carousel className="-mt-3 w-full">
                <CarouselContent className="-ml-12 py-2">
                  {movie.credits.cast.slice(0, 10).map((person) => (
                    <CarouselItem
                      key={person.id}
                      className="flex basis-auto select-none items-center gap-4 pl-14"
                    >
                      <img
                        className="aspect-square w-24 rounded-full object-cover outline"
                        src={getTmdbProfile(person.profile_path, person.gender)}
                      />
                      <div>
                        <p className="mb-2 text-lg font-semibold">
                          {person.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {person.character}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </MovieDetailSection>
          )}

          {isNonEmptyArray(movie.videos.results) && (
            <MovieDetailSection title="Videos">
              <Carousel className="w-full">
                <CarouselContent className="">
                  {movie.videos.results
                    .filter((video) => {
                      return video.site === "YouTube";
                    })
                    .map((video) => (
                      <CarouselItem
                        key={video.key}
                        className="basis-auto pl-4"
                        style={{
                          width: "clamp(340px, 80%, 600px)",
                        }}
                      >
                        <LazyYouTubeIframe videoId={video.key} />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </MovieDetailSection>
          )}

          <Suspense>
            <RecommendedMovies id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
