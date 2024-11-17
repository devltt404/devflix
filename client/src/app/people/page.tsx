import QueryPagination from "@/components/query-pagination";
import { getPeople } from "@/lib//fetchers/person";
import { getTmdbProfile } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `People | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "A list of popular actors.",
  keywords: ["people", "actors", "celebrities", "actresses"],
};

interface PeoplePageProps {
  searchParams: Record<string, string>;
}

const PeoplePage = async ({ searchParams }: PeoplePageProps) => {
  const { results: people, total_pages } = await getPeople({
    page: parseInt(searchParams.page || "1"),
  });

  return (
    <div className="container-area animate-page-enter">
      <h1 className="heading">People</h1>

      <div className="mb-8 grid grid-cols-2 justify-between gap-x-6 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:gap-x-14 lg:gap-x-20">
        {people.map((person) => (
          <div key={person.id} className="text-center">
            <img
              loading="lazy"
              src={getTmdbProfile(person.profile_path, person.gender)}
              alt={person.name}
              className="mb-3 aspect-square w-full rounded-full object-cover outline"
            />

            <p className="text-lg font-semibold sm:text-xl">{person.name}</p>
            <p className="text-muted-foreground">
              {person.known_for_department}
            </p>
          </div>
        ))}
      </div>

      <QueryPagination
        totalPages={total_pages}
        page={parseInt(searchParams.page || "1")}
      />
    </div>
  );
};

export default PeoplePage;
