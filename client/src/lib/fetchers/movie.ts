"use server";

import prisma from "@/db";
import { DetailedMovie } from "@/lib/definitions";
import { Movie } from "@prisma/client";
import { fetchServer, fetchTMDB } from "../utils";

export async function getMovies({
  sortBy,
  limit,
  order,
}: {
  sortBy: keyof Movie;
  limit: number;
  order: "asc" | "desc";
}) {
  return prisma.movie.findMany({
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
  });
}

export async function getMovie(id: Movie["id"]) {
  return fetchTMDB<DetailedMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
}

export async function getRecommendMovies(id: number, limit: number) {
  return fetchServer<Movie[]>(`/movies/${id}/recommend?limit=${limit}`);
}
