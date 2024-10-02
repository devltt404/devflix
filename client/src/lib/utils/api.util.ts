import { SORT_BY_OPTIONS } from "@/lib/constants";
import {
  DetailedMovie,
  PaginationResponse,
  SimpleMovie,
} from "@/lib/definitions";
import { ApiError } from "../errors";

const BASE_URL = process.env.SERVER_BASE_URL;

async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new ApiError({
      message: data.message || "Something went wrong",
      statusCode: res.status,
    });
  }

  return data as T;
}

export async function getMovies(params: {
  sortBy: SORT_BY_OPTIONS;
  limit: number;
  order: string;
}): Promise<PaginationResponse<SimpleMovie>> {
  const queryParams = new URLSearchParams(
    params as Record<string, any>
  ).toString();

  return fetchFromApi<PaginationResponse<SimpleMovie>>(
    `/movies?${queryParams}`
  );
}

export async function getMovieById(id: string): Promise<DetailedMovie> {
  return fetchFromApi<DetailedMovie>(`/movies/${id}`);
}

export async function getRecommendMovies(
  id: string,
  limit: number
): Promise<SimpleMovie[]> {
  return fetchFromApi<SimpleMovie[]>(`/movies/${id}/recommend?limit=${limit}`);
}
