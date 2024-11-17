"use server";

import prisma from "@/db";
import { Movie } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export async function addFavoriteMovie(movieId: Movie["id"]) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      status: 401,
    };
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new Error("Movie not found.");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        favorites: {
          connect: {
            id: movieId,
          },
        },
      },
    });

    revalidatePath("/favorites", "page");
    return { success: true, message: "Movie added to favorites." };
  } catch (error) {
    console.error(error);
    throw new Error("Error adding movie to favorites.");
  }
}

export async function removeFavoriteMovie(movieId: Movie["id"]) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      status: 401,
    };
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    throw new Error("Movie not found.");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        favorites: {
          disconnect: {
            id: movieId,
          },
        },
      },
    });

    revalidatePath("/favorites", "page");
    return { success: true, message: "Movie removed from favorites." };
  } catch (error) {
    console.error(error);
    throw new Error("Error removing movie from favorites.");
  }
}
