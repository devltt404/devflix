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
    movie_app = apps.get_app_config("movie")
    similarity = movie_app.similarity

    if similarity is None:
        logger.error("Similarity matrix not found.")
        raise Exception("Similarity matrix not found.")

    if movie_id not in similarity:
        raise ValueError("Movie not found.")

    logger.info(f"Finding recommendations for movie ID: {similarity[movie_id]}")

    recommendations = similarity[movie_id][:limit]
    movie_ids = [rec[0] for rec in recommendations]  # Extract only the IDs

    return movie_ids
