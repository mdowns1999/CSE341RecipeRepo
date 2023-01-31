const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const name = async(req, res) => {
    res.json('Hello');
}

const getAllMovies = async(req, res) =>{
    const result = await mongodb.getDb().db('movies').collection('movie').find();

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getMovieByID = async(req, res) => {
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

const postNewMovie = async(req, res) => {
    const movie = {
        movie_id: req.body.movie_id,
        title: req.body.title,
        rating: req.body.rating ,
        plot: req.body.plot,
        length: req.body.length
      };
    
      const result = await mongodb.getDb().db('movies').collection('movie').insertOne(movie);
    
      if (result.acknowledged) {
        res.status(202).json(result);
        console.log('The contact was successfully inserted!');
      } else {
        res.status(500).json('The insert has failed.');
      }
}

module.exports = {getAllMovies, getMovieByID, postNewMovie};