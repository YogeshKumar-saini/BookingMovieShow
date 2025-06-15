import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ArrowRight, CalendarIcon, ClockIcon, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt="" className="max-h-11 lg:h-11 mt-20" />
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>
          Guardians <br /> of the Galaxy
        </h1>

        <div className='flex items-center gap-4 text-gray-300'>
          <span>Action | Adventure | Sci-Fi</span>
          <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4.5 h-4.5' /> 2018
          </div>
          <div className='flex items-center gap-1'>
            <ClockIcon className='w-4.5 h-4.5' /> 2h 8m
          </div>
        </div>

        <p className='max-w-md text-gray-300'>
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        <button
          onClick={() => navigate('/movies')}
          className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-primary text-white hover:bg-primary-dull shadow-lg transition duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default HeroSection;
