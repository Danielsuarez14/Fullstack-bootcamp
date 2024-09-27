SELECT name, title, publication_year FROM books
INNER JOIN authors 
ON id = id_author
WHERE id_book = 1;

INSERT INTO books (id_author, title, publication_year) VALUES (2, 'The Magician`s Nephew', 1995);
INSERT INTO authors (name) VALUES('Miguel de Cervantes')