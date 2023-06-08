use std::time::{SystemTime, UNIX_EPOCH};

use crate::components::admin::Admin;
use crate::components::appointment::Appointment;
use crate::components::message::Message;
use crate::components::response::Response;
use crate::components::shared_functions::{create_cookies, Logs};
use crate::components::user::User;
use crate::dtos::user_appointment::UserAppointment;
use crate::dtos::user_appointment_location::UserAppointmentLocation;
use rocket::http::CookieJar;
use rocket::serde::json::Json;
use rocket_db_pools::sqlx::{self, Row};
use rocket_db_pools::Connection;

//Get users payments
#[get("/user_payments/<user_id>", format = "json")]
pub async fn user_payments(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    user_id: i64,
) -> Json<Vec<Appointment>> {
    //let check_cookies = check_cookies(db, cookies);
    let mut appointments: Vec<Appointment> = Vec::new();

    let appointments_query = sqlx::query(r#"SELECT id, CAST(day AS VARCHAR), start_hour, start_minute, duration, price, kind, paid FROM appointments WHERE user_id = $1"#)
                .bind(user_id)
                //.fetch_all(&mut *(check_cookies.await.1))
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in appointments_query {
        let appointment = Appointment::new(
            Some(row.get("id")),
            Some(user_id),
            row.get("day"),
            row.get("start_hour"),
            row.get("start_minute"),
            row.get("duration"),
            row.get("kind"),
            Some(row.get("price")),
            row.get("paid"),
        );

        appointments.push(appointment);
    }

    return Json(appointments);
}

//Get all users ordered
#[get("/ordered_users", format = "json")]
pub async fn ordered_users(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Json<Vec<User>> {
    let mut ordered_users: Vec<User> = Vec::new();
    let user_query =
        sqlx::query(r#"SELECT id, name, surname, phone, email, description FROM users ORDER BY name ASC, surname ASC;"#)
            .fetch_all(&mut *db)
            .await
            .unwrap();

    for user in user_query {
        let user_info: User = User::new(
            Some(user.get("id")),
            Some(user.get("name")),
            Some(user.get("surname")),
            Some(user.get("phone")),
            user.get("email"),
            String::new(),
            Some(String::new()),
        );
        ordered_users.push(user_info);
    }
    return Json(ordered_users);
}

//Get users detailed info
#[get("/user_detailed_info/<user_id>", format = "json")]
pub async fn user_detailed_info(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    user_id: i64,
) -> Json<User> {
    let user_query =
        sqlx::query(r#"SELECT name, surname, email, phone, description FROM users WHERE id = $1"#)
            .bind(user_id)
            .fetch_one(&mut *db)
            .await
            .unwrap();

    let user: User = User::new(
        Some(user_id),
        Some(user_query.get("name")),
        Some(user_query.get("surname")),
        Some(user_query.get("phone")),
        user_query.get("email"),
        String::new(),
        Some(String::new()),
    );
    return Json(user);
}

//Get admin info
#[get("/admin_info", format = "json")]
pub async fn admin_info(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Json<Admin> {
    let admin_id = cookies
        .get_private("id")
        .unwrap()
        .value()
        .parse::<i64>()
        .unwrap();
    let admin_info = sqlx::query(r#"SELECT * FROM admins WHERE id = $1;"#)
        .bind(admin_id)
        .fetch_one(&mut *db)
        .await
        .unwrap();

    let admin = Admin::new(
        Some(admin_info.get("id")),
        Some(admin_info.get("name")),
        Some(admin_info.get("surname")),
        admin_info.get("email"),
        String::new(),
        Some(admin_info.get("phone")),
    );

    return Json(admin);
}

//Get messages between user and admin
#[get("/user_messages/<user_id>", format = "json")]
pub async fn user_messages(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    user_id: i64,
) -> Json<Vec<Message>> {
    let mut messages: Vec<Message> = Vec::new();
    let admin_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let query = sqlx::query(r#"SELECT * FROM messages WHERE admin_id = $1 AND user_id = $2"#)
        .bind(admin_id)
        .bind(user_id)
        .fetch_all(&mut *db)
        .await
        .unwrap();

    for row in query {
        let message = Message::new(
            row.get("id"),
            Some(user_id),
            row.get("admin_id"),
            Some(row.get("created")),
            row.get("content"),
            row.get("is_admin"),
        );

        messages.push(message);
    }

    return Json(messages);
}

//Get appointments for schedule
#[get("/schedule_info", format = "json")]
pub async fn schedule_info(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<UserAppointmentLocation>> {
    let mut appointments: Vec<UserAppointmentLocation> = Vec::new();

    let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, appointments.paid, appointments.kind, locations.id, locations.description, locations.user_id, locations.alt, locations.lng, users.name, users.surname FROM appointments JOIN locations ON appointments.user_id = locations.user_id JOIN users ON users.id = appointments.user_id;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in query {
        let user_appointment_location: UserAppointmentLocation = UserAppointmentLocation::new(
            row.get("appointment_id"),
            row.get("user_id"),
            row.get("name"),
            row.get("surname"),
            row.get("day"),
            row.get("start_hour"),
            row.get("start_minute"),
            row.get("duration"),
            row.get("kind"),
            row.get("price"),
            row.get("paid"),
            String::new(),
            row.get("alt"),
            row.get("lng"),
        );

        appointments.push(user_appointment_location);
    }
    println!("{:?}", appointments);
    return Json(appointments);
}

//Get users with existing messages
#[get("/users_with_existing_chat", format = "json")]
pub async fn users_with_existing_chat(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<User>> {
    let mut users: Vec<User> = Vec::new();
    let admin_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let users_query = sqlx::query(r#"WITH filtered_messages AS (SELECT user_id, created FROM messages WHERE admin_id = 1 ORDER BY created) SELECT DISTINCT user_id, users.name, users.surname FROM filtered_messages JOIN users ON users.id = user_id;"#)
                .bind(admin_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in users_query {
        let user = User::new(
            row.get("user_id"),
            row.get("name"),
            row.get("surname"),
            Some(String::new()),
            String::new(),
            String::new(),
            Some(String::new()),
        );
        users.push(user);
    }
    return Json(users);
}

//Get users without messages
#[get("/users_without_chat", format = "json")]
pub async fn users_without_chat(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<User>> {
    let mut users: Vec<User> = Vec::new();
    let admin_id = cookies
        .get_private("id")
        .expect("not found")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();

    let users_query = sqlx::query(r#"SELECT id, name, surname FROM users WHERE id NOT IN (SELECT user_id FROM messages WHERE admin_id = 1) ORDER BY name ASC, surname ASC;"#)
                .bind(admin_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in users_query {
        let user = User::new(
            row.get("id"),
            row.get("name"),
            row.get("surname"),
            Some(String::new()),
            String::new(),
            String::new(),
            Some(String::new()),
        );
        users.push(user);
    }
    return Json(users);
}

//Get debt info from all users
#[get("/existing_debt", format = "json")]
pub async fn existing_debt(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Json<Vec<UserAppointment>> {
    let mut debts: Vec<UserAppointment> = Vec::new();

    let debt_query = sqlx::query(r#"SELECT appointments.id, user_id, name, surname, CAST(appointments.day AS VARCHAR), start_hour, start_minute, duration, price, kind, paid FROM appointments JOIN users ON user_id = users.id WHERE paid = false ORDER BY day ASC, start_hour ASC, start_minute ASC;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

    for row in debt_query {
        let debt = UserAppointment::new(
            row.get("id"),
            row.get("user_id"),
            row.get("name"),
            row.get("surname"),
            row.get("day"),
            row.get("start_hour"),
            row.get("start_minute"),
            row.get("duration"),
            row.get("kind"),
            row.get("price"),
            row.get("paid"),
        );
        debts.push(debt);
    }
    return Json(debts);
}

pub async fn appointment_add(
    appointment: Appointment,
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Response {
    let add_appointment = sqlx::query(r#"INSERT INTO appointments (user_id, day, start_hour, start_minute, duration, kind, price, paid) VALUES ($1, TO_DATE($2,'YYYY-MM-DD'), $3, $4, $5, $6, 10, false);"#)
                .bind(appointment.get_id())
                .bind(appointment.get_day())
                .bind(appointment.get_start_hour())
                .bind(appointment.get_start_minute())
                .bind(appointment.get_duration())
                .bind(appointment.get_kind())
                .execute(&mut *db)
                .await;

    return if add_appointment.is_ok() {
        Response::Success
    } else {
        Response::ErrorInserting
    };
}

pub async fn admin_login(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    admin: Admin,
) -> Response {
    let existing_users =
        sqlx::query(r#"SELECT id, name, surname, password FROM admins WHERE email= $1"#)
            .bind(&admin.get_email())
            .fetch_one(&mut *db)
            .await
            .unwrap();

    if existing_users.is_empty() {
        return Response::UserNotFound;
    }

    let password: String = existing_users.get("password");

    if password != admin.get_password().clone() {
        return Response::IncorrectPassword;
    }

    let id: i64 = existing_users.get("id");
    let name: String = existing_users.get("name");
    let surname: String = existing_users.get("surname");

    create_cookies(
        Some(id),
        Some(name),
        Some(surname),
        admin.get_email().clone(),
        admin.get_password().clone(),
        cookies,
    );

    return Response::Success;
}

pub async fn admin_exists(admin: &Admin, mut db: Connection<Logs>) -> bool {
    let existing_users = sqlx::query(r#"SELECT COUNT(*) AS count FROM admins WHERE email= $1"#)
        .bind(admin.get_email())
        .fetch_one(&mut *db)
        .await;

    let count: i64 = existing_users.unwrap().get("count");
    return count > 0;
}

pub async fn check_cookies(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> (bool, Connection<Logs>) {
    let existing_admins =
        sqlx::query(r#"SELECT COUNT(*) AS count FROM admins WHERE id=$1 AND email= $1;"#)
            .bind(cookies.get_private("id").unwrap().value())
            .bind(cookies.get_private("email").unwrap().value())
            //.bind(cookies.get_private("password").unwrap().value())
            .fetch_one(&mut *db)
            .await;

    let count: i64 = existing_admins.unwrap().get("count");

    return (count > 0, db);
}

pub async fn message_add(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    message: Message,
    user_id: i64,
) -> Response {
    let admin_id = cookies
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

    let add_message_query = sqlx::query(r#"INSERT INTO messages (user_id, admin_id, created, content, is_admin) VALUES ($1, $2, $3, $4, true);"#)
                .bind(user_id)
                .bind(admin_id)
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

pub async fn payment_add(
    mut db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    app_id: String,
) -> Response {
    let appointment_id: i64 = app_id.replace("id=", "").parse().unwrap();
    let set_paid = sqlx::query(r#"UPDATE appointments SET paid = true WHERE id = $1;"#)
        .bind(appointment_id)
        .fetch_one(&mut *db)
        .await;

    return if set_paid.is_ok() {
        Response::Success
    } else {
        Response::ErrorInserting
    };
}
