import HeroCarousel from "@/components/hero-carousel";
import { MoviesCarousel } from "@/components/movies/movies-carousel";
import SectionHeading from "@/components/section-heading";
import { MoviesSection } from "@/lib/definitions.ts";
import { getMovies } from "@/lib/fetchers/movie";
import { isNonEmptyArray } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `${process.env.NEXT_PUBLIC_APP_NAME} is a movie database website built with Next.js and Django where you can find information about movies, TV shows, and celebrities.`,
  keywords: [
    "movies",
    "tv shows",
    "celebrities",
    "actors",
    "actresses",
    "movie database",
    "tv show database",
    "movie recommendations",
  ],
};

export default async function Home() {
  let topRated, latest, popular;
  [topRated, latest, popular] = await Promise.all([
    getMovies({
      sortBy: "vote_average",
      limit: 10,
      order: "desc",
    }),
    getMovies({
      sortBy: "release_time",
      limit: 10,
      order: "desc",
    }),
    getMovies({
      sortBy: "popularity",
      limit: 5,
      order: "desc",
    }),
  ]);

  const moviesSections: MoviesSection[] = [
    { title: "Top Rated", movies: topRated },
    { title: "Latest Releases", movies: latest },
  ];

  return (
    <div className="sm:-mb-18 animate-page-enter max-sm:pb-8">
      <HeroCarousel movies={popular} />

      <div className="mx-4 flex -translate-y-8 flex-col gap-12 sm:mx-12 sm:-translate-y-28 md:gap-16">
        {moviesSections.map(
          (section, i) =>
            isNonEmptyArray(section.movies) && (
              <section key={i}>
                <SectionHeading showFullLine={false}>
                  {section.title}
                </SectionHeading>
                <MoviesCarousel movies={section.movies} />
              </section>
            ),
        )}
      </div>
    </div>
  );
}
