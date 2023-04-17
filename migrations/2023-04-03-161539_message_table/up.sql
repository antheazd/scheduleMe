-- Your SQL goes here
CREATE TABLE messages (
    id bigserial primary key,
    user_id bigint,
    admin_id bigint,
    created bigint,
    content varchar(255) not null,
    is_admin boolean
);