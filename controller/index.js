const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper");

const getAllMovies = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .find();

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getMovieByID = async (req, res) => {
  try {
    const movieIdString = req.params.id;
    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .find({ _id: ObjectId(movieIdString) });

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const postNewMovie = async (req, res) => {
  try {
    const movie = {
      movie_id: req.body.movie_id,
      title: req.body.title,
      rating: req.body.rating,
      plot: req.body.plot,
      length: req.body.length,
    };

    const response = valid.validateMovie(movie);
    if (response.error) {
      res.status(422).json(response.error.message);
      return;
    }

    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .insertOne(movie);

    if (result.acknowledged) {
      res.status(202).json(result);
      console.log("The contact was successfully inserted!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const userIdString = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .deleteOne({ _id: userIdString });

    console.log(`Results Deleted: ${result.deletedCount} `);

    if (result.deletedCount > 0) {
      res.status(204).send();
      console.log("The info was successfully deleted!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateMovie = async (req, res) => {
  try {
    const userIdString = new ObjectId(req.params.id);
    const movie = {
      movie_id: req.body.movie_id,
      title: req.body.title,
      rating: req.body.rating,
      plot: req.body.plot,
      length: req.body.length,
    };

    const response = valid.validateMovie(movie);
    if (response.error) {
      res.status(422).json(response.error.message);
      return;
    }

    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .updateOne({ _id: userIdString }, { $set: movie });

    if (result.acknowledged) {
      res.status(204).send();
      console.log("The info was successfully updated!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllMovies,
  getMovieByID,
  postNewMovie,
  deleteMovie,
  updateMovie,
};
