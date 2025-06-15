import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const onBookHandler = () => {
    if (!selected) return toast('Please select a date')
    navigate(`/movies/${id}/${selected}`)
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="dateSelect" className="">
      <div className="relative p-4 md:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Blur Effects */}
        <BlurCircle top="12px" left="32px" size="300px" />
        <BlurCircle bottom="0" right="12px" size="300px" />

        {/* Left Section */}
        <div className="w-full md:w-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Choose Your Date</h2>
          <div className="flex items-center gap-4">
            <ChevronLeftIcon size={28} className="text-primary" />

            <div className="grid grid-cols-4 sm:grid-cols-5 md:flex flex-wrap gap-4 max-w-md">
              {Object.keys(dateTime).map((date) => {
                const dateObj = new Date(date)
                const isSelected = selected === date

                return (
                  <button
                    key={date}
                    onClick={() => setSelected(date)}
                    className={`flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all duration-200 font-semibold text-sm
                      ${
                        isSelected
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                      }
                    `}
                  >
                    <span className="text-lg">{dateObj.getDate()}</span>
                    <span className="text-xs text-gray-300">
                      {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>

            <ChevronRightIcon size={28} className="text-primary" />
          </div>
        </div>

        {/* Right Section - CTA */}
        <div className="w-full md:w-auto text-center md:text-right">
          <button
            onClick={onBookHandler}
            className="mt- md:mt-0 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-primary text-white font-medium text-sm md:text-base shadow-lg hover:scale-105 transition-transform duration-200"
          >
             Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelect
