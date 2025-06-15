import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';
import { useAppContext } from '../context/AppContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { image_base_url } = useAppContext();

  return (
    <div
      className="backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-2xl shadow-xl w-72 p-3 transition hover:shadow-2xl duration-300"
    >
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={image_base_url + movie.backdrop_path}
        alt={movie.title}
        className="rounded-xl h-48 w-full object-cover cursor-pointer transition duration-300 hover:opacity-90"
      />

      <div className="mt-3 px-1">
        <p className="font-semibold text-lg truncate">{movie.title}</p>

        <p className="text-sm text-gray-300 mt-1">
          {new Date(movie.release_date).getFullYear()} •{' '}
          {movie.genres.slice(0, 2).map((g) => g.name).join(' | ')} •{' '}
          {timeFormat(movie.runtime)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 px-4 py-2 text-xs rounded-full font-semibold transition-transform transform hover:scale-105"
        >
          Buy Tickets
        </button>

        <div className="flex items-center gap-1 text-sm text-primary">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-300">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
