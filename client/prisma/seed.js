import { PrismaClient } from "@prisma/client";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

(async function seed() {
  const movies = [];
  const dataFilePath = path.join(__dirname, "../../data/movies.csv");

  fs.createReadStream(dataFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      movies.push({
        id: parseInt(row.id, 10),
        title: row.title,
        vote_average: parseFloat(row.vote_average),
        vote_count: parseInt(row.vote_count, 10),
        release_date: new Date(row.release_date.split(" ")[0]),
        runtime: parseInt(row.runtime, 10),
        backdrop_path: row.backdrop_path,
        overview: row.overview,
        popularity: parseInt(row.popularity, 10),
        poster_path: row.poster_path || null,
        genres: row.genres.replace(/[{}]/g, "").split(","),
      });
    })
    .on("end", async () => {
      console.log("Processed CSV file. Seeding database...");

      for (const movie of movies) {
        try {
          await prisma.movie.upsert({
            where: { id: movie.id },
            update: {},
            create: movie,
          });
          console.log(`Inserted movie ID ${movie.id}`);
        } catch (error) {
          console.error(`Error inserting movie ID ${movie.id}:`, error);
        }
      }

      console.log("Database seeded successfully");
    });
})();
