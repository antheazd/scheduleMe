-- Your SQL goes here
CREATE TABLE providers (
    id bigserial primary key,
    name varchar(255) not null,
    surname varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    phone varchar(255)
);