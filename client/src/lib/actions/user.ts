"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "../auth";

const prisma = new PrismaClient();

export async function addFavoriteMovie(movieId: number, requestUrl: string) {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/api/auth/signin?callbackUrl=" + encodeURIComponent(requestUrl));
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

    return { success: true, message: "Movie added to favorites." };
  } catch (error) {
    console.error(error);
    throw new Error("Error adding movie to favorites.");
  }
}

export async function removeFavoriteMovie(movieId: number, requestUrl: string) {
  const session = await auth();

  if (!session?.user.id) {
    return redirect("/api/auth/signin?callbackUrl=" + encodeURIComponent(requestUrl));
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

    return { success: true, message: "Movie removed from favorites." };
  } catch (error) {
    console.error(error);
    throw new Error("Error removing movie from favorites.");
  }
}
