from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from movie.views import MovieViewSet
import os

router = DefaultRouter()
router.register(r"movies", MovieViewSet, basename="movie")

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{os.getenv('URL_PREFIX', 'api/v1')}/", include(router.urls)),
]
