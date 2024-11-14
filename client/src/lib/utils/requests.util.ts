import { SORT_BY_OPTIONS } from "@/lib/constants";
import {
  DetailedMovie,
  PaginationRequestParams,
  PaginationResponse,
  SimpleMovie,
  SimplePerson,
  TMDBPaginationResponse,
} from "@/lib/definitions";
import { fetchServer, fetchTMDB } from "./fetch.util";

export async function getMovies(params: {
  sortBy: SORT_BY_OPTIONS;
  limit: number;
  order: string;
}) {
  const queryParams = new URLSearchParams(
    params as Record<string, any>,
  ).toString();

  return fetchServer<PaginationResponse<SimpleMovie>>(`/movies?${queryParams}`);
}

export async function getMovie(id: string) {
  return fetchTMDB<DetailedMovie>(
    `/movie/${id}?append_to_response=videos,credits`,
  );
}

export async function getRecommendMovies(id: string, limit: number) {
  return fetchServer<SimpleMovie[]>(`/movies/${id}/recommend?limit=${limit}`);
}

export async function getPeople(
  paginationOptions: PaginationRequestParams = {},
) {
  const endpoint =
    "/person/popular?" +
    new URLSearchParams(paginationOptions as Record<string, any>);
  const response =
    await fetchTMDB<TMDBPaginationResponse<SimplePerson[]>>(endpoint);

  //Access TMDB last pages may cause error, so we limit it to 500
  response.total_pages = Math.min(500, response.total_pages);

  return response;
}
