CREATE TABLE burgers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    burger_name VARCHAR(35),
    devoured BOOLEAN
);
INSERT INTO burgers (id, burger_name, devoured)
VALUES 
(1,"Avocado",0), 
(2,"Mushroom Swiss", 1), 
(3,"Pizza",0), 
(4,"Double Bacon Cheese", 1),
(5,"McDLT",0),
(6,"Quarter Pounder",0),
(7,"Big Mac",0)