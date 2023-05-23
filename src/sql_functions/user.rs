use std::time::{SystemTime, UNIX_EPOCH};

use crate::components::appointment::Appointment;
use crate::components::location::{self, Location};
use crate::components::message::Message;
use crate::components::shared_functions::{create_cookies, Logs};
use crate::components::user::User;
use crate::dtos::appointment_location::AppointmentLocation;
use crate::dtos::user_location::UserLocation;
use rocket::http::CookieJar;
use rocket::serde::json::Json;
use rocket_db_pools::sqlx::{self, Row};
use rocket_db_pools::Connection;

pub async fn user_chat_info(mut db: Connection<Logs>, user_id: i64) -> Json<Vec<Message>> {
    let mut messages: Vec<Message> = Vec::new();

    let query = sqlx::query(r#"SELECT * FROM messages WHERE user_id = $1"#)
        .bind(user_id)
        .fetch_all(&mut *db)
        .await
        .unwrap();

    for row in query {
        let message = Message::new(
            row.get("id"),
            Some(user_id),
            row.get("admin_id"),
            row.get("created"),
            row.get("content"),
            row.get("is_admin"),
        );

        messages.push(message);
    }

    return Json(messages);
}

pub async fn user_payments_info(mut db: Connection<Logs>, user_id: i64) -> Json<Vec<Appointment>> {
    let mut appointments: Vec<Appointment> = Vec::new();

    let query = sqlx::query(r#"SELECT id, CAST(day AS VARCHAR), start_hour, start_minute, duration, price, kind, paid  FROM appointments WHERE user_id = $1"#)
                .bind(user_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in query {
        let appointment = Appointment::new(
            row.get("id"),
            Some(user_id),
            row.get("day"),
            row.get("start_hour"),
            row.get("start_minute"),
            row.get("duration"),
            row.get("kind"),
            row.get("price"),
            row.get("paid"),
        );

        appointments.push(appointment);
    }

    return Json(appointments);
}

pub async fn schedule_appointments(
    mut db: Connection<Logs>,
    user_id: i64,
) -> Json<Vec<AppointmentLocation>> {
    let mut appointments: Vec<AppointmentLocation> = Vec::new();

    let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, locations.id, locations.description, locations.user_id, locations.alt, locations.lng FROM appointments JOIN locations ON appointments.user_id = locations.user_id WHERE appointments.day > CURRENT_DATE;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in query {
        let appointment = AppointmentLocation::new(
            row.get("appointment_id"),
            user_id,
            row.get("day"),
            row.get("start_hour"),
            row.get("start_minute"),
            row.get("duration"),
            String::new(),
            0.0,
            false,
            String::new(),
            row.get("alt"),
            row.get("lng"),
        );

        appointments.push(appointment);
    }
    return Json(appointments);
}

pub async fn user_location(mut db: Connection<Logs>, user_id: i64) -> Json<Location> {
    let location_query =
        sqlx::query(r#"SELECT id, alt, lng, description FROM locations WHERE user_id = $1;"#)
            .bind(user_id)
            .fetch_one(&mut *db)
            .await
            .unwrap();

    let location = Location::new(
        location_query.get("id"),
        Some(user_id),
        location_query.get("alt"),
        location_query.get("lng"),
        location_query.get("description"),
    );

    return Json(location);
}

//Get users info with location
pub async fn user_location_info(mut db: Connection<Logs>, user_id: i64) -> UserLocation {
    let user_query =
        sqlx::query(r#"SELECT locations.id AS id, users.name, users.surname, users.email, users.phone, locations.description, locations.alt, locations.lng FROM users JOIN locations ON users.id = locations.user_id  WHERE users.id = $1;"#)
            .bind(user_id)
            .fetch_one(&mut *db)
            .await
            .unwrap();

    let user: UserLocation = UserLocation::new(
        user_id,
        user_query.get("name"),
        user_query.get("surname"),
        user_query.get("phone"),
        user_query.get("email"),
        user_query.get("description"),
        user_query.get("alt"),
        user_query.get("lng"),
    );
    println!("{:?}", user);
    return user;
}

pub async fn location_add(mut db: Connection<Logs>, user_id: i64, location: Location) -> bool {
    let query = rocket_db_pools::sqlx::query(
        r#"INSERT INTO locations (description, alt, lng, user_id) VALUES ($1, $2, $3, $4);"#,
    )
    .bind(location.get_description())
    .bind(location.get_alt())
    .bind(location.get_lng())
    .bind(user_id)
    .execute(&mut *db)
    .await;

    match query {
        Ok(_data) => return true,
        Err(_err) => return false,
    }
}

pub async fn user_add(user: User, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> bool {
    let insert_user = sqlx::query(r#"DO $do$ BEGIN IF NOT EXISTS (SELECT id FROM users WHERE email = $1) THEN INSERT INTO users (name, surname, phone, email, password) VALUES ($1, $2, $3, $4, $5); END IF; END $do$"#)
    .bind(user.get_email())
    .bind(user.get_name())
    .bind(user.get_surname())
    .bind(user.get_phone())
    .bind(user.get_email())
    .bind(user.get_password())
    .execute(&mut *db)
    .await;

    if (insert_user.is_err()) {
        return false;
    }

    create_cookies(
        user.get_id().clone(),
        user.get_name().clone(),
        user.get_surname().clone(),
        user.get_email().clone(),
        cookies,
    );
    return true;
}

pub async fn location_update(location: Location, user_id: i64, mut db: Connection<Logs>) -> bool {
    let update_location_query = rocket_db_pools::sqlx::query(
        r#"UPDATE locations SET description = $1, alt = $2, lng = $3 WHERE user_id = $4;"#,
    )
    .bind(location.get_description())
    .bind(location.get_alt())
    .bind(location.get_lng())
    .bind(user_id)
    .execute(&mut *db)
    .await;

    return update_location_query.is_ok();
}

pub async fn message_add(message: Message, mut db: Connection<Logs>, user_id: i64) -> bool {
    let created = i64::try_from(
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_secs(),
    )
    .unwrap();

    let add_message_query = sqlx::query(r#"INSERT INTO messages (user_id, admin_id, created, content, is_admin) VALUES ($1, 1, $2, $3, false);"#)
                .bind(user_id)
                .bind(created)
                .bind(message.get_content())
                .fetch_one(&mut *db)
                .await;

    return add_message_query.is_ok();
}

pub async fn user_login(mut db: Connection<Logs>, email: String, password: String) -> bool {
    let existing_users =
        sqlx::query(r#"SELECT COUNT(*) AS count FROM users WHERE email= $1 AND password = $2;"#)
            .bind(email)
            .bind(password)
            .fetch_one(&mut *db)
            .await;

    let count: i64 = existing_users.unwrap().get("count");

    return count > 0;
}

pub async fn check_cookies(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> bool {
    let existing_users = sqlx::query(
        r#"SELECT COUNT(*) AS count FROM users WHERE id=$1 AND email= $1 AND password = $2;"#,
    )
    .bind(cookies.get_private("id").unwrap().value())
    .bind(cookies.get_private("email").unwrap().value())
    .bind(cookies.get_private("password").unwrap().value())
    .fetch_one(&mut *db)
    .await;

    let count: i64 = existing_users.unwrap().get("count");

    return count > 0;
}
