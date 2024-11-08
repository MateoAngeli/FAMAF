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

//
