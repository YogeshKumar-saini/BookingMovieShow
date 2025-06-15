import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircle, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const movie = dummyShowsData.find((s) => s._id === id);
    if (movie) {
      setShow({
        movie,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  if (!show) return <Loading />;

  const { movie } = show;

  return (
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-32 pt-24 pb-12 text-white">
      <BlurCircle top="-100px" left="-100px" />

      {/* Main Movie Section */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/10">
        {/* Poster */}
        <div className="w-full max-w-xs mx-auto lg:mx-0 relative group overflow-hidden rounded-xl shadow-lg">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="rounded-xl w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
        </div>

        {/* Movie Details */}
        <div className="flex flex-col justify-between gap-4 text-white">
          <p className="text-primary text-sm tracking-widest uppercase">English</p>
          <h1 className="text-4xl font-bold leading-snug">{movie.title}</h1>
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <StarIcon className="w-5 h-5 fill-yellow-400" />
            <span>{movie.vote_average.toFixed(1)} / 10</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{movie.overview}</p>
          <p className="text-sm text-gray-300">
            {timeFormat(movie.runtime)} · {movie.genres.map((g) => g.name).join(", ")} ·{" "}
            {movie.release_date.split("_")[0]}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="flex items-center gap-2 px-6 py-2 bg-gray-900/70 hover:bg-gray-800 text-white rounded-lg shadow transition active:scale-95 text-sm">
              <PlayCircle className="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#dateSelect"
              className="px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm shadow active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="bg-gray-700 p-2.5 rounded-full hover:bg-gray-600 transition active:scale-95 shadow">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">Your Favorite Cast</h2>
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-6 w-max px-2">
            {movie.casts.slice(0, 12).map((cast, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center min-w-[80px] group"
              >
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="rounded-full h-20 w-20 object-cover shadow-md group-hover:scale-105 transition"
                />
                <p className="text-xs text-white mt-2 group-hover:text-primary transition">
                  {cast.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Select Section */}
      <div id="dateSelect" className="mt-20">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* Recommendations */}
      <div className="mt-20">
        <p className="text-lg font-semibold mb-6">You May Also Like</p>
        <div className="flex flex-wrap justify-center gap-6">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-8 py-3 bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm font-medium shadow-md active:scale-95"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
