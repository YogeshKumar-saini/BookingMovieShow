import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const bookHandler = () => {
    if (!selected) {
      return toast.error('Please select a date')
    }
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0, 0)
  }

  return (
    <section id='dateSelect' className='pt-28'>
      <div className='relative p-6 md:p-10 bg-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm overflow-hidden'>

        {/* Blur Decorations */}
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='80px' right='0px' />

        {/* Title */}
        <h2 className='text-xl md:text-2xl font-semibold text-white mb-6'>
          Choose a Date
        </h2>

        {/* Date Grid */}
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <ChevronLeftIcon width={28} className='text-gray-400' />

          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4'>
            {Object.keys(dateTime).map((date) => (
              <button
                onClick={() => setSelected(date)}
                key={date}
                className={`flex flex-col items-center justify-center h-16 w-16 text-sm font-medium rounded-xl transition-all shadow-sm ${
                  selected === date
                    ? 'bg-primary text-white scale-105'
                    : 'bg-transparent text-white border border-white/20 hover:border-primary'
                }`}
              >
                <span>{new Date(date).getDate()}</span>
                <span className='text-xs text-gray-300'>
                  {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </button>
            ))}
          </div>

          <ChevronRightIcon width={28} className='text-gray-400' />
        </div>

        {/* CTA Button */}
        <div className='mt-8 flex justify-end'>
          <button
            onClick={bookHandler}
            className='bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 active:scale-95 transition'
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default DateSelect
