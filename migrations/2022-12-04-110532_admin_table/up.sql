-- Your SQL goes here
create table admins (
    id serial primary key,
    name varchar(255) not null,
    surname varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);