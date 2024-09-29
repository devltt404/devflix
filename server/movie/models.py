from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    vote_average = models.FloatField()
    vote_count = models.IntegerField()
    release_date = models.DateTimeField()
    runtime = models.IntegerField()  # in minutes
    backdrop_path = models.CharField(max_length=255)
    overview = models.TextField()
    popularity = models.IntegerField()
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    genres = ArrayField(models.CharField(max_length=50))

    def __str__(self):
        return self.title
