import os

from django.contrib import admin
from django.urls import include, path
from movie.urls import urlpatterns as movie_urlpatterns
from movie.views import RecommendMovies  # Import the updated view

base_path = os.getenv("URL_PREFIX", "api/v1")

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{base_path}/movies/", include("movie.urls")),
]
