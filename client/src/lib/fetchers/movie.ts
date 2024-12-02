"use server";

import prisma from "@/db";
import {
  DetailedMovie,
  IMovieCard,
  PaginationResponse,
} from "@/lib/definitions";
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
}): Promise<PaginationResponse<IMovieCard[]>> {
  const [movies, total_results] = await Promise.all([
    prisma.movie.findMany({
      take: limit,
      select: {
        id: true,
        title: true,
        runtime: true,
        backdrop_path: true,
        release_date: true,
        vote_average: true,
        genres: true,
      },
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

export async function getMovie(id: Movie["id"]): Promise<DetailedMovie> {
  return fetchTMDB<DetailedMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
}

export async function getRecommendMovies(
  id: number,
  limit: number,
): Promise<IMovieCard[]> {
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
