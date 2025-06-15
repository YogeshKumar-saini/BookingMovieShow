import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TicketIcon, CalendarDays, Clock, CheckCircle, XCircle } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user, image_base_url } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) setBookings(data.bookings)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) getMyBookings()
  }, [user])

  if (isLoading) return <Loading />

  return (
    <div className='relative px-6 md:px-16 lg:px-36 pt-28 pb-20 min-h-screen text-white'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      
      <h1 className='text-3xl font-bold mb-10'>🎟️ My Bookings</h1>

      {bookings.length > 0 ? (
        <div className='space-y-10 '>
          {bookings.map((item, index) => (
            <div
              key={index}
              className='relative  bg-white/5 border border-white/10 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group'
            >
              {/* Poster */}
              <div className='w-full md:w-60 h-60 md:h-full absolute top-0 left-0'>
                <img
                  src={image_base_url + item.show.movie.poster_path}
                  alt={item.show.movie.title}
                  className='w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition'
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
              </div>

              {/* Booking content */}
              <div className='md:ml-60 p-6 flex flex-col md:flex-row md:justify-between gap-4'>
                <div>
                  <h2 className='text-2xl font-semibold mb-1'>{item.show.movie.title}</h2>
                  <p className='flex items-center gap-2 text-sm text-gray-400'>
                    <Clock className='w-4 h-4' /> {timeFormat(item.show.movie.runtime)}
                  </p>
                  <p className='flex items-center gap-2 text-sm text-gray-400 mt-1'>
                    <CalendarDays className='w-4 h-4' /> {dateFormat(item.show.showDateTime)}
                  </p>
                  <p className='flex items-center gap-2 text-sm text-gray-400 mt-1'>
                    <TicketIcon className='w-4 h-4' /> <span className='font-medium'>Seats:</span> {item.bookedSeats.join(', ')}
                  </p>
                </div>

                {/* Right */}
                <div className='text-right space-y-3'>
                  <p className='text-xl font-bold text-green-400'>{currency}{item.amount}</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium 
                    ${item.isPaid ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {item.isPaid ? <CheckCircle className='w-4 h-4' /> : <XCircle className='w-4 h-4' />}
                    {item.isPaid ? 'Paid' : 'Pending'}
                  </span>
                  {!item.isPaid && (
                    <Link
                      to={item.paymentLink}
                      className='block bg-primary hover:bg-primary-dull transition px-4 py-2 text-sm rounded-full font-semibold'
                    >
                      Pay Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-96 text-center text-gray-400'>
          <TicketIcon className='w-10 h-10 mb-4' />
          <p className='text-lg font-medium'>You haven’t booked any tickets yet.</p>
          <Link to='/movies' className='mt-4 px-6 py-2 bg-primary text-sm rounded-full font-medium text-white hover:bg-primary-dull'>
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyBookings
