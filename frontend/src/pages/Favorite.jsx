import React, { useEffect, useState, useMemo } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { HeartOff, Search } from 'lucide-react'

const Favorite = () => {
  const { favoriteMovies } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 6

  // Filtered & Paginated Movies
  const filteredMovies = useMemo(() => {
    return favoriteMovies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, favoriteMovies])

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

  const currentMovies = useMemo(() => {
    const start = (currentPage - 1) * moviesPerPage
    const end = start + moviesPerPage
    return filteredMovies.slice(start, end)
  }, [filteredMovies, currentPage])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page on new search
  }, [searchTerm])

  return (
    <div className="relative min-h-[85vh] px-6 md:px-16 lg:px-40 xl:px-44 pt-32 pb-60 overflow-hidden">
      <BlurCircle top="120px" left="-80px" />
      <BlurCircle bottom="0px" right="-50px" />

      <div className="relative z-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-white drop-shadow-md">
            Your Favorite Movies
          </h1>
          <p className="text-sm text-gray-400 mt-1">Search and manage your favorite list.</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full max-w-md px-4 py-2 rounded-md bg-gray-800 border border-gray-600">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Movie Cards */}
      {currentMovies.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 place-items-center z-10 relative">
          {currentMovies.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center z-10 relative">
          <HeartOff className="w-20 h-20 text-gray-600 mb-6 animate-pulse" />
          <h2 className="text-2xl font-semibold text-white mb-2">No results found</h2>
          <p className="text-gray-400">Try a different movie title.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 z-10 relative">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                currentPage === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorite
