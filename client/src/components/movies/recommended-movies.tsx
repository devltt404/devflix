import { getRecommendMovies } from "@/lib/fetchers/movie";
import MovieDetailSection from "./movie-detail-section";
import { MoviesCarousel } from "./movies-carousel";

interface RecommendedMoviesProps {
  id: number;
}

const RecommendedMovies = async ({ id }: RecommendedMoviesProps) => {
  const recommendedMovies = await getRecommendMovies(id, 10);

  return (
    <MovieDetailSection title="Related Movies">
      <MoviesCarousel movies={recommendedMovies} />
    </MovieDetailSection>
  );
};

export default RecommendedMovies;
