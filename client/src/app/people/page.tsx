import QueryPagination from "@/components/query-pagination";
import { getTmdbProfile } from "@/lib/utils/helper.util";
import { getPeople } from "@/lib/utils/requests.util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
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
      <h1 className="heading mb-10">People</h1>

      <div className="mb-8 grid grid-cols-2 justify-between gap-x-6 sm:gap-x-14 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] lg:gap-x-20">
        {people.map((person) => (
          <div key={person.id} className="text-center">
            <img
              loading="lazy"
              src={getTmdbProfile(person.profile_path, person.gender)}
              alt={person.name}
              className="mb-3 aspect-square w-full rounded-full object-cover ring ring-primary"
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
