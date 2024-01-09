# project-work-englishapp

# Table creation, populating tables

CREATE TABLE Colors(
id INT PRIMARY KEY AUTO_INCREMENT,
eng_color VARCHAR(255) NOT NULL,
fi_color VARCHAR(255) NOT NULL
);

INSERT INTO Colors (eng_color, fi_color) VALUES
('red', 'punainen'),
('blue', 'sininen'),
('pink', 'pinkki'),
('white', 'valkoinen'),
('black', 'musta'),
('yellow', 'keltainen'),
('violet', 'violetti'),
('green', 'vihreä');

SELECT * FROM Animals;
SELECT * FROM Colors;

