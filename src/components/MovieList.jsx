import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MovieList.module.css';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('popular');
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [genres, setGenres] = useState([]);

    const debouncedQuery = useDebounce(query, 500);
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=706662e24ebe9cb961388e8451b855b9')
            .then((response) => response.json())
            .then((data) => setGenres(data.genres));
    }, []);
    useEffect(() => {
        fetchMovies();
    }, [category, page, genre]);
    useEffect(() => {
        if (debouncedQuery) {
            handleSearch();
        }
    }, [debouncedQuery, page]);

    const fetchMovies = () => {
        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=706662e24ebe9cb961388e8451b855b9&page=${page}`;

        if (genre) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=706662e24ebe9cb961388e8451b855b9&page=${page}&with_genres=${genre}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            });
    };
    const handleSearch = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=706662e24ebe9cb961388e8451b855b9&query=${debouncedQuery}&page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            });
    };
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un film..."
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Rechercher
                </button>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.categorySelect}
                >
                    <option value="popular">Populaire</option>
                    <option value="now_playing">Actuellement</option>
                    <option value="top_rated">Mieux notés</option>
                    <option value="upcoming">Prochainement</option>
                </select>
                <select
                    onChange={(e) => setGenre(e.target.value)}
                    className={styles.categorySelect}
                >
                    <option value="">Sélectionner un genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
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
                        <p className={styles.movieRating}>Note : {movie.vote_average}</p>
                        <Link to={`/movie/${movie.id}`} className={styles.detailsButton}>
                            Voir plus
                        </Link>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={page === 1} className={styles.paginationButton}>
                    Précédent
                </button>
                <span>{`Page ${page} sur ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={page === totalPages} className={styles.paginationButton}>
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default MovieList;
