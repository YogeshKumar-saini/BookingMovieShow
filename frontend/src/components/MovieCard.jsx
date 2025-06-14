import { StarIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-between p-3 bg-white/5 border border-white/10 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 w-66 backdrop-blur-sm"
    >
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-xl h-52 w-full object-cover object-center cursor-pointer transition-all hover:brightness-110"
      />

      {/* Title */}
      <p className="text-white font-semibold text-base mt-3 truncate">{movie.title}</p>

      {/* Meta Info */}
      <p className="text-gray-400 text-xs mt-1">
        {new Date(movie.release_date).getFullYear()} &bull;{" "}
        {movie.genres.slice(0, 2).map((g) => g.name).join(" | ")} &bull;{" "}
        {timeFormat(movie.runtime)}
      </p>

      {/* Action + Rating */}
      <div className="flex items-center justify-between mt-4 pb-1">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="px-4 py-2 text-xs bg-primary hover:bg-primary/80 text-white rounded-full font-medium transition-all"
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
