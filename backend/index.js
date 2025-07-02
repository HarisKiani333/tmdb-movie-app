const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/moviedb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check route
app.get('/', (req, res) => {
  res.send({ message: 'Backend is running!' });
});

// Movie schema and model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
});
const Movie = mongoose.model('Movie', movieSchema);

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
  const { title, director, year, genre } = req.body;
  if (!title || !director || !year || !genre) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newMovie = new Movie({ title, director, year, genre });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a movie
app.put('/api/movies/:id', async (req, res) => {
  const { title, director, year, genre } = req.body;
  if (!title || !director || !year || !genre) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year, genre },
      { new: true, runValidators: true }
    );
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 