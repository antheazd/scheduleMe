// @generated automatically by Diesel CLI.

diesel::table! {
    todo (id) {
        id -> Int4,
        name -> Varchar,
        surname -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}
