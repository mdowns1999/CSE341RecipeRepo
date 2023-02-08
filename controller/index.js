const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check } = require('express-validator');

const name = async(req, res) => {
    res.json('Hello');
}

const getAllMovies = async(req, res) =>{
  try{
    const result = await mongodb.getDb().db('movies').collection('movie').find();

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
  }
    catch(err){
      res.status(400).json(err.message);
  }
};

const getMovieByID = async(req, res) => {
  try{
    const movieIdString = req.params.id;
    const result = await mongodb.getDb()
    .db('movies')
    .collection('movie')
    .find({_id : ObjectId(movieIdString)});

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
  }
  catch(err){
    res.status(400).json(err.message);
}
}

const postNewMovie = async(req, res) => {
    try{

    const movie = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        rating: req.body.rating ,
        plot: req.body.plot,
        length: req.body.length
      };
      console.log(movie.movie_id);
      //console.log(check(movie.movie_id, "Please enter a Movie ID").not().isEmpty().isLength({min:1, max:3}))
      //Check if the entered info is valid
      //check(movie.movie_id, "Please enter a Movie ID").not().isEmpty().isLength({min:1, max:3});
      //check(movie.title, "Please enter a title").not().isEmpty();
      //check(movie.rating, "Please enter a Movie Rating").not().isEmpty();
      //check(movie.plot, "Please enter a Movie plot").not().isEmpty();
      //check(movie.length, "Please enter a Movie length").not().isEmpty();
    
      const result = await mongodb.getDb()
      .db('movies')
      .collection('movie')
      .insertOne(movie);
      //const result = await mongodb.getDb().db('movies').collection('movie').find();

      if (result.acknowledged) {
        res.status(202).json(result);
        console.log('The contact was successfully inserted!');
      } 
      else {
        res.status(500).json('The insert has failed.');
      }
              
    }
    catch(err){
        res.status(400).json(err.message);
    }
}


const deleteMovie = async (req, res) => {
    const userIdString = new ObjectId(req.params.id);
  
    const result = await mongodb
      .getDb()
      .db('movies')
      .collection('movie')
      .deleteOne({ _id: userIdString });
  
    console.log(`Results Deleted: ${result.deletedCount} `);
  
    if (result.deletedCount > 0) {
      res.status(204).send();
      console.log('The info was successfully deleted!');
    } else {
      res.status(404).json('The Delete has failed.');
    }
  };

  const updateMovie = async (req, res) => {
  const userIdString = new ObjectId(req.params.id);
  const movie = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        rating: req.body.rating ,
        plot: req.body.plot,
        length: req.body.length
      };

  const result = await mongodb
    .getDb()
    .db('movies')
    .collection('movie')
    .updateOne({ _id: userIdString }, { $set: movie });

  if (result.acknowledged) {
    res.status(204).send();
    console.log('The info was successfully updated!');
  } else {
    res.status(404).json('The Update has failed.');
  }
};

module.exports = {getAllMovies, getMovieByID, postNewMovie, deleteMovie, updateMovie};