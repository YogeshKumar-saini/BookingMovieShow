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
    <div className='relative min-h-screen pt-28 pb-20 px-4 md:px-16 lg:px-36 bg-gradient-to-b from-black via-gray-900 to-black text-white'>
      <BlurCircle top="120px" left="80px" />
      <BlurCircle bottom="50px" right="100px" />

      <h1 className='text-3xl md:text-4xl font-bold mb-12 text-center tracking-wide'>🎟️ My Bookings</h1>

      {bookings.length > 0 ? (
        <div className='grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
          {bookings.map((item, index) => (
            <div
              key={index}
              className='relative group rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden transition hover:scale-[1.01]'
            >
              <div className='relative'>
                <img
                  src={image_base_url + item.show.movie.poster_path}
                  alt={item.show.movie.title}
                  className='w-full h-60 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'></div>
              </div>

              <div className='p-6 flex flex-col justify-between gap-4'>
                {/* Movie Info */}
                <div>
                  <h2 className='text-2xl font-bold text-white mb-1'>{item.show.movie.title}</h2>
                  <div className='text-sm text-gray-300 space-y-1'>
                    <p className='flex items-center gap-2'><Clock className='w-4 h-4' /> {timeFormat(item.show.movie.runtime)}</p>
                    <p className='flex items-center gap-2'><CalendarDays className='w-4 h-4' /> {dateFormat(item.show.showDateTime)}</p>
                    <p className='flex items-center gap-2'><TicketIcon className='w-4 h-4' /><span className='font-semibold'>Seats:</span> {item.bookedSeats.join(', ')}</p>
                  </div>
                </div>

                {/* Booking Info */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                  <p className='text-xl font-bold text-green-400'>{currency}{item.amount}</p>
                  <div className='flex flex-col items-start sm:items-end gap-2'>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                      ${item.isPaid ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                      {item.isPaid ? <CheckCircle className='w-4 h-4' /> : <XCircle className='w-4 h-4' />}
                      {item.isPaid ? 'Paid' : 'Pending'}
                    </span>
                    {!item.isPaid && (
                      <Link
                        to={item.paymentLink}
                        className='bg-primary hover:bg-primary-dull transition px-5 py-1.5 text-sm rounded-full font-medium text-white'
                      >
                        Pay Now
                      </Link>
                    )}
                  </div>
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
