import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <section
      className='relative h-screen bg-cover bg-center bg-no-repeat flex items-center'
      style={{
        backgroundImage: `url("/backgroundImage.png")`,
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />

      {/* Content */}
      <div className='relative z-10 flex flex-col gap-6 px-6 md:px-16 lg:px-36 max-w-2xl'>
        <img src={assets.marvelLogo} alt="Marvel Logo" className='h-10 w-auto mt-10 animate-fade-in' />

        <h1 className='text-white text-4xl sm:text-6xl lg:text-[70px] leading-tight font-extrabold tracking-tight animate-slide-up'>
          Guardian <br /> of the Galaxy
        </h1>

        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-300'>
          <span>Action | Adventure | Sci-Fi</span>
          <div className='flex items-center gap-1'>
            <CalendarIcon className='w-4 h-4' /> 2018
          </div>
          <div className='flex items-center gap-1'>
            <ClockIcon className='w-4 h-4' /> 2h 8m
          </div>
        </div>

        <p className='text-gray-300 text-sm md:text-base max-w-lg leading-relaxed'>
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two rebels meet in London and attempt to stop a dark conspiracy.
        </p>

        <button
          onClick={() => navigate('/movies')}
          className='flex items-center gap-2 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-semibold text-white w-fit shadow-lg hover:scale-[1.02]'
        >
          Explore Movies <ArrowRight className='w-5 h-5' />
        </button>
      </div>
    </section>
  )
}

export default HeroSection
