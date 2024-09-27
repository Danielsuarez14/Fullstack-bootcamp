CREATE TABLE bestScore(
    name VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO bestScore (name, score) VALUES ('Pajarito', 0);