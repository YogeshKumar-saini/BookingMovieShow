import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../inngest/index.js";

// Get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
    });

    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Add new shows to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    if (!movieId || !Array.isArray(showsInput) || !showPrice) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    let movie = await Movie.findById(movieId);

    // If movie not found locally, fetch from TMDB
    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
        })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    // Build show objects from input
   const showsToCreate = showsInput.map((show) => {
  const dateTimeString = `${show.date}T${show.time}`; // show.time is a string ✅
  return {
    movie: movieId,
    showDateTime: new Date(dateTimeString),
    showPrice,
    occupiedSeats: {}
  };
});

console.log("Received showsInput:", showsInput);
    // Insert shows in bulk
    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    // Send Inngest event (analytics/notifications)
    await inngest.send({
      name: "app/show.added",
      data: { movieTitle: movie.title }
    });

    res.json({ success: true, message: 'Show added successfully.' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message, stack: error.stack });
  }
};

// Get all upcoming shows, grouped by movie
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate('movie')
      .sort({ showDateTime: 1 });

    const uniqueMoviesMap = new Map();
    shows.forEach(show => {
      const movieId = show.movie._id.toString();
      if (!uniqueMoviesMap.has(movieId)) {
        uniqueMoviesMap.set(movieId, show.movie);
      }
    });

    res.json({ success: true, shows: Array.from(uniqueMoviesMap.values()) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all shows for a specific movie
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() }
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
