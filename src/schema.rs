// @generated automatically by Diesel CLI.

diesel::table! {
    appointments (id) {
        id -> Int8,
        user_id -> Nullable<Int8>,
        provider_id -> Nullable<Int8>,
        day -> Nullable<Date>,
        start_hour -> Nullable<Int4>,
        start_minute -> Nullable<Int4>,
        #[max_length = 255]
        duration -> Varchar,
        #[max_length = 255]
        kind -> Varchar,
        price -> Nullable<Float4>,
        paid -> Nullable<Bool>,
        alt -> Nullable<Float8>,
        lng -> Nullable<Float8>,
    }
}

diesel::table! {
    locations (id) {
        id -> Int8,
        user_id -> Nullable<Int8>,
        #[max_length = 255]
        description -> Varchar,
        alt -> Nullable<Float8>,
        lng -> Nullable<Float8>,
    }
}

diesel::table! {
    messages (id) {
        id -> Int8,
        user_id -> Nullable<Int8>,
        provider_id -> Nullable<Int8>,
        created -> Nullable<Int8>,
        #[max_length = 255]
        content -> Varchar,
        is_provider -> Nullable<Bool>,
    }
}

diesel::table! {
    providers (id) {
        id -> Int8,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 255]
        surname -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 255]
        password -> Varchar,
        #[max_length = 255]
        phone -> Nullable<Varchar>,
    }
}

diesel::table! {
    users (id) {
        id -> Int8,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 255]
        surname -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 255]
        password -> Varchar,
        #[max_length = 255]
        phone -> Nullable<Varchar>,
        #[max_length = 255]
        description -> Nullable<Varchar>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    appointments,
    locations,
    messages,
    providers,
    users,
);
