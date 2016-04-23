DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  description varchar(200)  NOT NULL,
  photo varchar(120) NOT NULL DEFAULT '../../assets/images/questionMark.jpg',
  price int NOT NULL,
  availability boolean,
  PRIMARY KEY (ID)
);

CREATE TABLE address (
  id int not NULL AUTO_INCREMENT,
  street varchar(50),
  number int,
  city varchar(50),
  postalcode int NOT NULL,
  state varchar(30),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  googleid varchar(30) NOT NULL,
  name  varchar(50)   NOT NULL,
  familyname  varchar(50)   NOT NULL,
  givenname  varchar(50)   NOT NULL,
  email  varchar(50)   NOT NULL,
  address_id int,
  phoneNumber varchar(25),
  birthday  date,
  type  varchar(30) DEFAULT 'customer',
  password  varchar(30),
  cart_Id  int,
  PRIMARY KEY (id),
  FOREIGN KEY (address_id) 
        REFERENCES address(id)
        ON DELETE CASCADE
);

CREATE TABLE user_items (
  id int NOT NULL AUTO_INCREMENT,
  user_Id  int   NOT NULL,
  item_Id  int   NOT NULL,
  inicial_date date,
  end_date date,
  PRIMARY KEY (id),
  FOREIGN KEY (user_Id) 
        REFERENCES users(id),
  FOREIGN KEY (item_Id) 
        REFERENCES items(id)
);

CREATE TABLE items_renting (
  id int NOT NULL AUTO_INCREMENT,
  user_Id  int   NOT NULL,
  item_Id  int   NOT NULL,
  inicial_date date,
  end_date date,
  PRIMARY KEY (id),
  FOREIGN KEY (user_Id) 
        REFERENCES users(id),
  FOREIGN KEY (item_Id) 
        REFERENCES items(id)
);

CREATE TABLE cart (
  id       int   NOT NULL AUTO_INCREMENT,
  user_Id  int   NOT NULL,
  item_Id  int   NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_Id) 
        REFERENCES users(id),
  FOREIGN KEY (item_Id) 
        REFERENCES items(id)
);

alter table users add FOREIGN KEY (cart_Id) REFERENCES cart(id) ON DELETE CASCADE;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  items_Id int NOT NULL,
  users_Id int NOT NULL,
  user_experience varchar(255) NOT NULL DEFAULT '',
  item_rating int(6) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (items_Id) REFERENCES items(id),
  FOREIGN KEY (users_Id) REFERENCES users(id)
);

CREATE TABLE feedback (
  id int NOT NULL AUTO_INCREMENT,
  users_Id_rentee int NOT NULL,
  users_Id_renter int NOT NULL,
  experience varchar(255) NOT NULL DEFAULT '',
  rating int(6) NOT NULL,
  is_rentee boolean NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_Id_rentee) REFERENCES users(id),
  FOREIGN KEY (users_Id_renter) REFERENCES users(id)
);

-- Query for dummy data

-- add items
insert into items (name,description,price, photo) values ('Sony Laptop','This sits well on your lap! You won\'t regret it!', 14, '../../assets/images/1/computer.jpg'), ('Tennis racket and balls','An entire tennis setup to play with a friend!', 15, '../../assets/images/2/tennis.jpg'), ('Phone', 'Older phone, but still good.', 10, '../../assets/images/3/phone.jpg'),('Desktop computer','Simple computer to play your favorite video games on!', 12, '../../assets/images/4/computer.jpg'), ('Wrist watch', 'A nice watch to tell time with!', 9, '../../assets/images/1/watch.jpg');

-- add addresses
insert into address (street, number, city, postalcode) values ('Market St', 123, 'San Francisco',94102),('Market St', 12123, 'San Francisco',94102),('Montgomery St', 123, 'San Francisco',94101),('Kearny St', 246, 'San Francisco',94108),('Battery st',1015,'San Francisco',94111);

-- add user Allice
insert into users (name,email,address_id,phoneNumber,birthday,type,password, googleid, givenname, familyname) values ('Allice','allice@allice.com', (SELECT id FROM address WHERE postalcode=94111) ,48343432, '2015-6-9' ,'admin','password', 1, 'John', 'Doe');

-- add user John
insert into users (name,email,address_id,phoneNumber,birthday,type,password, googleid, givenname, familyname) values ('John','john@john.com', (SELECT id FROM address WHERE postalcode=94101) ,48343432, '2015-6-9' ,'admin','password', 2, 'John', 'Doe');

-- add user Foo
insert into users (name,email,address_id,phoneNumber,birthday,type,password, googleid, givenname, familyname) values ('Foo','john@john.com', (SELECT id FROM address WHERE postalcode=94102 and number = 123) ,48343432, '2015-6-9' ,'admin','password', 3, 'John', 'Doe');

-- add user Bob
insert into users (name,email,address_id,phoneNumber,birthday,password, googleid, givenname, familyname) values ('Bob','bob@bob.com', (SELECT id FROM address WHERE postalcode=94108) ,48343432, '2015-6-9','password', 4, 'John', 'Doe');

-- add user Ann
insert into users (name,email,address_id,phoneNumber,birthday,password, googleid, givenname, familyname) values ('Ann','ann@ann.com', (SELECT id FROM address WHERE postalcode=94102 and number = 12123) ,48343432, '2015-6-9','password', 5, 'John', 'Doe');

-- add item_user relationship
INSERT INTO user_items (user_Id, item_Id) VALUES (1, 1), (2, 2), (3, 3), (4, 4), (1, 5);

-- add reviews
INSERT INTO reviews (items_Id, users_Id, user_experience, item_rating) VALUES (1, 1, 'good', 4), (1, 2, 'fine', 3), (4, 3, 'bad', 0), (5, 5, 'the worst', 1), (2, 3, 'eh', 5), (3, 1, 'I just don\'t understand', 3);

-- add feedback
INSERT INTO feedback (users_Id_rentee, users_Id_renter, experience, rating, is_rentee) VALUES (1, 2, 'They were mean!', 0, 0), (2, 1, 'They were whinny!', 0, 1), (4, 3, 'Cool dude!', 5, 1), (3, 4, 'They were self-centered!', 2, 0), (3, 2, 'Good!', 3, 1), (1, 4, 'They were very mean!', 1, 0), (4, 1, 'Nicee!', 4, 1);

-- Query to retrieve items info.
-- insert into users (name,email,address_id,phoneNumber,birthday,type,password,item_Id) values ('John','john@john.com', (SELECT id FROM address WHERE postalcode=94101) ,48343432, '2015-6-9' ,'admin','password', (SELECT id FROM items WHERE name='laptop'));
-- select i.id,i.name,i.description,i.price,i.availability
-- from items i
-- inner join users s on i.id = s.item_Id
-- inner join address a on a.id  = s.address_id and a.postalcode = 94111;


-- select i.id,i.name,i.description,i.price,i.availability, s.name from items i inner join users s on i.id = s.item_Id inner join address a on a.id  = s.address_id and a.postalcode = 94111;

