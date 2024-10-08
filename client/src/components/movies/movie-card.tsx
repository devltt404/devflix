"use client";

import { SimpleMovie } from "@/lib/definitions";
import { getTmdbImg, slugify } from "@/lib/utils/helper.util";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import MovieScore from "./movie-score";

interface MovieCardProps {
  movie: SimpleMovie;
}
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${slugify(movie.title)}-${movie.id}`}>
      <div className="relative">
        <img
          loading="lazy"
          src={getTmdbImg(movie.backdrop_path)}
          className="rounded-md"
        />

        <div className="cursor-pointer group absolute inset-0 bottom-0 bg-gradient-to-t from-black to-[rgba(0,0,0,0.1)] flex flex-col justify-end py-2 px-4 transition opacity-0 hover:opacity-100 z-10">
          <div className="transition translate-y-6 group-hover:translate-y-0 text-white ">
            <MovieScore score={movie.vote_average} />
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge className="text-white " variant="outline" key={genre}>
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="my-2 text-sm flex items-center gap-4 ">
              {movie.runtime >= 60 ? `${Math.floor(movie.runtime / 60)}h ` : ""}
              {movie.runtime % 60}m
              <Separator orientation="vertical" className="bg-gray-700 h-4" />
              {new Date(movie.release_date).getFullYear()}
            </div>
          </div>

          <ArrowRight className="absolute right-4 bottom-6 w-6 h-6 text-white          " />
        </div>
      </div>
    </Link>
  );
}
