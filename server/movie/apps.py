from django.apps import AppConfig
import os
import pickle


class MovieConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "movie"

    def ready(self):
        module_dir = os.path.dirname(__file__)
        models_path = os.path.join(module_dir, "models")

        # Load the movies and similarity matrix
        try:
            with open(os.path.join(models_path, "similarity.pkl"), "rb") as f:
                self.similarity = pickle.load(f)
        except Exception as e:
            print(f"Errors when loading models: {e}")
            self.movies = None
            self.similarity = None
