--1

--CREATE DATABASE IF NOT EXISTS world;
--USE world;

--2

CREATE TABLE IF NOT EXISTS country (
    Code CHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    Continent VARCHAR(50),
    Region VARCHAR(50),
    SurfaceArea INT,
    IndepYear INT,
    Population INT,
    LifeExpectancy INT,
    GNP INT NOT NULL,
    GNPOLd INT,
    LocalName VARCHAR(50),
    GovernmentForm VARCHAR(50),
    HeadOfState VARCHAR(50),
    Capital INT,
    Code2 CHAR(10)
);

CREATE TABLE IF NOT EXISTS city (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50),
    CountryCode CHAR(10),
    District VARCHAR(50),
    Population INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

CREATE TABLE IF NOT EXISTS countrylanguage (
    CountryCode CHAR(10),
    `Language` VARCHAR(50),
    IsOfficial VARCHAR(50),
    Percentage INT,
    PRIMARY KEY (CountryCode, `Language`),
    FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

CREATE TABLE IF NOT EXISTS continentes (
    Name VARCHAR(50),
    Area INT,
    MassPercent FLOAT,
    BiggestCity VARCHAR(50),
    PRIMARY KEY (Name)
);

INSERT INTO
    continentes
VALUES (
        'Africa',
        30370000,
        20.4,
        'Cairo, Egypt'
    );

INSERT INTO
    continentes
VALUES (
        'Antarctica',
        14000000,
        9.2,
        'McMurdo Station'
    );

INSERT INTO
    continentes
VALUES (
        'Asia',
        44579000,
        29.5,
        'Mumbai, India'
    );

INSERT INTO
    continentes
VALUES (
        'Europe',
        10180000,
        6.8,
        'Instanbul, Turquia'
    );

INSERT INTO
    continentes
VALUES (
        'North America',
        24709000,
        16.5,
        'Ciudad de México, Mexico'
    );

INSERT INTO
    continentes
VALUES (
        'Oceania',
        8600000,
        5.9,
        'Sydney, Australia'
    );

INSERT INTO
    continentes
VALUES (
        'South America',
        17840000,
        12.0,
        'São Paulo, Brazil'
    );

--cambios de la fila continent:
ALTER TABLE country
ADD FOREIGN KEY (Continent) REFERENCES continentes (Name);