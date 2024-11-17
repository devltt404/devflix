import MovieCard from "@/components/movies/movie-card";
import { getUserFavorites } from "@/lib/data/user";

const FavoritesPage = async () => {
  const favorites = await getUserFavorites();

  return (
    <div className="container-area">
      <h1 className="heading">Favorites</h1>

      {favorites.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-between gap-8">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>You don't have any favorite movies.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
