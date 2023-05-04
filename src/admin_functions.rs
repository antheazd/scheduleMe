use std::time::{SystemTime, UNIX_EPOCH, Duration};
use sqlx::types::chrono::{DateTime, Utc};
use rocket::http::{CookieJar};
use rocket_db_pools::{Connection};
use rocket_db_pools::sqlx::{self, Row, Error};
use rocket::form::Form;
use rocket_dyn_templates::Template;
use rocket_dyn_templates::context;
use rocket::response::Redirect;
use crate::components::admin as admin;
use crate::components::appointment::{self as appointment};
use crate::components::message::{Message};

use crate::components::shared_functions::Logs as Logs;
use crate::components::shared_functions::create_cookies as create_cookies;
use crate::components::shared_functions::remove_cookies as remove_cookies;

#[get("/adminprofile")]
pub async fn adminprofile(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    match cookies.get_private("id"){
        Some(id) => {

            let admin_id = id.value().to_string().parse::<i64>().unwrap();
            let user_info = sqlx::query(r#"SELECT * FROM admins WHERE id = $1;"#)
                .bind(admin_id)
                .fetch_one(&mut *db)
                .await
                .unwrap();

            let mut info: Vec<String> = Vec::new();

            let name: String = user_info.get("name");
            let surname: String = user_info.get("surname");
            let email: String = user_info.get("email");
            let phone: String = user_info.get("phone");

            let mut context_str = String::new();

            context_str.push('{');
            let full_str = format!("\"{}\": \"{}\", \"{}\": \"{}\",\"{}\": \"{}\",\"{}\": \"{}\"", stringify!(name), name, stringify!(surname), surname, stringify!(email), email, stringify!(phone), phone);
            context_str.push_str(&full_str);
            context_str.push('}');
            
            info.push(context_str);

            return Ok(Template::render("adminprofile", context! {context: info}))
        }
        None => {
            return Err(Redirect::to(uri!(adminlogin())))
        }
    }
}
#[post("/adminpanel", data = "<appointment>")]
pub async fn adminpanel(appointment: Form<appointment::Appointment>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{
    let id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let add_appointment = sqlx::query(r#"INSERT INTO appointments (user_id, day, start_hour, start_minute, duration, kind, price, paid) VALUES ($1, TO_DATE($2,'YYYY-MM-DD'), $3, $4, $5, $6, 10, false);"#)
                .bind(appointment.get_id())
                .bind(appointment.get_day())
                .bind(appointment.get_start_hour())
                .bind(appointment.get_start_minute())
                .bind(appointment.get_duration())
                .bind(appointment.get_kind())
                .fetch_one(&mut *db)
                .await;
            
            match add_appointment{
                Ok(d) => {
                    println!("Inserted");
                }
                Err(e) => {
                    println!("{}", e.to_string());
                }
            }
            return Ok(Redirect::to(uri!(adminpanel())));
        }
        None => {
            println!("no id");
            return Ok(Redirect::to(uri!(adminlogin())));
        }
    }
}


#[get("/adminpanel")]
pub async fn adminpanelget(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let mut appointments: Vec<String> = Vec::new();
            let mut users: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, appointments.kind, locations.id, locations.description, locations.user_id, locations.alt, locations.lng, users.name, users.surname FROM appointments JOIN locations ON appointments.user_id = locations.user_id JOIN users ON users.id = appointments.user_id WHERE appointments.day > CURRENT_DATE;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in query{
                let mut s: String = String::new();

                let appointment_id: i64 = row.get("appointment_id");
                let day: String = row.get("day");
                let start_hour: i32 = row.get("start_hour");
                let start_minute: i32 = row.get("start_minute");
                let duration: String = row.get("duration");
                let alt: f64 = row.get("alt");
                let lng: f64 = row.get("lng");
                let name: String = row.get("name");
                let surname: String = row.get("surname");
                let price: f32 = row.get("price");
                let kind: String = row.get("kind");

                s.push('{');

                let full_str = format!("\"{}\": \"{}\", \"{}\": {},\"{}\": {},\"{}\": \"{}\",\"{}\": {},\"{}\": {}, \"{}\": {}, \"{}\": \"{}\", \"{}\": \"{}\", \"{}\": {}, \"{}\": \"{}\"", stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(duration), duration, stringify!(alt), alt, stringify!(lng), lng, stringify!(appointment_id), appointment_id, stringify!(name), name, stringify!(surname), surname, stringify!(price), price, stringify!(kind), kind);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }
            
            let users_query = sqlx::query(r#"SELECT users.id AS users_id, users.name, users.surname FROM users;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in users_query{
                let mut s: String = String::new();

                let users_id: i64 = row.get("users_id");
                let name: String = row.get("name");
                let surname: String = row.get("surname");

                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": \"{}\",\"{}\": \"{}\"", stringify!(users_id), users_id, stringify!(name), name, stringify!(surname), surname);
                
                s.push_str(&full_str);

                s.push('}');

                users.push(s);
            }

            return Ok(Template::render("adminpanel", context!{appointments: appointments, users: users}));
        } 
        _ => {
            Err(Redirect::to(uri!(adminlogin())))
        }
    }
}

#[get("/adminlogin")]
pub fn adminlogin() -> Template {
    Template::render("adminlogin", context! {
        message: "",
    })
}


#[post("/adminlogin", data = "<admin>")]
pub async fn adminloginfn(admin: Form<admin::Admin>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{

    let mut _message: String = "".to_string();
    let existing_users = sqlx::query(r#"SELECT * FROM admins WHERE email= $1"#)
        .bind(admin.get_email())
        .fetch_one(&mut *db)
        .await;
    
        match existing_users{
            Ok(data) => {
                let id: Option<i64> = data.get("id");
                let name: Option<String> = data.get("name");
                let surname: Option<String> = data.get("surname");
                let email: String = data.get("email");
                let password: String = data.get("password");
                if password == admin.get_password().as_str(){

                    println!("Success");
                    _message = "Success".to_string();

                    create_cookies(id, name, surname, email, cookies);
                    return Ok(Redirect::to(uri!(adminpanel())));
                }
                else{
                    _message = "Incorrect password".to_string();
                    return Err(Template::render("adminlogin", context!{message: _message}))
                }
            }
            Err(err) => {
                match err{
                    Error::RowNotFound => {
                        _message = String::from("No users found with this email");
                        return Ok(Redirect::to(uri!(adminlogin())))
                    }
                    _ => {
                        _message = String::from("Trouble connecting to database");
                        println!("{}", err);
                    }
                }
            }
    } 
        Err(Template::render("adminlogin", context! {
            message: _message,
        }))

}

#[get("/adminlogout")]
pub fn adminlogout(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(adminlogin()))
}

#[get("/adminchat")]
pub async fn adminchats(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");

    match id_cookie {
        Some(id) => {

            let admin_id = id.value().to_string().parse::<i64>().unwrap();

            let mut users: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"WITH filtered_messages AS (SELECT user_id, created FROM messages WHERE admin_id = 1 ORDER BY created) SELECT DISTINCT user_id, users.name, users.surname FROM filtered_messages JOIN users ON users.id = user_id;"#)
                .bind(admin_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in query{
                let mut s: String = String::new();

                let user_id: i64 = row.get("user_id");
                let name: String = row.get("name");
                let surname: String = row.get("surname");
                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": \"{}\", \"{}\": \"{}\"", stringify!(user_id), user_id, stringify!(name), name, stringify!(surname), surname);
                
                s.push_str(&full_str);

                s.push('}');

                users.push(s);
            }

            let mut other_users: Vec<String> = Vec::new();
            
            let other_users_query = sqlx::query(r#"SELECT id, name, surname FROM users WHERE id NOT IN (SELECT user_id FROM messages WHERE admin_id = 1) ORDER BY name ASC, surname ASC;"#)
                .bind(admin_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in other_users_query{
                let mut s: String = String::new();

                let user_id: i64 = row.get("id");
                let name: String = row.get("name");
                let surname: String = row.get("surname");
                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": \"{}\", \"{}\": \"{}\"", stringify!(user_id), user_id, stringify!(name), name, stringify!(surname), surname);
                
                s.push_str(&full_str);

                s.push('}');

                other_users.push(s);
            }


            return Ok(Template::render("adminchats", context!{users: users, other_users: other_users}));
        } 
        _ => {
            Err(Redirect::to(uri!(adminlogin())))
        }
    }
}

#[get("/adminchat/<user_id>")]
pub async fn adminchat(cookies: &CookieJar<'_>, mut db: Connection<Logs>, user_id: i64) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");

    match id_cookie {
        Some(id) => {

            let admin_id = id.value().to_string().parse::<i64>().unwrap();

            let mut messages: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"SELECT * FROM messages WHERE admin_id = $1 AND user_id = $2"#)
                .bind(admin_id)
                .bind(user_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in query{
                let mut s: String = String::new();

                let id: i64 = row.get("id");
                let user_id: i64 = row.get("user_id");
                let admin_id: i64 = row.get("admin_id");
                let content: String = row.get("content");
                let is_admin: bool = row.get("is_admin");

                let time: i64 = row.get("created");
                let timespan = UNIX_EPOCH + Duration::from_secs(u64::try_from(time).unwrap());
                let created = DateTime::<Utc>::from(timespan);

                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": {}, \"{}\": {},\"{}\": \"{}\",\"{}\": \"{}\",\"{}\": {}", stringify!(id), id, stringify!(user_id), user_id, stringify!(admin_id), admin_id, stringify!(created), created, stringify!(content), content, stringify!(is_admin), is_admin);
                
                s.push_str(&full_str);

                s.push('}');

                messages.push(s);
            }

            for i in &messages{
                println!("{:?}", i);
            }

            return Ok(Template::render("adminchat", context!{messages: messages}));
        } 
        _ => {
            Err(Redirect::to(uri!(adminlogin())))
        }
    }
}

#[post("/adminchat/<user_id>", data = "<message>")]
pub async fn add_admin_message(message: Form<Message>, mut db: Connection<Logs>, cookies: &CookieJar<'_>, user_id: i64) -> Result<Redirect, Template>{
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {
            let admin_id = id.value().to_string().parse::<i64>().unwrap();

            let created = i64::try_from(SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .expect("Time went backwards")
                .as_secs())
                .unwrap();

            let add_message = sqlx::query(r#"INSERT INTO messages (user_id, admin_id, created, content, is_admin) VALUES ($1, $2, $3, $4, true);"#)
                .bind(user_id)
                .bind(admin_id)
                .bind(created)
                .bind(message.get_content())
                .fetch_one(&mut *db)
                .await;
            
            match add_message{
                Ok(d) => {
                    println!("sent");
                }
                Err(e) => {
                    println!("{}", e.to_string());
                }
            }
            return Ok(Redirect::to(uri!(adminchat(user_id))));
        }
        None => {
            println!("no id");
            return Ok(Redirect::to(uri!(adminlogin())));
        }
    }
}

#[get("/adminpayments")]
pub async fn adminpayments(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");

    match id_cookie {
        Some(id) => {

            let mut appointments: Vec<String> = Vec::new();
            let mut users: Vec<String> = Vec::new();
            
            let appointments_query = sqlx::query(r#"SELECT appointments.id, user_id, name, surname, CAST(appointments.day AS VARCHAR), start_hour, start_minute, price, kind, paid FROM appointments JOIN users ON user_id = users.id WHERE paid = false ORDER BY day ASC, start_hour ASC, start_minute ASC;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in appointments_query{
                let mut s: String = String::new();

                let id: i64 = row.get("id");
                let user_id: i64 = row.get("user_id");
                let name: String = row.get("name");
                let surname: String = row.get("surname");
                let day: String = row.get("day");
                let start_hour: i32 = row.get("start_hour");
                let start_minute: i32 = row.get("start_minute");
                let kind: String = row.get("kind");
                let price: f32 = row.get("price");
                let paid: bool = row.get("paid");

                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": {}, \"{}\": \"{}\",\"{}\": \"{}\",\"{}\": \"{}\",\"{}\": {},\"{}\": {},\"{}\": \"{}\",\"{}\": {},\"{}\": {}", stringify!(id), id, stringify!(user_id), user_id, stringify!(name), name, stringify!(surname), surname, stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(kind), kind, stringify!(price), price, stringify!(paid), paid);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }

            for i in &appointments{
                println!("{:?}", i);
            }

            let users_query = sqlx::query(r#"SELECT id, name, surname FROM users ORDER BY name ASC, surname ASC;"#)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in users_query{
                let mut s: String = String::new();

                let id: i64 = row.get("id");
                let name: String = row.get("name");
                let surname: String = row.get("surname");

                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": \"{}\", \"{}\": \"{}\"", stringify!(id), id, stringify!(name), name, stringify!(surname), surname);
                
                s.push_str(&full_str);

                s.push('}');

                users.push(s);
            }

            for i in &users{
                println!("{:?}", i);
            }

            return Ok(Template::render("adminpayments", context!{appointments: appointments, users: users}));
        } 
        _ => {
            Err(Redirect::to(uri!(adminlogin())))
        }
    }
}

#[get("/adminpayments/<user_id>")]
pub async fn user_payments(cookies: &CookieJar<'_>, mut db: Connection<Logs>, user_id: i64) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");

    match id_cookie {
        Some(id) => {
            
            let mut user_info: Vec<String> = Vec::new();
            let mut appointments: Vec<String> = Vec::new();
            
            let appointments_query = sqlx::query(r#"SELECT id, CAST(day AS VARCHAR), start_hour, start_minute, duration, price, kind, paid  FROM appointments WHERE user_id = $1"#)
                .bind(user_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            for row in appointments_query{
                let mut s: String = String::new();

                let id: i64 = row.get("id");
                let day: String = row.get("day");
                let start_hour: i32 = row.get("start_hour");
                let start_minute: i32 = row.get("start_minute");
                let duration: String = row.get("duration");
		        let price: f32 = row.get("price");
                let kind: String = row.get("kind");
		        let paid: bool = row.get("paid");

                s.push('{');

                let full_str = format!("\"{}\": {}, \"{}\": \"{}\", \"{}\": {},\"{}\": {},\"{}\": \"{}\", \"{}\": {}, \"{}\": \"{}\", \"{}\": {}", stringify!(id), id, stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(duration), duration, stringify!(price), price, stringify!(kind), kind, stringify!(paid), paid);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }

            for i in &appointments{
                println!("{:?}", i);
            }

            let user_info_query = sqlx::query(r#"SELECT name, surname FROM users WHERE id = $1"#)
                .bind(user_id)
                .fetch_all(&mut *db)
                .await
                .unwrap();

            let mut user_info_str = String::new();
            let name: String = user_info_query[0].get("name");
            let surname: String = user_info_query[0].get("surname");
            
            user_info_str.push('{');
            user_info_str.push_str(&format!("\"name\": \"{}\", \"surname\": \"{}\"", name, surname));
            user_info_str.push('}');

            user_info.push(user_info_str);

            println!("{:?}", user_info);

            return Ok(Template::render("adminpayment", context!{appointments: appointments, user_info: user_info}));
        } 
        _ => {
            Err(Redirect::to(uri!(adminlogin())))
        }
    }
}

#[post("/adminpayments/<user_id>", data = "<app_id>")]
pub async fn set_as_paid(mut db: Connection<Logs>, cookies: &CookieJar<'_>, user_id: i64, app_id: String) -> Result<Redirect, Template>{
    let id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let appointment_id: i64 = app_id.replace("id=", "").parse().unwrap();
            let set_paid = sqlx::query(r#"UPDATE appointments SET paid = true WHERE id = $1;"#)
                .bind(&appointment_id)
                .fetch_one(&mut *db)
                .await;

            println!("App id: {}", &appointment_id);
            
            match set_paid{
                Ok(d) => {
                    println!("sent");
                }
                Err(e) => {
                    println!("{}", e.to_string());
                }
            }
            return Ok(Redirect::to(uri!(user_payments(user_id))));
        }
        None => {
            println!("no id");
            return Ok(Redirect::to(uri!(adminlogin())));
        }
    }
}