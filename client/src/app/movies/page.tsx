import MoviesGrid from "@/components/movies/movies-grid";
import QueryPagination from "@/components/query-pagination";
import { getMovies } from "@/lib/fetchers/movie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Movies | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Discover movies in ${process.env.NEXT_PUBLIC_APP_NAME}.`,
  keywords: ["movies", "films", "cinema", "blockbusters"],
};

interface MoviesPageProps {
  searchParams: Promise<{
    page: string;
  }>;
}

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const { page: pageStr } = await searchParams;
  const {
    results: movies,
    page,
    total_pages,
  } = await getMovies({
    sortBy: "release_date",
    limit: 12,
    order: "desc",
    page: parseInt(pageStr || "1"),
  });

  return (
    <div className="container-area h-screen animate-page-enter">
      <h1 className="heading">New Movies</h1>
      <MoviesGrid movies={movies} />
      <div className="my-10" />
      <QueryPagination totalPages={total_pages} page={page} />
    </div>
  );
};

export default MoviesPage;
