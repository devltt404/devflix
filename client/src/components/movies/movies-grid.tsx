import { Movie } from "@prisma/client";
import MovieCard from "./movie-card";

interface MoviesGridProps {
  movies: Movie[];
}

const MoviesGrid = ({ movies }: MoviesGridProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-between gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
