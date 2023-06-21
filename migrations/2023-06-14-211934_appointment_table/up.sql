-- Your SQL goes here
CREATE TABLE appointments (
    id bigserial primary key,
    user_id bigint,
    provider_id bigint,
    day date,
    start_hour integer,
    start_minute integer,
    duration varchar(255) not null,
    kind varchar(255) not null,
    price real,
    paid boolean,
    alt double precision,
    lng double precision
);