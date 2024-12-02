"use server";

import prisma from "@/db";
import {
  DisplayMovie,
  PaginationResponse,
  TMDBDetailedMovie,
} from "@/lib/definitions";
import { Movie, Prisma } from "@prisma/client";
import { fetchServer, fetchTMDB } from "../utils";

export async function getMovies({
  sortBy,
  limit,
  order,
  page = 1,
  type = "simple",
}: {
  sortBy: keyof Movie;
  limit: number;
  order: "asc" | "desc";
  page?: number;
  type?: "simple" | "full";
}): Promise<PaginationResponse<DisplayMovie[]>> {
  const findQuery: Prisma.MovieFindManyArgs = {
    take: limit,
    orderBy: {
      [sortBy]: order,
    },
    skip: (page - 1) * limit,
    select: {
      id: true,
      title: true,
      runtime: true,
      backdrop_path: true,
      release_date: true,
      vote_average: true,
      genres: true,
    },
  };

  if (type === "full") {
    findQuery.select!.overview = true;
  }

  const [movies, total_results] = await Promise.all([
    prisma.movie.findMany(findQuery),
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

export async function getMovie(id: Movie["id"]): Promise<TMDBDetailedMovie> {
  return fetchTMDB<TMDBDetailedMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
}

export async function getRecommendMovies(
  id: number,
  limit: number,
): Promise<DisplayMovie[]> {
  const recommendIds = await fetchServer<Movie["id"][]>(
    `/movies/${id}/recommend?limit=${limit}`,
  );

  return prisma.movie.findMany({
    where: {
      id: {
        in: recommendIds,
      },
    },
    select: {
      id: true,
      title: true,
      runtime: true,
      backdrop_path: true,
      release_date: true,
      vote_average: true,
      genres: true,
    },
  });
}
