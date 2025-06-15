import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 overflow-hidden  text-white">
      <h2 className="text-center text-3xl md:text-4xl font-bold tracking-wide mb-6">Watch Latest Trailers</h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-sm md:text-base">
        Explore thrilling trailers of the latest blockbuster movies with immersive previews.
      </p>

      {/* Video Player */}
      <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 max-w-6xl mx-auto">
        <BlurCircle top="-100px" right="-100px" />
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls
          width="100%"
          height="540px"
          className="rounded-3xl"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-6xl mx-auto px-2">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              currentTrailer.image === trailer.image
                ? 'ring-2 ring-pink-500 scale-[1.03]'
                : 'opacity-80 hover:opacity-100'
            }`}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="Trailer thumbnail"
              className="w-full h-44 object-cover rounded-xl brightness-[.65] group-hover:brightness-90 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300" />
            <PlayCircleIcon
              strokeWidth={1.5}
              className="absolute top-1/2 left-1/2 w-12 h-12 text-white transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
