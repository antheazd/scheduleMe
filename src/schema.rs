// @generated automatically by Diesel CLI.

diesel::table! {
    appointments (id) {
        id -> Int8,
        user_id -> Nullable<Int8>,
        day -> Nullable<Date>,
        start_hour -> Nullable<Int4>,
        start_minute -> Nullable<Int4>,
        duration -> Varchar,
        price -> Nullable<Float4>,
    }
}

diesel::table! {
    locations (id) {
        id -> Int8,
        user_id -> Nullable<Int8>,
        description -> Varchar,
        alt -> Nullable<Float8>,
        lng -> Nullable<Float8>,
    }
}

diesel::table! {
    users (id) {
        id -> Int8,
        name -> Varchar,
        surname -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    appointments,
    locations,
    users,
);
