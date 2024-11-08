//Practico 7 BdD 2024 FAMAF

// Ejercicio 1 

use ("mflix");

db.user.insertMany([
    { name: "mateo", email: "mateoangeli241@gmail.com", password:"hhfsa" },
    { name:"no se", email: "nose@gmail.com", password:"fsafsa" },
    { name:"guille", email: "guillezinny@gmail.com", password:"secretariocov" },
    { name:"more", email: "moremoyano@gmail.com", password:"aguanteelmisio" },
    { name:"juanchi", email: "juanchinellato@gmail.com", password:"volandoooo" }
])

db.comments.insertMany([
  { 
    name: "mateo", 
    email: "mateoangeli241@gmail.com", 
    movie_id: ObjectId('573a1390f29313caabcd418c'), 
    text: "Buenarda man", 
    date: ISODate('2012-03-26T23:20:16.000Z') 
  },
  { 
    name: "no se", 
    email: "nose@gmail.com", 
    movie_id: ObjectId('573a1390f29313caabcd418c'), 
    text: "no se", 
    date: ISODate('2012-03-26T23:20:16.000Z') 
  },
  { 
    name: "guille", 
    email: "guillezinny@gmail.com", 
    movie_id: ObjectId('573a1390f29313caabcd418c'), 
    text: "Tengo que imprimir las cosas del eiv!!", 
    date: ISODate('2012-03-26T23:20:16.000Z') 
  },
  { 
    name: "more", 
    email: "moremoyano@gmail.com", 
    movie_id: ObjectId('573a1390f29313caabcd418c'), 
    text: "comprenme rosarios", 
    date: ISODate('2012-03-26T23:20:16.000Z') 
  },
  { 
    name: "juanchi", 
    email: "juanchinellato@gmail.com", 
    movie_id: ObjectId('573a1390f29313caabcd418c'), 
    text: "volando mi loco", 
    date: ISODate('2012-03-26T23:20:16.000Z') 
  }
]);


// Ejercicio 2

use ("mflix")

db.movies
.find( 
    { 
      year: { $gte: 1990, $lt: 2000 },
      "imdb.rating": { $type: "double" },   // Chequea que el tipo del campo sea double (evita vacios)
    },
    { 
      title: 1, 
      year: 1, 
      cast: 1, 
      directors: 1, 
      imdb: 1 
    } 
  )
  .sort({ "imdb.rating": -1 })
  .limit(10)
  .pretty();


  // Ejercicio 3

  use ("mflix")

  db.comments.find(
    {
      date: 
      { 
        $gte: new Date("2014-01-01"),
        $lt: new Date("2017-01-01") 
      } ,
      movie_id: { $eq: ObjectId("573a1399f29313caabcee886") }
    },
    {
      name: 1,
      email:1,
      text:1,
      date:1,
    }
  )
  .sort({date: 1})
  .pretty();

  db.comments.find(
    {
      date: 
      { 
        $gte: new Date("2014-01-01"),
        $lt: new Date("2017-01-01") 
      } ,
      movie_id: { $eq: ObjectId("573a1399f29313caabcee886") }
    },
    {
      name: 1,
      email:1,
      text:1,
      date:1,
    }
  )
  .sort({date: 1})
  .count();



  // Ejercicio 4

  use ("mflix")

  db.comments
  .find( 
    { email: { $eq: "patricia_good@fakegmail.com" } },
    {
      name: 1,
      movie_id: 1,
      text: 1,
      date:1,
    }
  )
  .sort({date: -1})
  .limit(3)
  .pretty();


// Ejercicio 5

use ("mflix")

db.movies.find(
  {
    genres: { $in: ["Drama", "Action"]},
    languages: { $size: 1},
    $or: [ {"imdb.rating": { $gt: 9 }}, { runtime: {$gte: 180} } ]    
  },
  {
    title: 1,
    languages: 1,
    genres: 1,
    released: 1,
    "imdb.votes": 1,
  }
)
.sort({ released: -1 , "imdb.votes": -1})
.pretty();


// Ejercicio 6

use ("mflix")

db.theaters.find(
  {
    "location.address.state": { $in: ["CA", "NY", "TX"] },
    "location.address.city": { $regex: /^F/, $options: 'i' } 
  },
  {
    _id: 1,
    "location.address.state": 1,
    "location.address.city": 1,
    "location.geo.coordinates": 1,
  }
)
.sort({estate:1, city:1})
.pretty();


// Ejercicio 7

use ("mflix")

db.comments.updateOne(
  {_id: ObjectId("5b72236520a3277c015b3b73")},
  { $set: 
    {
      text: "mi mejor comentario",
      date: new Date()
    }}
);


// Ejercicio 8

use ("mflix")

db.users.updateOne(
  {email:"joel.macdonel@fakegmail.com"},
  { $set : { password: "some password"}},
  { upsert: true }
);


// Ejercicio 9

use ("mflix")

db.comments.deleteMany(
  {
    email: "victor_patel@fakegmail.com",
    date: {$gte: new Date("1980-01-01"), $lt: new Date("1981-01-01")}
  }
);


// Ejercicio 10

use ("restaurantdb")

db.restaurants.find(
  { grades: 
    { $elemMatach: 
      { 
        score: { $gte: 70, $lte: 90 }, 
        date: { $gte: new Date ("2014-01-01"), $lt: new Date("2016-01-01") } 
      } 
    } 
  },
  { 
    restaurant_id: 1,
    grades: 1
  }
);


// Ejercicio 11

use ("restaurantdb")

db.restaurants
.updateOne(
  { restaurant_id: "50018608"},
  { $push: 
    { 
      grades: { $each: 
        [{
            "date" : ISODate("2019-10-10T00:00:00Z"),
            "grade" : "A",
            "score" : 18
          },
          {
            "date" : ISODate("2020-02-25T00:00:00Z"),
            "grade" : "A",
            "score" : 21
          }]
       } 
    } 
  }
);