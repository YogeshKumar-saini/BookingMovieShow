import { ArrowRight, SearchIcon } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import { useAppContext } from '../context/AppContext';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  // === Search + Pagination Logic ===
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filteredShows = useMemo(() => {
    return shows.filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, shows]);

  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  const paginatedShows = filteredShows.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      {/* Header Section */}
      <div className="relative flex items-center justify-between pt-20 pb-10 flex-wrap gap-4">
        <BlurCircle top="0" right="-80px" />
        <div>
          <p className="text-gray-400 text-sm uppercase">Top Picks This Week</p>
          <h2 className="text-gray-200 font-bold text-xl md:text-2xl">Now Showing</h2>
        </div>
        <button
          onClick={() => navigate('/movies')}
          className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200 w-4.5 h-4.5" />
        </button>
      </div>

      {/* Search Box */}
      <div className="w-full mb-6 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg max-w-md">
        <SearchIcon size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to page 1 when searching
          }}
          className="bg-transparent outline-none text-gray-200 w-full placeholder:text-gray-500 text-sm"
        />
      </div>

      {/* Movie Cards */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6 min-h-[180px] transition-all">
        {paginatedShows.length > 0 ? (
          paginatedShows.map((show) => <MovieCard key={show._id} movie={show} />)
        ) : (
          <p className="text-gray-500 italic mt-10 text-sm">No movies found matching your search.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredShows.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-300">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className={`px-4 py-1 rounded bg-gray-700 hover:bg-gray-600 transition ${
              page === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Prev
          </button>
          <span>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-1 rounded bg-gray-700 hover:bg-gray-600 transition ${
              page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Show More Button */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate('/movies');
            scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull text-white transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
