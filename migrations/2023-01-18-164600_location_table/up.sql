-- Your SQL goes here
CREATE TABLE locations (
    id bigserial primary key,
    user_id bigint,
    description varchar(255) not null,
    alt double precision,
    lng double precision
);