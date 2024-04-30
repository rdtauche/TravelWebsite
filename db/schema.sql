-- DROP DATABASE
DROP DATABASE IF EXISTS travel_db;

-- CREATE DATABASE
CREATE DATABASE travel_db;



CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


INSERT INTO users (name, email, password) VALUES
('John Doe', 'john@example.com', 'password123'),
('Jane Smith', 'jane@example.com', 'securepassword'),
('Alice Johnson', 'alice@example.com', 'p@ssw0rd');


