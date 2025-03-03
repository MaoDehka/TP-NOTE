import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);
  const addToWishlist = (movie) => {
    const movieWithCorrectData = {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      rating: 0,
    };

    if (!wishlist.find((item) => item.id === movieWithCorrectData.id)) {
      setWishlist([...wishlist, movieWithCorrectData]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const updateRating = (movieId, rating) => {
    setWishlist(
      wishlist.map((movie) =>
        movie.id === movieId ? { ...movie, rating } : movie
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, updateRating }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
export const useWishlist = () => useContext(WishlistContext);
