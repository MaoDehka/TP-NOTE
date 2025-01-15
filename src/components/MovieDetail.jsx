import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/MovieDetail.module.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addToWishlist } = useWishlist();

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

    if (!movie) return <div>Loading...</div>;

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
                    <p>Release Date: {movie.release_date}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <button onClick={() => addToWishlist(movie)} className={styles.addButton}>
                        Add to Wishlist
                    </button>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Cast</h2>
            <ul className={styles.castList}>
                {cast.map((actor) => (
                    <p key={actor.id} className={styles.actorCard}>
                        {actor.name}
                    </p>
                ))}
            </ul>

            <h2 className={styles.sectionTitle}>Similar Movies</h2>
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
