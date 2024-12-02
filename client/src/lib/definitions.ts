import { Movie } from "@prisma/client";
import React from "react";

export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  external?: boolean;
}

export interface MainNavItem extends NavItem {
  children?: NavItem[];
}

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  mainNav: MainNavItem[];
  footerItems: MainNavItem[];
};

export type MoviesSection = {
  title: string;
  movies?: Movie[];
};

export type TMDBPaginationRequestParams = {
  page?: number;
};

export type PaginationResponse<TData> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TData;
};

export type DetailedMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
      id: string;
    }[];
  };
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path?: string;
      credit_id: string;
      character: string;
      department: string;
      job: string;
    }[];
  };
};

export type SimplePerson = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
};

export type IMovieCard = Omit<
  Movie,
  "overview" | "vote_count" | "popularity" | "poster_path"
>;
