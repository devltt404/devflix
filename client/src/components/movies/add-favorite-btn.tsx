"use client";

import { addFavoriteMovie, removeFavoriteMovie } from "@/lib/actions/user";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

interface AddFavoriteBtnProps {
  movieId: number;
  isFavorite: boolean;
}

const AddFavoriteBtn = ({ movieId, isFavorite }: AddFavoriteBtnProps) => {
  const handleAddFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await (isFavorite
      ? removeFavoriteMovie(movieId)
      : addFavoriteMovie(movieId));

    if (res.status === 401) {
      signIn();
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleAddFavorite}
      className="order-2 h-auto gap-2 py-4 hover:bg-accent-foreground dark:hover:bg-accent lg:order-4"
    >
      <Bookmark
        className={cn("h-7 w-7 text-white", isFavorite && "fill-white")}
      />
      <span className="text-lg">
        {isFavorite ? "Remove from " : "Add to"} favorite
      </span>
    </Button>
  );
};

export default AddFavoriteBtn;
