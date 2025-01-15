import { useWishlist } from '../context/WishlistContext'; 
import styles from '../styles/Wishlist.module.css';
import Rating from './Rating';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Liste de souhaits</h1>
            <ul className={styles.wishlistList}>
                {wishlist.length > 0 ? (
                    wishlist.map((movie) => (
                        <li key={movie.id} className={styles.wishlistItem}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.title}
                                className={styles.movieImage}
                            />
                            <h3 className={styles.movieTitle}>{movie.title}</h3>
                            <Rating movieId={movie.id} currentRating={movie.rating} />
                            <button
                                onClick={() => removeFromWishlist(movie.id)}
                                className={styles.removeButton}
                            >
                                Supprimer
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Aucun film dans la liste de souhaits.</p>
                )}
            </ul>
        </div>
    );
};

export default Wishlist;
