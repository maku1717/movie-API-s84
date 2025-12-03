import Movie from "../models/Movie.js";

// Create movie
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies: movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single movie by ID
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({
      message: "Movie updated successfully",
      updatedMovie: movie,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add comment to a movie
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id; // from verify middleware

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.comments.push({
      userId: userId,
      comment: comment,
    });

    await movie.save();

    res.status(200).json({
      message: "comment added successfully",
      updatedMovie: movie,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ comments: movie.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
