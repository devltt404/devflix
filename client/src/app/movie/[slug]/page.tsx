import LazyYouTubeIframe from "@/components/LazyYoutubeIframe";
import { MoviesCarousel } from "@/components/movies/movies-carousel";
import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/lib/errors";
import { getMovieById, getRecommendMovies } from "@/lib/utils/api.util";
import {
  getTmdbImg,
  isNonEmptyArray,
  unSlugify,
} from "@/lib/utils/helper.util";
import { Clock } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const id = slug.split("-").pop();
  if (!id) {
    return notFound();
  }

  let movie, recommendedMovies;

  try {
    [movie, recommendedMovies] = await Promise.all([
      getMovieById(id),
      getRecommendMovies(id, 10),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return notFound();
    }

    throw error;
  }

  if (!movie) {
    return notFound();
  }

  return (
    <div className="animate-page-enter">
      <div
        style={{
          backgroundImage: `url(${getTmdbImg(movie.backdrop_path)})`,
        }}
        className="relative h-[30rem] bg-[center_top] bg-fixed bg-no-repeat bg-cover"
      >
        <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-background to-background/10"></div>
      </div>

      <div className="relative container -translate-y-96 lg:-translate-y-60 -mb-72 lg:-mb-20">
        <div className="grid lg:grid-cols-[20rem_1fr] items-end gap-y-14 gap-x-20 mb-14">
          <div className="w-[80%] sm:w-[55%] lg:w-full mx-auto aspect-[3/4.5] shrink-0">
            <img
              className="w-full h-full object-cover"
              src={getTmdbImg(movie.poster_path)}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="text-2xl font-semibold">
                {movie.release_date.split("-")[0]}
              </p>
              <div className="w-1 h-1 mx-3 rounded-full bg-gray-500"></div>
              <Clock className="w-4 h-4 stroke-[3px] mr-2" />
              <p>
                {movie.runtime >= 60
                  ? `${Math.floor(movie.runtime / 60)}h `
                  : ""}
                {movie.runtime % 60}m
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold my-2">{movie.title}</h1>

            <p className="text-lg leading-8 my-3">{movie.overview}</p>

            <div className="flex flex-wrap items-center gap-2 mt-4 mb-7">
              <p className="text-xl font-semibold mr-2">Genres</p>
              {movie.genres.map((genre) => (
                <Badge className="py-1" variant="outline" key={genre.name}>
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <div>
                <span className="font-semibold text-3xl mr-2">
                  {movie.vote_average.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground">TMDB</span>
              </div>
              <Separator orientation="vertical" className="h-12 w-[2px]" />
              <div>
                <span className="font-semibold text-3xl mr-2">
                  {movie.vote_count}
                </span>
                <span className="text-xl text-muted-foreground">Ratings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {isNonEmptyArray(movie.videos.results) && (
            <section>
              <SectionHeading>Videos</SectionHeading>
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
            </section>
          )}

          {isNonEmptyArray(recommendedMovies) && (
            <section>
              <SectionHeading>Related Movies</SectionHeading>
              <MoviesCarousel movies={recommendedMovies} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
