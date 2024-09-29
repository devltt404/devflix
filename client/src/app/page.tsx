import HeroCarousel from "@/components/hero-carousel";
import MoviesSectionContainer from "@/components/movies/movies-section-container";
import { SORT_BY_OPTIONS } from "@/lib/constants";
import { MoviesSection } from "@/lib/definitions.ts";
import { getMovies } from "@/lib/utils/api.util";
import { isNonEmptyArray } from "@/lib/utils/helper.util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `${process.env.NEXT_PUBLIC_APP_NAME} is a movie database website built with Next.js and Django where you can find information about movies, TV shows, and celebrities.`,
};

export default async function Home() {
  let topRated, latest, popular;
  [topRated, latest, popular] = await Promise.all([
    getMovies({
      sortBy: SORT_BY_OPTIONS.VOTE_AVERAGE,
      limit: 10,
      order: "desc",
    }),
    getMovies({
      sortBy: SORT_BY_OPTIONS.RELEASE_DATE,
      limit: 10,
      order: "desc",
    }),
    getMovies({
      sortBy: SORT_BY_OPTIONS.POPULARITY,
      limit: 5,
      order: "desc",
    }),
  ]);

  const moviesSections: MoviesSection[] = [
    { title: "Top Rated", movies: topRated?.data },
    { title: "Latest Releases", movies: latest?.data },
  ];

  return (
    <div className="-mb-16 animate-page-enter">
      <HeroCarousel movies={popular?.data} />

      <div className="-translate-y-36">
        {moviesSections.map(
          (section) =>
            isNonEmptyArray(section.movies) && (
              <MoviesSectionContainer
                key={section.title}
                title={section.title}
                movies={section.movies}
              />
            )
        )}
      </div>
    </div>
  );
}
