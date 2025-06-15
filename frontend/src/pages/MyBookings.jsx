import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormat';
import { CheckCircle2 } from 'lucide-react';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  }

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-36 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className="text-2xl font-bold mb-8">My Bookings</h1>

      <div className="flex flex-col gap-6">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between gap-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 transition hover:shadow-xl"
          >
            {/* Left - Movie Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={item.show.movie.poster_path}
                alt=""
                className="w-full sm:w-40 md:w-48 aspect-video rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xl font-semibold text-white">
                    {item.show.movie.title}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {timeFormat(item.show.movie.runtime)} &middot;{' '}
                    {dateFormat(item.show.showDateTime)}
                  </p>
                </div>
                <div className="text-sm text-gray-300 mt-3">
                  <p>
                    <span className="text-gray-400">Total Tickets:</span>{' '}
                    {item.bookedSeats.length}
                  </p>
                  <p>
                    <span className="text-gray-400">Seat Numbers:</span>{' '}
                    {item.bookedSeats.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Payment Info */}
            <div className="flex flex-col items-start md:items-end justify-between">
              <p className="text-2xl font-bold text-white mb-2">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid ? (
                <button className="bg-primary px-5 py-2 text-sm rounded-full font-semibold text-white hover:bg-primary-dull transition active:scale-95">
                  Pay Now
                </button>
              ) : (
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5" /> Paid
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyBookings;
