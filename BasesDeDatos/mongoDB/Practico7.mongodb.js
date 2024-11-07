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
      "imdb.rating": { $type: "double" }, 
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

//  db.movies.find( {  year: { $gte: 1990, $lt: 2000 }, "imdb.rating": { $type: "double" },   },    { title: 1,   year: 1,  cast: 1,   directors: 1,  imdb: 1  }  ) .sort({ "imdb.rating": -1 }).limit(10).pretty();