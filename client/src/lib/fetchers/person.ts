"use server";

import {
  SimplePerson,
  TMDBPaginationRequestParams,
  TMDBPaginationResponse,
} from "../definitions";
import { fetchTMDB } from "../utils";

export async function getPeople(
  paginationOptions: TMDBPaginationRequestParams = {},
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
