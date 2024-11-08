// Practico 8 BdD 2024 FAMAF

// Ejercicio 1

use("mflix");

db.theaters.aggregate([
  {
    $group: {
      _id: "$location.address.state",
      amount: { $sum: 1 },
    },
  },
]);

// Ejercicio 2

use("mflix");

db.theaters.aggregate([
  {
    $group: {
      _id: "$location.address.state",
      amount: { $sum: 1 },
    },
  },
  {
    $match: {
      amount: { $gte: 2 },
    },
  },
  {
    $count: "Total: ",
  },
]);

// Ejercicio 3

// Sin pipeline
use("mflix");

db.movies
  .find(
    {
      directors: { $in: ["Louis Lumière"] },
    },
    {
      title: 1,
    }
  )
  .count();

// Con pipeline
use("mflix");

db.movies.aggregate([
  {
    $match: {
      directors: { $in: ["Louis Lumière"] },
    },
  },
  {
    $count: "amount: ",
  },
]);

// Ejercicio 4

// Sin pipeline
use("mflix");

db.movies.find({ year: { $gte: 1950, $lt: 1960 } }, { title: 1 }).count();

// Con pipeline
use("mflix");

db.movies.aggregate([
  { $match: { year: { $gte: 1950, $lt: 1960 } } },
  { $count: "amount: " },
]);

// Ejercicio 5

use("mflix");

db.movies.aggregate([
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: "$genres",
      count: { $count: {} }, // se puede poner count: {$sum: 1}
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $limit: 10,
  },
]);

// Ejercicio 6

use("mflix");

db.comments.aggregate([
  {
    $group: {
      _id: { email: "$email", name: "$name" },
      total_coments: { $count: {} },
    },
  },
  {
    $sort: { total_coments: -1 },
  },
  {
    $limit: 10,
  },
  /*{
    $project: {
      _id: 0,
      name: "$_id.name",
      email: "$_id.email",
      total_coments: 1,
    },
  },*/
]);

//  Ejercicio 7

use("mflix");

db.movies.aggregate([
  {
    $match: {
      year: {
        $gte: 1980,
        $lte: 1989,
      },
      "imdb.rating": { $type: "double" },
    },
  },
  {
    $group: {
      _id: "$year",
      avg_imdb: { $avg: "$imdb.rating" },
      min_imdb: { $min: "$imdb.rating" },
      max_imdb: { $max: "$imdb.rating" },
    },
  },
  {
    $sort: { avg_imdb: -1 },
  },
  {
    $project: {
      _id: 0,
      year: "$_id",
      avg_imdb: 1,
      min_imdb: 1,
      max_imdb: 1,
    },
  },
]);

// Ejercicio 8

use("mflix");

db.movies.aggregate([
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "movie_id",
      as: "cmts",
    },
  },
  {
    $addFields: { comments_count: { $size: "$cmts" } },
  },
  {
    $sort: { comments_count: -1 },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      year: 1,
      comments_count: 1,
    },
  },
  {
    $limit: 10,
  },
]);

// Ejercicio 9

use("mflix");

db.createView("Top5CommentsGenres", "movies", [
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "movie_id",
      as: "cmts",
    },
  },
  {
    $addFields: { comments_count: { $size: "$cmts" } },
  },
  {
    $unwind: "$genres",
  },
  {
    $group: {
      _id: "$genres",
      total_comms: { $sum: "$comments_count" }, // se puede poner count: {$sum: 1}
    },
  },
  {
    $sort: { total_comms: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      total_comms: 1,
    },
  },
]);

db.Top5CommentsGenres.find();

// Ejercicio 10

use("mflix");

db.movies.aggregate([
  {
    $match: {
      directors: { $in: ["Jules Bass"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      movies: { $addToSet: { name: "$title", release: "$year" } },
    },
  },
  {
    $match: {
      "movies.1": { $exists: true },
    },
  },
  {
    $project: {
      _id: 0,
      movies: 1,
      actor: "$_id",
    },
  },
]);

// Ejercicio 11

// Ejercicio 12

// a

use("restaurantdb");

db.restaurants.aggregate([
  {
    $unwind: "$grades",
  },
  {
    $group: {
      _id: { id: "$restaurant_id", name: "$name" },
      max: { $max: "$grades.score" },
      min: { $min: "$grades.score" },
      sum: { $sum: "$grades.score" },
    },
  },
]);

// b

use("restaurantdb");

db.restaurants.aggregate({
  $project: {
    _id: 0,
    restaurant_id: 1,
    name: 1,
    max: { $max: "$grades.score" },
    min: { $min: "$grades.score" },
    sum: { $sum: "$grades.score" },
  },
});

// c

use("restaurantdb");

db.restaurants.aggregate({
  $project: {
    _id: 0,
    restaurant_id: 1,
    name: 1,
    max: { $max: "$grades.score" },
    min: { $min: "$grades.score" },
    sum: {
      $reduce: {
        input: "$grades.score",
        initialValue: 0,
        in: { $add: ["$$value", "$$this"] },
      },
    },
  },
});

// d

use("restaurantdb");

db.restaurants.find(
  {
    "grades.score": { $type: "int" },
  },
  {
    _id: 0,
    restaurant_id: 1,
    name: 1,
    max: { $max: "$grades.score" },
    min: { $min: "$grades.score" },
    sum: { $sum: "$grades.score" },
  }
);

// 13

use("restaurantdb");

db.restaurants.updateMany({}, [
  {
    $set: {
      average_score: { $avg: "$grades.score" },
      grade: {
        $switch: {
          branches: [
            { case: { $lte: ["$average_score", 13] }, then: "A" },
            { case: { $lte: ["$average_score", 27] }, then: "B" },
            { case: { $gte: ["$average_score", 27] }, then: "C" },
          ],
          default: "N/A",
        },
      },
    },
  },
]);

db.restaurants.find();
