import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user } = useAppContext();

  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'showDateTime', direction: 'asc' });

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setShows(data.shows);
      setFilteredShows(data.shows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) getAllShows();
  }, [user]);

  useEffect(() => {
    const filtered = shows.filter((show) =>
      show.movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredShows(filtered);
    setCurrentPage(1);
  }, [search, shows]);

  const sortData = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...filteredShows].sort((a, b) => {
      let aVal = key === 'movie.title' ? a.movie.title : a[key];
      let bVal = key === 'movie.title' ? b.movie.title : b[key];

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredShows(sorted);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  const paginatedShows = filteredShows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />

      {/* Search */}
      <div className="mt-8 mb-4">
        <input
          type="text"
          placeholder="Search by movie name..."
          className="w-full max-w-xs px-4 py-2 border border-gray-600 rounded-md bg-transparent text-white outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="max-w-6xl overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full border-collapse text-nowrap text-sm text-left">
          <thead>
            <tr className="bg-primary/20 text-white">
              <th
                className="p-3 cursor-pointer pl-5"
                onClick={() => sortData('movie.title')}
              >
                Movie Name
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => sortData('showDateTime')}
              >
                Show Time
              </th>
              <th className="p-3">Total Bookings</th>
              <th className="p-3">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {paginatedShows.map((show, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-primary/10 transition-all"
              >
                <td className="p-3 pl-5 font-medium">{show.movie.title}</td>
                <td className="p-3">{dateFormat(show.showDateTime)}</td>
                <td className="p-3">{Object.keys(show.occupiedSeats).length}</td>
                <td className="p-3">
                  {currency} {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     {/* Pagination */}
{totalPages > 1 && (
  <div className="mt-6 flex justify-center items-center gap-2">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="px-3 py-1 text-white bg-primary/80 rounded disabled:opacity-50"
    >
      Prev
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) =>
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      )
      .map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="px-3 py-1 text-white bg-primary/80 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
