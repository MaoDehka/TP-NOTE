import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/Rating.module.css';

const Rating = ({ movieId, currentRating }) => {
  const [rating, setRating] = useState(currentRating || 0);
  const { updateRating } = useWishlist();

  const handleClick = (value) => {
    setRating(value);
    updateRating(movieId, value);
  };

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
