import { SimpleMovie } from "@/lib/definitions.ts";
import SectionHeading from "../section-heading";
import { MoviesCarousel } from "./movies-carousel";

export default function MoviesSectionContainer({
  title,
  movies,
}: {
  title: string;
  movies: SimpleMovie[];
}) {
  return (
    <section className="mx-12 [&:not(:last-child)]:mb-16">
      <SectionHeading showFullLine={false} className="mb-12">
        {title}
      </SectionHeading>

      <MoviesCarousel movies={movies} />
    </section>
  );
}
