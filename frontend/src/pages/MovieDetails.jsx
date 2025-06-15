import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import timeFormat from '../lib/timeFormat'
import toast from 'react-hot-toast'

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)

  const {
    shows,
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies,
    image_base_url
  } = useAppContext()

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)
      if (data.success) setShow(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error('Please login to proceed')

      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movieId: id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` }
        }
      )

      if (data.success) {
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  if (!show) return <Loading />

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image_base_url + show.movie.backdrop_path})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-0" />

        <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-36 py-20 flex flex-col md:flex-row gap-12 max-w-screen-xl mx-auto">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={image_base_url + show.movie.poster_path}
              alt={show.movie.title}
              className="rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <p className="text-sm text-primary uppercase mb-1">Now Showing</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {show.movie.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3 flex-wrap">
              <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              {show.movie.vote_average.toFixed(1)} •{' '}
              {timeFormat(show.movie.runtime)} •{' '}
              {show.movie.release_date.split('-')[0]}
            </div>

            <p className="text-sm sm:text-base text-gray-300 mb-6">
              {show.movie.overview}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {show.movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#dateSelect"
                className="bg-primary px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-full hover:bg-primary-dull transition shadow-md"
              >
                🎟 Buy Tickets
              </a>
              <button
                onClick={handleFavorite}
                className={`bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition ${
                  favoriteMovies.find((movie) => movie._id === id)
                    ? 'text-primary fill-primary'
                    : 'text-gray-400'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="px-4 sm:px-6 md:px-16 lg:px-36 mt-16">
        <p className="text-xl sm:text-2xl font-semibold text-white">✨ Cast</p>
        <div className="overflow-x-auto no-scrollbar mt-6 pb-4">
          <div className="flex gap-4 sm:gap-6 w-max">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div key={index} className="text-center min-w-[72px] sm:min-w-[80px]">
                <div className="relative group">
                  <img
                    src={image_base_url + cast.profile_path}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover shadow-lg group-hover:shadow-xl transition"
                    alt={cast.name}
                  />
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition" />
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Select */}
      <div className="px-4 sm:px-6 md:px-16 lg:px-36 mt-16" id="dateSelect">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* Recommendations */}
      <div className="px-4 sm:px-6 md:px-16 lg:px-36 mt-20">
        <p className="text-lg sm:text-xl font-semibold mb-8">🎞 You May Also Like</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {shows.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="flex justify-center mt-10 mb-6">
          <button
            onClick={() => {
              navigate('/movies')
              scrollTo(0, 0)
            }}
            className="px-6 sm:px-10 py-2 rounded-full bg-primary hover:bg-primary-dull transition text-white font-medium"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
