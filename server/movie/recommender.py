from django.apps import apps
import logging

logger = logging.getLogger(__name__)

def recommend_by_movie_id(movie_id: int, limit: int) -> list:
    """
    Recommend movies based on the given movie ID.

    Args:
    movie_id (int): The ID of the movie for which to find recommendations.
    limit (int): The number of recommendations to return.

    Returns:
    list: A list of recommended movie IDs, or an empty list if none are found.
    """
    # Retrieve the movies and similarity matrix loaded in the AppConfig 
    movie_app = apps.get_app_config('movie') 
    movies = movie_app.movies
    similarity = movie_app.similarity
        
    if(movies is None or similarity is None):
        raise Exception("Movies or similarity matrix not found.")
    
    # Get the index of the movie
    try:
        index = movies[movies['id'] == movie_id].index[0]
    except IndexError:
        raise ValueError("Movie not found.")
 
    
    # Sort in descending order the similarity score of the movie with all other movies
    distances = sorted(enumerate(similarity[index]), reverse=True, key=lambda vector: vector[1])
    
    # Collect recommended movie IDs, skipping the first one (same movie)
    recommended_movies = [movies.iloc[i[0]].id for i in distances[1:limit + 1]]
    
    return recommended_movies
