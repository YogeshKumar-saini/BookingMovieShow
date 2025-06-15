import { StarIcon, HeartIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-between p-3 bg-white/5 border border-white/10 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-66 backdrop-blur-sm">
      {/* Favorite Heart */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-3 right-3 bg-black/60 p-1.5 rounded-full hover:scale-110 transition"
      >
        <HeartIcon
          className={`w-5 h-5 ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
          } transition-all`}
        />
      </button>

      {/* Poster */}
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-xl h-52 w-full object-cover object-center cursor-pointer hover:brightness-110 transition"
      />

      {/* Title */}
      <p className="text-white font-semibold text-base mt-3 truncate">{movie.title}</p>

      {/* Meta */}
      <p className="text-gray-400 text-xs mt-1">
        {new Date(movie.release_date).getFullYear()} &bull;{' '}
        {movie.genres.slice(0, 2).map((g) => g.name).join(' | ')} &bull;{' '}
        {timeFormat(movie.runtime)}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pb-1">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 text-xs bg-primary hover:bg-primary/80 text-white rounded-full font-medium transition"
        >
          Buy Tickets
        </button>
        <div className="flex items-center gap-1 text-sm text-gray-300">
          <StarIcon className="w-4 h-4 text-primary fill-primary" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
