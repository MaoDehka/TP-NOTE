import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar';
import { WishlistProvider } from './context/WishlistContext';
import './App.css'

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
};

export default App;
