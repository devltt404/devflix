import MoviesGrid from "@/components/movies/movies-grid";
import { getUserFavorites } from "@/lib//fetchers/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Favorite Movies | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Your favorite movies in ${process.env.NEXT_PUBLIC_APP_NAME}.`,
};

const FavoritesPage = async () => {
  const favorites = await getUserFavorites();

  return (
    <div className="container-area animate-page-enter">
      <h1 className="heading">Favorites</h1>

      {favorites.length ? (
        <MoviesGrid movies={favorites} />
      ) : (
        <p>You don't have any favorite movies.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
