import os
import pickle

import pandas as pd
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class Command(BaseCommand):
    help = "Build a movie recommendation model"

    def handle(self, *args, **options):
        self.stdout.write("Building movie recommendation model...")

        data_file_path = os.path.join(settings.BASE_DIR, "../data/movies.csv")
        movies = pd.read_csv(data_file_path)

        movies.loc[:, "tag"] = movies["overview"] + movies["genres"]
        movies = movies.drop(columns=["overview", "genres"])

        self.stdout.write(f"Training model with {len(movies)} movies")
        cv = CountVectorizer(max_features=len(movies), stop_words="english")
        vector = cv.fit_transform(movies["tag"].values.astype("U")).toarray()

        self.stdout.write("Calculating cosine similarity...")
        similarity = cosine_similarity(vector)

        top_10_similarity = {}
        for i in range(len(movies)):
            distances = sorted(
                list(enumerate(similarity[i])), reverse=True, key=lambda x: x[1]
            )[1:11]
            valid_distances = [
                (movies.iloc[idx]["id"], sim)
                for idx, sim in distances
                if idx < len(movies)
            ]
            top_10_similarity[movies.iloc[i]["id"]] = valid_distances

        self.stdout.write("Saving model to disk")

        out_dir = os.path.join(settings.BASE_DIR, "movie/ml-models")
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "similarity.pkl")

        with open(out_path, "wb") as file:
            pickle.dump(top_10_similarity, file)

        self.stdout.write(
            self.style.SUCCESS("Successfully trained movie recommendation model")
        )
