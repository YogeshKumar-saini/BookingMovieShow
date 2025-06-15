import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { Search, Loader, FilmIcon } from 'lucide-react'

const Movies = () => {
  const { shows } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const moviesPerPage = 8

  useEffect(() => {
    const filtered = shows.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMovies(filtered)
    setCurrentPage(1)
  }, [searchTerm, shows])

  const indexOfLast = currentPage * moviesPerPage
  const indexOfFirst = indexOfLast - moviesPerPage
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

  return shows.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] text-white'>

      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* Search Header */}
      <div className="flex justify-between items-center gap-4 flex-wrap mb-8">
        <h1 className='text-2xl font-bold tracking-tight'>Now Showing</h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md focus:outline-none text-sm placeholder:text-gray-300 focus:ring-2 ring-primary"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400 w-4 h-4' />
        </div>
      </div>

      {/* Movie List */}
      {currentMovies.length > 0 ? (
        <>
          <div className='flex flex-wrap justify-center gap-8 transition-all duration-500'>
            {currentMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center mt-12 gap-3 flex-wrap'>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                    currentPage === idx + 1
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-transparent text-gray-300 hover:bg-white/10 border-white/10'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className='flex flex-col items-center justify-center h-96 opacity-80 text-center'>
          <FilmIcon className="w-10 h-10 mb-4 text-gray-500" />
          <p className='text-lg font-medium'>No matching movies found.</p>
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <Loader className="w-8 h-8 animate-spin mb-4 text-gray-400" />
      <p className='text-xl text-gray-500'>Loading movies...</p>
    </div>
  )
}

export default Movies
