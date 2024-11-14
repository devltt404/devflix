import logging
import os

import requests
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import Movie
from .recommender import recommend_by_movie_id
from .serializers import MovieSerializer

logger = logging.getLogger(__name__)


class MovieViewSet(viewsets.ViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    @action(detail=True, methods=["get"], url_path="recommend")
    def recommend(self, request, pk=None):
        limit = request.GET.get("limit", 5)

        try:
            recommended_movie_ids = recommend_by_movie_id(int(pk), limit=int(limit))
        except ValueError:
            return JsonResponse({"error": "Movie not found."}, status=404)
        except Exception as e:
            logger.error(f"An error occurred in recommend_movie_ids: {e}")
            return JsonResponse({"error": "Internal Server Error."}, status=500)

        # Populate the recommended movies from the queryset
        recommended_movies = list(
            self.queryset.filter(id__in=recommended_movie_ids).values()
        )

        return JsonResponse(recommended_movies, safe=False)
