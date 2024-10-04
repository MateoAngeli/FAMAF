-- Active: 1728043081635@@127.0.0.1@3306@sakila

--1
CREATE TABLE IF NOT EXISTS directors (
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    NumPeliculas INT
);

--2
INSERT INTO
    directors (
        Nombre,
        Apellido,
        NumPeliculas
    )
SELECT a.first_name, a.last_name, COUNT(fa.film_id) as total
FROM actor a
    INNER JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY
    a.actor_id
ORDER BY total DESC
LIMIT 5;

--3
ALTER TABLE customer
ADD premium_customer ENUM('T', 'F') NOT NULL DEFAULT 'F';

--4
UPDATE customer
SET
    premium_customer = 'T'
WHERE
    customer_id IN (
        SELECT customer_id
        FROM (
                SELECT p.customer_id, SUM(p.amount) as total
                FROM payment p
                GROUP BY
                    p.customer_id
                ORDER BY total DESC
                LIMIT 10
            ) as subquery
    );

--5
SELECT film.rating, COUNT(film.film_id) as total
FROM film
GROUP BY
    film.rating
ORDER BY total DESC;

--6
SELECT MIN(payment.payment_Date) as "Fecha de primer pago", MAX(payment.payment_Date) as "Fecha de ultimo pago"
FROM payment;

--7
SELECT MONTHNAME(payment.payment_Date) as Mes, AVG(payment.amount) as "Promedio de pago"
FROM payment
GROUP BY
    Mes;

--8
SELECT a.district, COUNT(r.rental_id) as total
FROM
    address a
    INNER JOIN customer c ON a.address_id = c.address_id
    INNER JOIN rental r ON c.customer_id = r.customer_id
GROUP BY
    a.district
ORDER BY total DESC
LIMIT 10;

--9
ALTER TABLE inventory ADD COLUMN stock INT DEFAULT 5;

--10
CREATE TRIGGER update_stock
AFTER INSERT ON rental
FOR EACH ROW
BEGIN
    UPDATE inventory
    SET
        stock = stock - 1
    WHERE
        inventory.inventory_id = NEW.inventory_id;
END;

--11
CREATE TABLE IF NOT EXISTS fines (
    rental_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (rental_id) REFERENCES rental (rental_id)
);

--12
DELIMITER / /

CREATE PROCEDURE IF NOT EXISTS check_date_and_fine ()
BEGIN 
    INSERT INTO fines (rental_id, amount)
    SELECT rental.rental_id, DATEDIFF(rental.return_date, rental.rental_date) * 1.5 as amount
    FROM rental
    WHERE
        rental.return_date > rental.rental_date + INTERVAL 3 DAYS;
END //

DELIMITER;


--13
CREATE ROLE IF NOT EXISTS 'employee';
GRANT INSERT, UPDATE, DELETE ON sakila.rental TO 'employee';

--14
REVOKE DELETE ON sakila.rental FROM 'employee';

CREATE ROLE 'administrator';
GRANT ALL ON sakila.* TO 'administrator';

--15
CREATE ROLE employee_A;
CREATE ROLE employee_B;

GRANT employee TO employee_A;
GRANT administrator TO employee_B;