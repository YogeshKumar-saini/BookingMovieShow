import React, { useState, useMemo } from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
  const navigate = useNavigate();

  // States for pagination and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredAndSorted = useMemo(() => {
    const filtered = dummyShowsData.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortType === 'rating') return b.vote_average - a.vote_average;
      if (sortType === 'release') return new Date(b.release_date) - new Date(a.release_date);
      return a.title.localeCompare(b.title); // default: title
    });

    return sorted;
  }, [searchQuery, sortType]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const currentMovies = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return dummyShowsData.length > 0 ? (
    <div className="relative my-32 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-3xl font-bold mb-4 text-white">Your Favorite Movies</h1>
      <p className="text-sm text-gray-400 mb-6">{filteredAndSorted.length} movies found</p>

      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search favorites..."
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 rounded-md bg-gray-800 text-white"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="title">Sort by Title (A-Z)</option>
          <option value="rating">Sort by Rating</option>
          <option value="release">Sort by Release Date</option>
        </select>
      </div>

      {/* Movie Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {currentMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </button>
          <p className="text-sm text-gray-300">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md disabled:opacity-30"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-3xl font-bold text-white mb-4">No Favorites Yet</h1>
      <p className="text-gray-400 mb-6">
        You haven’t added any movies to your favorites. Start exploring and mark your favorites!
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
    </div>
  );
};

export default Favorite;
