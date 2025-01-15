import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MovieList.module.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('popular');

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=706662e24ebe9cb961388e8451b855b9`)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
    }, [category]);

    const handleSearch = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=706662e24ebe9cb961388e8451b855b9&query=${query}`)
            .then((response) => response.json())
            .then((data) => setMovies(data.results));
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Search
                </button>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.categorySelect}
                >
                    <option value="popular">Popular</option>
                    <option value="now_playing">Now Playing</option>
                    <option value="top_rated">Top Rated</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div className={styles.moviesGrid}>
                {movies.map((movie) => (
                    <div key={movie.id} className={styles.movieCard}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.movieImage}
                        />
                        <h3 className={styles.movieTitle}>{movie.title}</h3>
                        <p className={styles.movieRating}>Rating: {movie.vote_average}</p>
                        <Link to={`/movie/${movie.id}`} className={styles.detailsButton}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
