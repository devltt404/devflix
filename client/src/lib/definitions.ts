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

export type SimpleMovie = {
  id: string;
  title: string;
  vote_average: number;
  release_date: Date;
  runtime: number;
  backdrop_path: string;
  genres: string[];
  overview?: string;
};

export type MoviesSection = {
  title: string;
  movies?: SimpleMovie[];
};

export type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_pages: number;
  count: number;
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
};
