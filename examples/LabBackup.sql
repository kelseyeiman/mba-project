CREATE table samples (
sample_id INT AUTO_INCREMENT PRIMARY KEY,
sample_description VARCHAR(30),
lot_number VARCHAR(30),
date_received DATE,
due_date DATE,
spec VARCHAR(30),
serving VARCHAR(30)
);

CREATE table tests (
test_id INT AUTO_INCREMENT PRIMARY KEY,
test_description VARCHAR(30),
estimated_time INT
);

Create table required_tests (
sample_id INT NOT NULL,
test_id INT NOT NULL,
FOREIGN KEY (sample_id) REFERENCES samples (sample_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (test_id) REFERENCES tests (test_id) ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (sample_id, test_id)
);

INSERT INTO samples (sample_description, lot_number, date_received, due_date, spec, serving) VALUES( "MicroLife Renew", "IN1871111", "2018-10-03", "2018-10-28", "Recor", "2");
INSERT INTO samples (sample_description, lot_number, date_received, due_date, spec, serving) VALUES( "Energy Shot", "EEE7777", "2018-10-10", "2018-11-01", "Recor", "2");
INSERT INTO samples (sample_description, lot_number, date_received, due_date, spec, serving) VALUES( "Trim/Burn", "8888855", "2018-10-05", "2018-10-20", "NLT", "mg/Se 100");

INSERT INTO tests (test_description, estimated_time) VALUES( "Acidity", 15);
INSERT INTO tests (test_description, estimated_time) VALUES( "Caffeine", 45);
INSERT INTO tests (test_description, estimated_time) VALUES( "Fat", 180);

INSERT INTO required_tests (sample_id, test_id) VALUES (2, 1);
INSERT INTO required_tests (sample_id, test_id) VALUES (2, 3);
INSERT INTO required_tests (sample_id, test_id) VALUES (3, 1);
INSERT INTO required_tests (sample_id, test_id) VALUES (1, 1);

SELECT s.sample_description, t.test_description, t.estimated_time
FROM samples s
INNER JOIN required_tests rt
ON s.sample_id = rt.sample_id
INNER JOIN tests t
ON t.test_id = rt.test_id;


SELECT s.sample_id, s.sample_description, t.test_description, t.estimated_time
FROM samples s
INNER JOIN required_tests rt
ON s.sample_id = rt.sample_id
INNER JOIN tests t
ON t.test_id = rt.test_id;



SELECT * FROM samples;
SELECT * FROM tests;
SELECT * FROM required_tests;

