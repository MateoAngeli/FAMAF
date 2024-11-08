// Parcial 2 BdD 2024 FAMAF

// Ejercicio 1

use("university");

db.grades
  .find(
    {
      $and: [
        // 1
        {
          $or: [
            {
              scores: {
                $elemMatch: {
                  type: "exam",
                  score: { $gte: 80 },
                },
              },
            },
            {
              scores: {
                $elemMatch: {
                  type: "quiz",
                  score: { $gte: 90 },
                },
              },
            },
          ],
        },
        // 2
        {
          // Negacion de que haya un elemento simultaneamente homework y <60
          scores: {
            $not: {
              $elemMatch: {
                type: "homework",
                score: { $lt: 60 },
              },
            },
          },
        },
      ],
    },
    {
      _id: 0,
      student_id: 1,
      scores: 1,
      class_id: 1,
    }
  )
  .sort({
    class_id: -1,
    student_id: 1,
  });

// Ejercicio 2

use("university");

db.grades.aggregate([
  {
    $match: { class_id: { $in: [20, 220, 420] } },
  },
  {
    $unwind: "$scores",
  },
  {
    $group: {
      _id: { student: "$student_id", class: "$class_id" },
      maxScore: {
        $max: "$scores.score",
      },
      minScore: {
        $min: "$scores.score",
      },
      avgScore: {
        $avg: "$scores.score",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maxScore: 1,
      minScore: 1,
      avgScore: 1,
      student_id: "$_id.student",
      class_id: "$_id.class",
    },
  },
  {
    $sort: {
      student_id: 1,
      class_id: 1,
    },
  },
]);

use("university");

db.grades.find({
  student_id: { $eq: 35 },
  class_id: { $eq: 420 },
});

// Ejercicio 3

use("university");

db.grades.aggregate([
  {
    $unwind: "$scores",
  },
  {
    $group: {
      _id: "$class_id",
      maxExam: {
        $max: {
          $cond: [{ $eq: ["$scores.type", "exam"] }, "$scores.score", null],
        },
      },
      maxQuiz: {
        $max: {
          $cond: [{ $eq: ["$scores.type", "quiz"] }, "$scores.score", null],
        },
      },
    },
  },
  {
    $project: {
      _id: 1,
      maxExam: 1,
      maxQuiz: 1,
    },
  },
  {
    $sort: { _id: 1 },
  },
]);

// Ejercicio 4

use("university");

db.createView("top10students", "grades", [
  {
    $unwind: "$scores",
  },
  {
    $group: {
      _id: "$student_id",
      avgScore: { $avg: "$scores.score" },
    },
  },
  {
    $sort: {
      avgScore: -1,
    },
  },
  {
    $limit: 10,
  },
]);

db.top10students.find();

// Ejercicio 5

use("university");

db.grades.updateMany({ class_id: { $eq: 339 } }, [
  {
    $addFields: {
      score_avg: { $avg: "$scores.score" },
      letter: {
        $switch: {
          branches: [
            // Originalmente puse "$score_avg" para no computarlo tantas veces, pero habia que correr el update 2 veces
            {
              case: {
                $and: [
                  { $lt: [{ $avg: "$scores.score" }, 60] },
                  { $gte: [{ $avg: "$scores.score" }, 0] },
                ],
              },
              then: "NA",
            },
            { case: { $lt: [{ $avg: "$scores.score" }, 80] }, then: "A" },
            { case: { $lt: [{ $avg: "$scores.score" }, 100] }, then: "P" },
          ],
          default: "ERROR",
        },
      },
    },
  },
]);

use("university");

db.grades.find({
  class_id: 339,
});
