import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Movies | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Discover movies in ${process.env.NEXT_PUBLIC_APP_NAME}.`,
  keywords: ["movies", "films", "cinema", "blockbusters"],
};

const MoviesPage = () => {
  return (
    <div className="container-area h-screen animate-page-enter">
      <h1 className="heading">Movies</h1>
      <p className="text-lg">
        This page is under construction. Please check back later.
      </p>
    </div>
  );
};

export default MoviesPage;
