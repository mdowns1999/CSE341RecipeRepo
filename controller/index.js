const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper");

const index = async(req, res) => {
  
  res.send('hello world!');
}

const getAllMovies = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("movies")
      .collection("movie")
      .find();



    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      //res.setHeader("Cookie", "appSession=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaWF0IjoxNjc3MDEwNTEyLCJ1YXQiOjE2NzcwMTA3OTYsImV4cCI6MTY3NzA5NzE5Nn0..hOgusfmJiumAgciJ.anBaoVHTcM400OgYUXj_leY6gFS3x9x4NKscwXSJmFr_yWBaAk95ifrneGsTWfAgUXMxLlcYFTVDtFIBTUd8GtRb3vruzq5NZ7VYBXQhlzjkAs1aT4WTgLyJk_vC4M2fKZdjtM_Tr3015AduNt0u844a_Hjg0OmRNx3uCk_6IlAHdNXrAafAEgE0hMHdC90H0Faa5plMQbHndlJ5wqfY1g395afc2b1wiRJbMPU8IK__p0z80tVrA2MYiWvk2Zjh4qTnfEIoga-fraQrtRUzsunSa9Ch_uTxCLYm5h4T0ML65sb0PjA7masGX9OeudMaDEsVV4GwnTgKxmsMJlZfILsF4nwSjZtC3C3HFILc1hThsmtFouEXfovvsEXjG4AZlAysJ3s3BQbqbY5dlOF_i8Y-zHxfJ4r5FqILvjUjXkQVlGChpXI3tQhUlx0kyZByrX18ZILng-o_IsZG9GNukBePn-DYxymGgRp3-pi2cZ1eRgcD-nhDjJP99RZ5BdLH8AkdLTlEFSl1Kzq0H8E-pS5lcqxMNUox5RU1v3FKWOUnek7ZwYPJwLKeD6Fk0ao88rKufvm_S4aHpdbfkbwnAIHmjOpp0uIECTPSj-YO9I0SpK5--RtO_untsoNgQ3WvjA8N4ktQyXmptsMMydIxxvasbDAug7PfGVe0kJ0VEfcKfJSCuGjpJMEp3LEXHlOV-PH-NzPjvhj4W_P1E9ylDU9_yzWdy8j3qPmQidARSWFWFpjZ2b1i-2ykdvqlm7O62tzmqIU6jJzfn-y0sKtwbHiceIMB74lM-QabPYyBFm6rXZJtFzLRvSpbL6SOfVcs0tN28ejXLfsmivSO0ESBzEwV7-4FghhLxjB_bkjFJlBXkJ3T48pmTDXBP5fyu4LZ1uqO73fZ6His0qdrPh_ozfnTrDJvtoUqFLDRkWMRsk64dGt-QGz80a80Pzw3OmUnw7dXYbrm6EwzBaYm-5y6oUYYIFfULtBGnA_RidAaUjX3oU1Re0wwml8Z1aLktBpZYtKBGRk0ZQuyX_hXtZZPMx2LrEdJAGcTL2VKMRGBQQz2a07FEWQ1EEUMIj_jT8rp1Y5ZF5cTrDk8-OIKDAcYXzbJX11WOUqXOg4gmXOLvrscbYid-dnNVyploNJ6ly_urb4hK7pBB9-EXuRVfpGpWEzeeAKh6OUG2qR5a2712ohkzi6oaQtvp1Xu6Duoyu6ygMAqJKz9m-MUHKDdv9JRXNQxKi1yFUFuHz-wgLSZtk1hShWLzT2_O7BRP6ESh6PN3MKzfRWMxGnHCKRpKtSHsUeAKzBKIFS8DggS6uScicey_wyVJAnJk86AmWnjkihSosbqIfYAOeyYmhJXJJ5MFrx9es04pWb52eyocYOUEt3Msi_aiUSizbaONskreLMpMIcx8-Y8ttP1JpfTfK9UFrfJ_satQybAwfDYBKc0pmnCvLDEnjjQfy3_XQc2aSn6dNkYBenynAN4ES0QcUdYzvoBfg0wZulo7hjWvqpQKmdp1rn_O9lRMkZg2hy9x3zJ4NeEp7-lQ2aqu7moaNlCu5vjCqv6N-XhrDLFAjj-ZbD3WSA6RUvprOLDDfIHZZmeAnm_OMcDqkaTMEtVt0i3rVU_WTM.zB9t5d0MkKuKEJ9Q6GrqPg");
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
      .find({ _id: ObjectId(movieIdString)});

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
  index
};
