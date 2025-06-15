import React, { useEffect, useState, useMemo } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const BOOKINGS_PER_PAGE = 5;

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) =>
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.show.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookings, searchTerm]);

  const totalPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * BOOKINGS_PER_PAGE;
    return filteredBookings.slice(start, start + BOOKINGS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />

      {/* Search & Pagination Controls */}
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by username or movie..."
          className="px-4 py-2 border border-gray-600 rounded-md bg-black/10 text-white w-full md:max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="text-sm text-gray-400 self-center">
          Page {currentPage} of {totalPages || 1}
        </div>
      </div>

      {/* Table */}
      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-white/5 transition"
                >
                  <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                  <td className="p-2">{item.show.movie.title}</td>
                  <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                  <td className="p-2">
                    {Object.values(item.bookedSeats).join(", ")}
                  </td>
                  <td className="p-2">
                    {currency} {item.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-30"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-700 transition disabled:opacity-30"
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

export default ListBookings;
