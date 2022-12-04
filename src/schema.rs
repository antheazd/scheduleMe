// @generated automatically by Diesel CLI.

diesel::table! {
    admins (id) {
        id -> Int4,
        name -> Varchar,
        surname -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        name -> Varchar,
        surname -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    admins,
    users,
);
