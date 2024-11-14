import React from "react";
import SectionHeading from "../section-heading";

interface MovieDetailSectionProps {
  title: string;
  children: React.ReactNode;
}

const MovieDetailSection = ({ title, children }: MovieDetailSectionProps) => {
  return (
    <section>
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
};

export default MovieDetailSection;
