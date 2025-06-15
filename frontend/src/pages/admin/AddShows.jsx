import React, { useEffect, useState } from 'react';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { kConverter } from '../../lib/kConverter';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import  { useCallback } from 'react';
const AddShows = () => {
  const { axios, getToken, user, image_base_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [showPrice, setShowPrice] = useState('');
  const [addingShow, setAddingShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchNowPlayingMovies = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/show/now-playing', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setNowPlayingMovies(data.movies);
        setFilteredMovies(data.movies);
      }
    } catch {
      toast.error('Failed to fetch movies');
    }
  }, [axios, getToken]);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split('T');
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
    setDateTimeInput('');
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== time);
      if (updatedTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: updatedTimes };
    });
  };

  const handleSubmit = async () => {
    if (!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setAddingShow(true);

      const showsInput = Object.entries(dateTimeSelection).flatMap(([date, times]) =>
        times.map((time) => ({ date, time }))
      );

      const payload = {
        movieId: selectedMovie,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post('/api/show/add', payload, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to add show');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setAddingShow(false);
    }
  };

  useEffect(() => {
    if (user) fetchNowPlayingMovies();
  }, [user, fetchNowPlayingMovies]);

  useEffect(() => {
    const results = nowPlayingMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
    setCurrentPage(1);
  }, [searchTerm, nowPlayingMovies]);

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  if (!nowPlayingMovies.length) return <Loading />;

  return (
    <div className="relative px-4 md:px-10 lg:px-20">
      <Title text1="Add" text2="Shows" />
      <p className="mt-8 text-lg font-semibold">🎬 Select a Movie</p>

      <div className="mt-4 max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 border border-gray-500 rounded-md bg-transparent text-sm"
        />
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex flex-wrap gap-5 mt-4 w-max">
          {paginatedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie.id)}
              className={`group relative w-40 cursor-pointer transition duration-300 hover:-translate-y-1 rounded-xl overflow-hidden border ${
                selectedMovie === movie.id ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={image_base_url + movie.poster_path}
                alt={movie.title}
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 text-xs text-gray-200 flex justify-between items-center">
                <span className="flex gap-1 items-center">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </span>
                <span>{kConverter(movie.vote_count)} votes</span>
              </div>
              {selectedMovie === movie.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="text-center mt-2">
                <p className="font-medium truncate">{movie.title}</p>
                <p className="text-xs text-gray-400">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm transition ${
                currentPage === i + 1 ? 'bg-primary text-white' : 'bg-transparent border-gray-500 text-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 max-w-sm">
        <label className="block mb-1 font-medium"> Show Price</label>
        <div className="flex items-center border border-gray-600 rounded-md px-3 py-2 gap-2">
          <span className="text-gray-400">{currency}</span>
          <input
            type="number"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            className="bg-transparent outline-none flex-1"
            placeholder="Enter price"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block font-medium mb-2"> Date & Time</label>
        <div className="flex gap-4 items-center">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="bg-transparent border border-gray-600 px-4 py-2 rounded-md text-sm"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Add
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2"> Selected Shows</h3>
          <div className="space-y-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date}>
                <p className="text-sm font-medium text-gray-300">{date}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="flex items-center border border-primary px-2 py-1 rounded-md text-sm bg-primary/10"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        className="w-4 h-4 ml-2 cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveTime(date, time)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={addingShow}
        className="mt-10 bg-gradient-to-r from-primary to-primary/80 hover:to-primary/90 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-60 transition"
      >
        {addingShow ? 'Adding...' : 'Add Show'}
      </button>
    </div>
  );
};

export default AddShows;
