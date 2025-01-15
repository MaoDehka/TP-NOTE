import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav>
      <Link to="/" className={styles.navbarLink}>Home</Link>
      <Link to="/wishlist" className={styles.navbarLink}>Wishlist ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
