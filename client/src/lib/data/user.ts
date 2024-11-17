import prisma from "@/db";
import { auth } from "../auth";

export async function getIsUserFavorite(movieId: number) {
  const session = await auth();

  if (!session?.user.id) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      favorites: {
        where: {
          id: movieId,
        },
      },
    },
  });

  return Boolean(user?.favorites.length);
}

export async function getUserFavorites() {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      favorites: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.favorites;
}
