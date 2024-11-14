import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTmdbPoster(path: string) {
  return "https://image.tmdb.org/t/p/original" + path;
}

export function getTmdbProfile(path?: string, gender: number = 1) {
  return path
    ? "https://image.tmdb.org/t/p/w500" + path
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
