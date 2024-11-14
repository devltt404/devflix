"use client";

import { addFavoriteMovie, removeFavoriteMovie } from "@/lib/actions/user";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface AddFavoriteBtnProps {
  movieId: number;
  isFavorite: boolean;
}

const AddFavoriteBtn = ({ movieId, isFavorite }: AddFavoriteBtnProps) => {
  const [displayFavorite, setDisplayFavorite] = useState<boolean>(isFavorite);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const pathname = usePathname();

  const handleAddFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);

    const res = await (displayFavorite
      ? removeFavoriteMovie(movieId, pathname)
      : addFavoriteMovie(movieId, pathname));

    setIsFetching(false);

    if (res.success) setDisplayFavorite(!displayFavorite);
  };

  return (
    <Button
      disabled={isFetching}
      size="icon"
      variant="ghost"
      onClick={handleAddFavorite}
    >
      <Bookmark className={cn("text-white", displayFavorite && "fill-white")} />
    </Button>
  );
};

export default AddFavoriteBtn;
