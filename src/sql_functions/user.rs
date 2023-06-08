use std::time::{SystemTime, UNIX_EPOCH};

use crate::components::appointment::{self, Appointment};
use crate::components::location::Location;
use crate::components::message::Message;
use crate::components::response::Response;
use crate::components::shared_functions::{create_cookies, Logs};
use crate::components::user::User;
use crate::dtos::appointment_location::AppointmentLocation;
use crate::dtos::user_location::UserLocation;
use rocket::http::CookieJar;
use rocket::serde::json::Json;
use rocket_db_pools::sqlx::{self, Row};
use rocket_db_pools::Connection;

#[get("/user_chat", format = "json")]
pub async fn user_chat(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Json<Vec<Message>> {
    let mut messages: Vec<Message> = Vec::new();
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

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

#[get("/user_payments_info", format = "json")]
pub async fn user_payments_info(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<Appointment>> {
    let mut appointments: Vec<Appointment> = Vec::new();
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

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

#[get("/schedule_appointments", format = "json")]
pub async fn schedule_appointments(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<AppointmentLocation>> {
    let mut appointments: Vec<AppointmentLocation> = Vec::new();
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, locations.id, locations.description, locations.user_id, locations.alt, locations.lng FROM appointments JOIN locations ON appointments.user_id = locations.user_id;"#)
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

#[get("/user_location", format = "json")]
pub async fn user_location(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Json<Location> {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let location_query =
        sqlx::query(r#"SELECT id, alt, lng, description FROM locations WHERE user_id = $1;"#)
            .bind(user_id)
            .fetch_one(&mut *db)
            .await
            .unwrap();

    let location = Location::new(
        location_query.get("id"),
        Some(user_id),
        location_query.get("description"),
        location_query.get("alt"),
        location_query.get("lng"),
    );

    return Json(location);
}

//Get users info with location
#[get("/user_location_info", format = "json")]
pub async fn user_location_info(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<UserLocation> {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

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
    return Json(user);
}

pub async fn location_add(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    location: Location,
) -> Response {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

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
        Ok(_data) => return Response::Success,
        Err(_err) => return Response::ErrorInserting,
    }
}

pub async fn user_add(user: User, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Response {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let insert_user = sqlx::query(r#"DO $do$ BEGIN IF NOT EXISTS (SELECT id FROM users WHERE email = $1) THEN INSERT INTO users (name, surname, phone, email, password) VALUES ($1, $2, $3, $4, $5); END IF; END $do$"#)
    .bind(user.get_email())
    .bind(user.get_name())
    .bind(user.get_surname())
    .bind(user.get_phone())
    .bind(user.get_email())
    .bind(user.get_password())
    .execute(&mut *db)
    .await;

    if insert_user.is_err() {
        return Response::ErrorInserting;
    }

    create_cookies(
        user.get_id().clone(),
        user.get_name().clone(),
        user.get_surname().clone(),
        user.get_email().clone(),
        user.get_password().clone(),
        cookies,
    );
    return Response::Success;
}

pub async fn location_update(
    location: Location,
    cookies: &CookieJar<'_>,
    mut db: Connection<Logs>,
) -> Response {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let update_location_query = rocket_db_pools::sqlx::query(
        r#"UPDATE locations SET description = $1, alt = $2, lng = $3 WHERE user_id = $4;"#,
    )
    .bind(location.get_description())
    .bind(location.get_alt())
    .bind(location.get_lng())
    .bind(user_id)
    .execute(&mut *db)
    .await;

    return if update_location_query.is_ok() {
        Response::Success
    } else {
        Response::ErrorUpdating
    };
}

pub async fn message_add(
    message: Message,
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Response {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

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

    return if add_message_query.is_ok() {
        Response::Success
    } else {
        Response::ErrorInserting
    };
}

pub async fn user_login(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    email: String,
    password: String,
) -> Response {
    let mut existing_user =
        sqlx::query(r#"SELECT * FROM users WHERE email= $1 AND password = $2;"#)
            .bind(email)
            .bind(password.clone())
            .fetch_one(&mut *db)
            .await
            .unwrap();

    if existing_user.is_empty() {
        return Response::UserNotFound;
    }

    let correct_password: String = existing_user.get("password");

    if password != correct_password {
        return Response::IncorrectPassword;
    }

    create_cookies(
        existing_user.get("id"),
        existing_user.get("name"),
        existing_user.get("surname"),
        existing_user.get("email"),
        existing_user.get("password"),
        cookies,
    );

    return Response::Success;
}

pub async fn check_cookies(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Response {
    if (cookies.get_private("id").is_none()
        || cookies.get_private("name").is_none()
        || cookies.get_private("surname").is_none()
        || cookies.get_private("email").is_none()
        || cookies.get_private("password").is_none())
    {
        return Response::IncorrectCookies;
    }

    let existing_users = sqlx::query(
        r#"SELECT COUNT(*) AS count FROM users WHERE id=$1 AND email= $1 AND password = $2;"#,
    )
    .bind(cookies.get_private("id").unwrap().value())
    .bind(cookies.get_private("email").unwrap().value())
    .bind(cookies.get_private("password").unwrap().value())
    .fetch_one(&mut *db)
    .await;

    let count: i64 = existing_users.unwrap().get("count");

    return if count > 0 {
        Response::UserExists
    } else {
        Response::IncorrectCookies
    };
}

pub async fn payment_add(
    response: String,
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Response {
    let parsed = json::parse(&response).unwrap();

    let appointment_id = parsed["id"].to_string();

    let update_appointment = sqlx::query(r#"UPDATE appointments SET paid = true WHERE id = $1;"#)
        .bind(appointment_id)
        .fetch_one(&mut *db)
        .await;

    return if update_appointment.is_ok() {
        Response::Success
    } else {
        Response::ErrorUpdating
    };
}

pub async fn appointment_add(
    appointment: appointment::Appointment,
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Response {
    let user_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let add_appointment = sqlx::query(r#"INSERT INTO appointments (user_id, day, start_hour, start_minute, duration, price, kind, paid) VALUES ($1, TO_DATE($2,'YYYY-MM-DD'), $3, $4, $5, 20, $6, false);"#)
                .bind(user_id)
                .bind(appointment.get_day())
                .bind(appointment.get_start_hour())
                .bind(appointment.get_start_minute())
                .bind(appointment.get_duration())
                .bind(appointment.get_kind())
                .fetch_one(&mut *db)
                .await;
    return if add_appointment.is_ok() {
        Response::Success
    } else {
        Response::ErrorInserting
    };
}
