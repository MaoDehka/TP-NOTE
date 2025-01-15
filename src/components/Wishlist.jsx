import { useWishlist } from '../context/WishlistContext';
import '../styles/Wishlist.module.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Wishlist</h1>
            <ul className={styles.wishlistList}>
                {wishlist.map((movie) => (
                    <li key={movie.id} className={styles.wishlistItem}>
                        <h3 className={styles.movieTitle}>{movie.title}</h3>
                        <button
                            onClick={() => removeFromWishlist(movie.id)}
                            className={styles.removeButton}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;