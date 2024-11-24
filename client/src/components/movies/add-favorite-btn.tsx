"use client";

import { addFavoriteMovie, removeFavoriteMovie } from "@/lib/actions/user";
import { getIsUserFavorite } from "@/lib/fetchers/user";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

interface AddFavoriteBtnProps {
  movieId: number;
}

const AddFavoriteBtn = ({ movieId }: AddFavoriteBtnProps) => {
  const [isFavorite, setIsFavorite] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleAddFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await (isFavorite
      ? removeFavoriteMovie(movieId)
      : addFavoriteMovie(movieId));

    setLoading(false);

    if (res.status === 401) {
      signIn();
    }

    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getIsUserFavorite(movieId).then((res) => {
      setIsFavorite(res);
    });
  });

  return (
    <Button
      variant="none"
      onClick={handleAddFavorite}
      className={cn(
        "order-2 h-auto gap-2 py-4 lg:order-4",
        loading
          ? "cursor-not-allowed"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {loading ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <>
          <Bookmark
            className={cn(
              "h-7 w-7 text-foreground",
              isFavorite && "fill-foreground",
            )}
          />
          <span className="text-lg">
            {isFavorite ? "Remove from " : "Add to"} favorite
          </span>
        </>
      )}
    </Button>
  );
};

export default AddFavoriteBtn;
