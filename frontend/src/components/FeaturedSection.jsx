import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      {/* Header */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle
          top="0px"
          right="-100px"
          size="20rem"
          color="bg-pink-500/20"
          blur="blur-[100px]"
        />
        <p className="text-gray-700 font-semibold text-xl tracking-wide">
          Now Showing
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200 w-4 h-4" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-8 justify-start max-sm:justify-center mt-4">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      <BlurCircle
        bottom="50%"
        left="10%"
        size="20rem"
        color="bg-pink-500/20"
        blur="blur-[100px]"
      />

      {/* Show More Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dull transition rounded-full shadow-sm"
        >
          Show more
        </button>
      </div>
      <BlurCircle
        top="50%"
        right="10%"
        size="20rem"
        color="bg-pink-500/20"
        blur="blur-[100px]"
      />
    </div>
  );
};

export default FeaturedSection;
