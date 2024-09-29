from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import action
from django.core.paginator import Paginator
from .models import Movie
from .recommender import recommend_by_movie_id
import requests
import os
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    @method_decorator(cache_page(60))  # Cache the response for 60 seconds
    def list(self, request):
        # Get pagination parameters
        page_number = request.GET.get("page", 1)
        page_size = int(request.GET.get("limit", 10))

        # Get sorting parameters
        sort_by = request.GET.get("sortBy", "release_date")
        order = request.GET.get("order", "asc")

        if order == "desc":
            sort_by = "-" + sort_by

        movies = self.queryset.order_by(sort_by)

        paginator = Paginator(movies, page_size)
        page_obj = paginator.get_page(page_number)

        movies_list = list(page_obj.object_list.values())

        response_data = {
            "data": movies_list,
            "page": page_obj.number,
            "page_size": len(movies_list),
            "total_pages": paginator.num_pages,
            "count": paginator.count,
        }

        return JsonResponse(response_data)

    def retrieve(self, request, pk=None):
        # Fetch the movie detail by ID from TMDB API
        api_key = os.getenv("TMDB_API_KEY")
        url = f"https://api.themoviedb.org/3/movie/{pk}?language=en-US&append_to_response=videos"
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {api_key}",
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()

            movie = response.json()
            return JsonResponse(movie)
        except requests.exceptions.HTTPError as err:
            if err.response.status_code == 404:
                return JsonResponse({"message": "Movie not found."}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({"message": "Internal Server Error."}, status=500)

    @action(detail=True, methods=["get"], url_path="recommend")
    def recommend(self, request, pk=None):
        limit = request.GET.get("limit", 5)

        try:
            recommended_movie_ids = recommend_by_movie_id(int(pk), limit=int(limit))
        except ValueError:
            return JsonResponse({"error": "Movie not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": "Internal Server Error."}, status=500)

        # Get the recommended movies from the queryset
        recommended_movies = list(
            self.queryset.filter(id__in=recommended_movie_ids).values()
        )
        return JsonResponse(recommended_movies, safe=False)
