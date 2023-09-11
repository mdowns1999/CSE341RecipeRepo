const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    movie_id: {
      type:String,
    required: true,
    },
    title: {
      type:String,
    required: true,
    },
    rating: {
      type:String,
    required: true,
    },
    plot: {
      type:String,
    required: true,
    },
    length: {
      type:String,
    required: true,
    },
  },
  {collection: 'movie'}
);  

//const movie = mongoose.model('movie', movieSchema);

const Movie = mongoose.model('movieSchema', movieSchema)
module.exports = Movie;



/* This is creating a new schema for the product model. */
// const productSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);