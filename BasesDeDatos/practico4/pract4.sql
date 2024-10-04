USE world;
--1

SELECT city.Name AS "City", country.Name AS "Country"
FROM city
    INNER JOIN country ON city.CountryCode = country.Code
WHERE
    country.Population < 10000;

--2
SELECT city.Name
FROM city
WHERE
    city.Population > (
        SELECT AVG(city.Population)
        FROM city
    );

--3
SELECT ci.Name
FROM (
        SELECT city.Name, city.Population
        FROM city
            INNER JOIN country ON city.CountryCode = country.Code
        WHERE
            country.Continent <> 'Asia'
    ) AS ci
WHERE
    ci.Population >= SOME (
        SELECT country.Population
        FROM country
        WHERE
            country.Continent = 'Asia'
    );

--4
SELECT country.Name, cl1.`Language`
FROM country
    INNER JOIN countrylanguage cl1 ON country.Code = cl1.CountryCode
WHERE
    cl1.IsOfficial = 'F'
    AND cl1.Percentage > ALL (
        SELECT cl2.Percentage
        FROM countrylanguage cl2
        WHERE
            cl2.CountryCode = country.Code
            AND cl2.IsOfficial = 'T'
    );

--5
--(forma sin subquery)
SELECT DISTINCT
    country.Region
FROM country
    INNER JOIN city ON city.CountryCode = country.Code
WHERE
    country.SurfaceArea < 1000
    AND city.Population > 100000;

--(forma con subquery)
SELECT DISTINCT
    country.Region
FROM country
    INNER JOIN city ON city.CountryCode = country.Code
WHERE
    country.SurfaceArea < 1000
    AND 100000 < SOME (
        SELECT city.Population
        FROM city
        WHERE
            city.CountryCode = country.Code
    );

--6
--primer forma
SELECT country.Name, city.Population
FROM country
    INNER JOIN city ON city.CountryCode = country.Code
WHERE
    city.Population >= ALL (
        SELECT city.Population
        FROM city
        WHERE
            city.CountryCode = country.Code
    );

--segunda forma
SELECT country.Name, MAX(city.Population) AS "Population"
FROM country
    INNER JOIN city ON city.CountryCode = country.Code
GROUP BY
    country.Name;

--7
SELECT country.Name, cl1.`Language`
FROM country
    INNER JOIN countrylanguage cl1 ON country.Code = cl1.CountryCode
WHERE
    cl1.IsOfficial = 'F'
    AND cl1.Percentage > (
        SELECT SUM(cl2.Percentage)
        FROM countrylanguage cl2
        WHERE
            cl2.CountryCode = country.Code
            AND cl2.IsOfficial = 'T'
    );

--8
SELECT country.Continent, SUM(country.Population) AS "Poblacion"
FROM country
GROUP BY
    country.Continent
ORDER BY Poblacion DESC;

--9
SELECT country.Continent, AVG(country.LifeExpectancy) AS LifeExpec
FROM country
GROUP BY
    country.Continent
HAVING
    LifeExpec > 40
    AND LifeExpec < 70;

--10
SELECT country.Continent, MAX(country.Population) AS "MAXIMO", MIN(country.Population) AS "MINIMO", AVG(country.Population) AS "PROMEDIO", SUM(country.Population) AS "TOTAL"
FROM country
GROUP BY
    country.Continent;