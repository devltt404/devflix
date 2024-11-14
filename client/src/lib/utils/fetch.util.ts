import { FetchError } from "../errors";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchHelper<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${url}`, options);
  const data = await res.json();

  if (!res.ok) {
    console.error(data);

    throw new FetchError({
      message: data.message || "Something went wrong",
      statusCode: res.status,
    });
  }

  return data as T;
}

export async function fetchServer<T>(endpoint: string, options?: RequestInit) {
  return fetchHelper<T>(`${SERVER_BASE_URL}${endpoint}`, options);
}

export async function fetchTMDB<T>(endpoint: string, options?: RequestInit) {
  const tmdbOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  return fetchHelper<T>(`${TMDB_BASE_URL}${endpoint}`, tmdbOptions);
}
