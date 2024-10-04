SELECT Name, Region FROM country ORDER BY Name ASC;

SELECT Name, Population
FROM city
ORDER BY Population DESC
LIMIT 10;

SELECT Name, Region, SurfaceArea, GovernmentForm
FROM country
ORDER BY SurfaceArea ASC
LIMIT 10;

SELECT Name
FROM country
WHERE IndepYear IS NULL;

SELECT `Language`, Percentage
FROM countrylanguage
WHERE IsOfficial = "T";

