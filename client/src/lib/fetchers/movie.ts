"use server";

import prisma from "@/db";
import { DetailedMovie, PaginationResponse } from "@/lib/definitions";
import { Movie } from "@prisma/client";
import { fetchServer, fetchTMDB } from "../utils";

export async function getMovies({
  sortBy,
  limit,
  order,
  page = 1,
}: {
  sortBy: keyof Movie;
  limit: number;
  order: "asc" | "desc";
  page?: number;
}): Promise<PaginationResponse<Movie[]>> {
  const [movies, total_results] = await Promise.all([
    prisma.movie.findMany({
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
    }),
    prisma.movie.count(),
  ]);
  const total_pages = Math.ceil(total_results / limit);

  return {
    page,
    total_pages,
    total_results,
    results: movies,
  };
}

export async function getMovie(id: Movie["id"]) {
  return fetchTMDB<DetailedMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
}

export async function getRecommendMovies(id: number, limit: number) {
  const recommendIds = await fetchServer<Movie["id"][]>(
    `/movies/${id}/recommend?limit=${limit}`,
  );

  return prisma.movie.findMany({
    where: {
      id: {
        in: recommendIds,
      },
    },
  });
}
