from django.urls import path
from movie.views import RecommendMovies

urlpatterns = [
    path(
        "<int:id>/recommend/",
        RecommendMovies.as_view(),
        name="recommend-movies",
    ),
]
