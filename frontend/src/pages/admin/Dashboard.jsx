import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarsIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';

const ITEMS_PER_PAGE = 6;

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings || '0', icon: ChartLineIcon },
    {
      title: 'Total Revenue',
      value: currency + (dashboardData.totalRevenue || '0'),
      icon: CircleDollarSignIcon,
    },
    { title: 'Active Shows', value: dashboardData.activeShows.length || '0', icon: PlayCircleIcon },
    { title: 'Total Users', value: dashboardData.totalUser || '0', icon: UserIcon },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredShows = useMemo(() => {
    return dashboardData.activeShows.filter((show) =>
      show.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dashboardData.activeShows, searchTerm]);

  const totalPages = Math.ceil(filteredShows.length / ITEMS_PER_PAGE);
  const paginatedShows = filteredShows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* Metrics */}
      <div className="relative mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardCards.map((card, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-5 bg-primary/10 border border-primary/20 rounded-lg shadow-md transition-all hover:-translate-y-1 hover:border-primary/40 duration-300"
            >
              <div>
                <h1 className="text-sm text-gray-300">{card.title}</h1>
                <p className="text-2xl font-semibold text-white mt-1">{card.value}</p>
              </div>
              <card.icon className="w-7 h-7 text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 mt-12">
        <p className="text-lg font-semibold text-white">Active Shows</p>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
          <SearchIcon className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent outline-none text-white placeholder:text-gray-400 text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Active Shows Grid */}
      <div className="relative mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        <BlurCircle top="150px" left="-10%" />
        {paginatedShows.length > 0 ? (
          paginatedShows.map((show) => (
            <div
              key={show._id}
              className="rounded-xl overflow-hidden bg-primary/10 border border-primary/20 transition-all hover:-translate-y-1 hover:border-primary/40 duration-300 shadow-sm"
            >
              <img
                src={show.movie.poster_path}
                alt={show.movie.title}
                className="h-60 w-full object-cover"
              />
              <div className="p-3">
                <p className="font-medium truncate text-white">{show.movie.title}</p>
                <div className="flex justify-between items-center mt-2 text-gray-300 text-sm">
                  <span className="text-white font-semibold text-lg">
                    {currency} {show.showPrice}
                  </span>
                  <span className="flex items-center gap-1">
                    <StarsIcon className="w-4 h-4 text-primary fill-primary" />
                    {show.movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm mt-2 text-gray-400">{dateFormat(show.showDateTime)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white mt-4">No shows found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary/10 border border-primary/20 text-white rounded-md hover:bg-primary/20 transition disabled:opacity-30"
          >
            Previous
          </button>
          <p className="text-gray-300 mt-2">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary/10 border border-primary/20 text-white rounded-md hover:bg-primary/20 transition disabled:opacity-30"
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

export default Dashboard;
