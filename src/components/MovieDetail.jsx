import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/MovieDetail.module.css';
import Rating from './Rating';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addToWishlist, wishlist, updateRating } = useWishlist();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=706662e24ebe9cb961388e8451b855b9`)
            .then((response) => response.json())
            .then((data) => setMovie(data));

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=706662e24ebe9cb961388e8451b855b9`)
            .then((response) => response.json())
            .then((data) => setCast(data.cast.slice(0, 10)));

        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=706662e24ebe9cb961388e8451b855b9`)
            .then((response) => response.json())
            .then((data) => setSimilarMovies(data.results));
    }, [id]);

    const movieInWishlist = wishlist.find((item) => item.id === parseInt(id));
    const currentRating = movieInWishlist ? movieInWishlist.rating : 0;

    if (!movie) return <div>Chargement...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.movieDetails}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                />
                <div className={styles.movieInfo}>
                    <h1 className={styles.movieTitle}>{movie.title}</h1>
                    <p className={styles.movieOverview}>{movie.overview}</p>
                    <p>Date de sortie: {movie.release_date}</p>
                    <p>Note : {movie.vote_average}</p>
                    <Rating movieId={movie.id} currentRating={currentRating} />
                    <button onClick={() => addToWishlist(movie)} className={styles.addButton}>
                        Ajouter à la liste de souhaits
                    </button>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Casting</h2>
            <ul className={styles.castList}>
                {cast.map((actor) => (
                    <p key={actor.id} className={styles.actorCard}>
                        {actor.name}
                    </p>
                ))}
            </ul>

            <h2 className={styles.sectionTitle}>Films similaires</h2>
            <div className={styles.similarMovies}>
                {similarMovies.map((similar) => (
                    <div key={similar.id} className={styles.similarCard}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                            alt={similar.title}
                            className={styles.similarImage}
                        />
                        <h3>{similar.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetail;
