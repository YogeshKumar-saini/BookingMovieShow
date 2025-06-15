import React, { useState, useMemo } from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';

const MOVIES_PER_PAGE = 6;

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('latest'); // latest, oldest, rating
  const [favorites, setFavorites] = useState([]);

  // Sort logic
  const sortedMovies = useMemo(() => {
    const movies = [...dummyShowsData];
    if (sortOption === 'latest') {
      return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }
    if (sortOption === 'oldest') {
      return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }
    if (sortOption === 'rating') {
      return movies.sort((a, b) => b.vote_average - a.vote_average);
    }
    return movies;
  }, [sortOption]);

  const totalPages = Math.ceil(sortedMovies.length / MOVIES_PER_PAGE);
  const currentMovies = sortedMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  return (
    <div className="relative mt-32 mb-60 px-6 md:px-16 lg:px-36 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* Header + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-wide">Now Showing</h1>
        <select
          className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md border border-gray-700"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Movie Grid */}
      {currentMovies.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                isFavorite={favorites.includes(movie._id)}
                onToggleFavorite={() => toggleFavorite(movie._id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-30"
            >
              Previous
            </button>
            <p className="text-gray-300 mt-2">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-white mt-20">
          <h2 className="text-xl font-bold">No movies available.</h2>
        </div>
      )}
    </div>
  );
};

export default Movies;
