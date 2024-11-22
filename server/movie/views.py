import logging

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from .recommender import recommend_by_movie_id

logger = logging.getLogger(__name__)


class RecommendMovies(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, id=None):
        limit = request.GET.get("limit", 5)

        try:
            recommended_movie_ids = recommend_by_movie_id(int(id), limit=int(limit))
        except ValueError:
            return Response({"error": "Movie not found."}, status=404)
        except Exception as e:
            logger.error(f"An error occurred in recommend_movie_ids: {e}")
            return Response(
                {"error": "Internal Server Error."},
                status=500,
            )

        return Response(recommended_movie_ids)
