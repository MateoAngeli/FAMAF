SELECT city.Name, country.Name AS "Country", country.Region, country.GovernmentForm
FROM country
INNER JOIN city ON city.CountryCode = country.Code
ORDER BY  city.Population DESC
LIMIT 10;

SELECT country.Name AS "Country", city.Name AS "Capital"
FROM country
INNER JOIN city ON city.ID = country.Capital
ORDER BY country.Population ASC
LIMIT 10; 

SELECT country.Name, country.Continent, countrylanguage.`Language`
FROM country
INNER JOIN countrylanguage ON countrylanguage.CountryCode = country.Code
WHERE countrylanguage.IsOfficial = "T"
ORDER BY country.Name;

SELECT country.Name AS "Country", city.Name AS "Capital"
FROM country
INNER JOIN city ON city.ID = country.Capital
ORDER BY country.SurfaceArea DESC
LIMIT 20; 

SELECT city.Name, countrylanguage.`Language`, countrylanguage.Percentage
FROM city
INNER JOIN countrylanguage ON countrylanguage.CountryCode = city.CountryCode
WHERE countrylanguage.IsOfficial = "T"
ORDER BY city.Population;

(
SELECT country.Name, country.Population
FROM country
ORDER BY country.Population DESC
LIMIT 10
)
UNION
(
SELECT country.Name, country.Population
FROM country
WHERE country.Population > 99
ORDER BY country.Population ASC
LIMIT 10
);








