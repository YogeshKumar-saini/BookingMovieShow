import React, { useEffect, useMemo, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';

const SHOWS_PER_PAGE = 5;

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  const filteredShows = useMemo(() => {
    return shows.filter((show) =>
      show.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shows, searchTerm]);

  const totalPages = Math.ceil(filteredShows.length / SHOWS_PER_PAGE);
  const paginatedShows = useMemo(() => {
    const start = (currentPage - 1) * SHOWS_PER_PAGE;
    return filteredShows.slice(start, start + SHOWS_PER_PAGE);
  }, [filteredShows, currentPage]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />

      {/* Search & Pagination */}
      <div className='mt-6 flex flex-col md:flex-row justify-between gap-4'>
        <input
          type='text'
          placeholder='Search by movie name...'
          className='px-4 py-2 border border-gray-600 rounded-md bg-black/10 text-white w-full md:max-w-sm'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className='text-sm text-gray-400 self-center'>
          Page {currentPage} of {totalPages || 1}
        </div>
      </div>

      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 pl-5 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {paginatedShows.length > 0 ? (
              paginatedShows.map((show, idx) => (
                <tr key={idx} className='border-b border-primary/10 hover:bg-white/5 transition'>
                  <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                  <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                  <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                  <td className='p-2'>
                    {currency}{' '}
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className='text-center py-6 text-gray-400'>
                  No shows found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center gap-4 mt-4'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className='px-4 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-30'
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='px-4 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-30'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
