import { useWishlist } from '../context/WishlistContext'; 
import styles from '../styles/Wishlist.module.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Wishlist</h1>
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
                            <button
                                onClick={() => removeFromWishlist(movie.id)}
                                className={styles.removeButton}
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No movies in wishlist.</p>
                )}
            </ul>
        </div>
    );
};

export default Wishlist;
