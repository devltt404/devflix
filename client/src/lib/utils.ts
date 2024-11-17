import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FetchError } from "./errors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTmdbPoster(path: string) {
  return "https://image.tmdb.org/t/p/original" + path;
}

export function getTmdbThumb(path: string) {
  return "https://image.tmdb.org/t/p/w500" + path;
}

export function getTmdbProfile(path?: string, gender: number = 1) {
  return path
    ? "https://image.tmdb.org/t/p/w200" + path
    : gender === 2
      ? "https://avatar.iran.liara.run/public/7"
      : "https://avatar.iran.liara.run/public/53";
}

export function isNonEmptyArray<T>(arr: T[] | null | undefined): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function unSlugify(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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
  return fetchHelper<T>(`${process.env.SERVER_BASE_URL}${endpoint}`, options);
}

export async function fetchTMDB<T>(endpoint: string, options?: RequestInit) {
  const tmdbOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  return fetchHelper<T>(`https://api.themoviedb.org/3${endpoint}`, tmdbOptions);
}
