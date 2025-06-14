import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 text-white">
      {/* Decorative Blur Elements */}
      <BlurCircle top="-80px" right="-120px" />
      <BlurCircle top="100px" left="-100px" />
<BlurCircle top="50%" right="10%" size="20rem" color="bg-pink-500/20" blur="blur-[100px]" />
<BlurCircle top="50%" left="10%" size="20rem" color="bg-pink-500/20" blur="blur-[100px]" />

      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">
        🎬 Latest Movie Trailers
      </h2>

      {/* Video Player */}
      <div className="relative max-w-[960px] aspect-video mx-auto rounded-3xl overflow-hidden shadow-xl ring-1 ring-white/10">
        <ReactPlayer
          url={currentTrailer.videoUrl}
          controls
          width="100%"
          height="100%"
          className="rounded-2xl"
        />
      </div>

      {/* Trailer Thumbnails */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {dummyTrailers.map((trailer, index) => {
          const isActive = currentTrailer.videoUrl === trailer.videoUrl;

          return (
            <div
              key={trailer.image}
              onClick={() => setCurrentTrailer(trailer)}
              className={`relative cursor-pointer rounded-xl overflow-hidden group transition-all duration-300 ${
                isActive ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-105'
              }`}
            >
              <img
                src={trailer.image}
                alt={`Trailer ${index + 1}`}
                className={`w-full h-40 sm:h-48 md:h-56 object-cover brightness-75 group-hover:brightness-100 transition-all duration-300 ${
                  isActive ? 'brightness-100' : ''
                }`}
              />
              <PlayCircleIcon
                className="absolute top-1/2 left-1/2 w-10 h-10 sm:w-12 sm:h-12 text-white/90 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition"
                strokeWidth={1.5}
              />
              <div className="absolute bottom-2 left-2 right-2 text-xs text-center text-white font-medium bg-black/40 rounded-md py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                Trailer {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrailerSection;
