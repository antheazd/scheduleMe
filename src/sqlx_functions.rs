use std::collections::HashMap;
use rocket::futures::TryFutureExt;
use rocket::http::{Cookie, CookieJar};
use rocket::serde::json;
use rocket_db_pools::{Database, Connection};
use rocket_db_pools::sqlx::{self, Row, Error};
use rocket::form::Form;
use rocket_dyn_templates::Template;
use rocket_dyn_templates::context;
use rocket::response::Redirect;
use serde_json::json;
use crate::components::user as user;
use crate::components::admin as admin;
use crate::components::location::{self as location, Location};
use crate::components::appointment::{self as appointment, Appointment};
use rocket::serde::{Serialize, Deserialize, json::Json};

#[derive(Database)]
#[database("webappdb")]
pub struct Logs(sqlx::PgPool);

pub fn create_cookies(id: Option<i64>, name: Option<String>, surname: Option<String>, email: String, cookies: &CookieJar<'_>){
    cookies.add_private(Cookie::new("id", id.unwrap().to_string()));
    cookies.add_private(Cookie::new("name", name.unwrap()));
    cookies.add_private(Cookie::new("surname", surname.unwrap()));
    cookies.add_private(Cookie::new("email", email));
}

pub fn remove_cookies(cookies: &CookieJar<'_>){
    cookies.remove_private(Cookie::named("id"));
    cookies.remove_private(Cookie::named("name"));
    cookies.remove_private(Cookie::named("surname"));
    cookies.remove_private(Cookie::named("email"));
}


#[catch(404)]
pub fn not_found() -> Template {
    Template::render("", context! {})
}

#[post("/")]
pub fn index() -> Template {
    Template::render("schedule", context!{})
}

#[get("/")]
pub async fn indexget(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("schedule", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/userprofile")]
pub async fn userprofile(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    match cookies.get_private("id"){
        Some(id) => {

            let user_id = id.value().to_string().parse::<i64>().unwrap();
            let user_info = sqlx::query(r#"SELECT * FROM users WHERE id = $1;"#)
                .bind(user_id)
                .fetch_one(&mut *db)
                .await
                .unwrap();

            let mut info: Vec<String> = Vec::new();

            let name: String = user_info.get("name");
            let surname: String = user_info.get("surname");
            let email: String = user_info.get("email");

            let mut context_str = String::new();

            context_str.push('{');
            let full_str = format!("\"{}\": \"{}\", \"{}\": \"{}\",\"{}\": \"{}\"", stringify!(name), name, stringify!(surname), surname, stringify!(email), email);
            context_str.push_str(&full_str);
            context_str.push('}');
            
            info.push(context_str);

            return Ok(Template::render("userprofile", context! {context: info}))
        }
        None => {
            return Err(Redirect::to(uri!(login())))
        }
    }
}

#[post("/userprofile", data = "<location>")]
pub async fn userprofilepost(location: Form<location::Location>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {
            println!("{}", id.value());
            let user_id = id.value().to_string().parse::<i64>().unwrap();

            let update_user = sqlx::query(r#"select count(*) as locations from locations where user_id = $1;"#)
            .bind(user_id)
            .fetch_one(&mut *db)
            .await;

            println!("{} {} {} {}", id.to_string(), location.get_description(), location.get_alt(), location.get_lng());

            match( update_user ){
                Ok(data) => {
                    let x: i64 = data.get("locations");
                    match x{
                            0 => {
                                println!("\n{}", x);
                                let query = rocket_db_pools::sqlx::query(r#"INSERT INTO locations (description, alt, lng, user_id) VALUES ($1, $2, $3, $4);"#)
                                .bind(location.get_description())
                                .bind(location.get_alt())
                                .bind(location.get_lng())
                                .bind(user_id)
                                .execute(&mut *db)
                                .await;

                                println!("Inserted");
                                return Ok(Redirect::to(uri!(schedule())))}
                        _ => {
                                println!("\n{}", x);
                                let query = rocket_db_pools::sqlx::query(r#"UPDATE locations SET description = $1, alt = $2, lng = $3 WHERE user_id = $4;"#)
                                .bind(location.get_description())
                                .bind(location.get_alt())
                                .bind(location.get_lng())
                                .bind(user_id)
                                .execute(&mut *db)
                                .await;
                                println!("Updated");
                                return Ok(Redirect::to(uri!(schedule())))}
                        }

            }
    
            
                Err(err) => {
                    println!("{}", err.to_string());

                    return Err(Template::render("userprofile", context! {})) 
                }
            }
            }
        
    None => {
            return Err(Template::render("userprofile", context! {}))
        }
    }
}

#[get("/chat")]
pub async fn chat(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("chat", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/schedule")]
pub async fn schedule(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let mut appointments: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, locations.id, locations.description, locations.user_id, locations.alt, locations.lng FROM appointments JOIN locations ON appointments.user_id = locations.user_id;"#)
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

                s.push('{');

                let full_str = format!("\"{}\": \"{}\", \"{}\": {},\"{}\": {},\"{}\": \"{}\",\"{}\": {},\"{}\": {}, \"{}\": {}", stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(duration), duration, stringify!(alt), alt, stringify!(lng), lng, stringify!(appointment_id), appointment_id);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }

            for i in &appointments{
                println!("{:?}", i);
            }

            let user_id = id.value().to_string().parse::<i64>().unwrap();
            let user_info = sqlx::query(r#"SELECT alt, lng FROM locations WHERE user_id = $1;"#)
                .bind(user_id)
                .fetch_one(&mut *db)
                .await
                .unwrap();

                let alt_value: f64 = user_info.get("alt");
                let lng_value: f64 = user_info.get("lng");

                let mut coordinates: Vec<String> = Vec::new();

                let mut coordinates_str: String = String::new(); 

                coordinates_str.push('{');
                let coord_str = format!("\"alt\": {}, \"lng\": {}", alt_value.to_string(), lng_value.to_string());
                coordinates_str.push_str(&coord_str);
                coordinates_str.push('}');

                coordinates.push(coordinates_str);



            return Ok(Template::render("schedule", context!{appointments: appointments, coordinates: coordinates}));
        } 
        _ => {
            Err(Redirect::to(uri!(login())))
        }
    }
}

#[post("/schedule", data = "<appointment>")]
pub async fn add_appointment(appointment: Form<appointment::Appointment>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {
            println!("{}", id.value());
            let user_id = id.value().to_string().parse::<i64>().unwrap();
            println!("{}", appointment.get_day());

            let add_appointment = sqlx::query(r#"INSERT INTO appointments (user_id, day, start_hour, start_minute, duration, price) VALUES ($1, TO_DATE($2,'YYYY-MM-DD'), $3, $4, $5, 100);"#)
                .bind(user_id)
                .bind(appointment.get_day())
                .bind(appointment.get_start_hour())
                .bind(appointment.get_start_minute())
                .bind(appointment.get_duration())
                .fetch_one(&mut *db)
                .await;
            
            match add_appointment{
                Ok(d) => {
                    println!("inserted");
                }
                Err(e) => {
                    println!("{}", e.to_string());
                }
            }
            return Ok(Redirect::to(uri!(schedule())));
        }
        None => {
            println!("no id");
            return Ok(Redirect::to(uri!(login())));
        }
    }
}

#[get("/payments")]
pub async fn payments(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("payments", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/login")]
pub fn login() -> Template {
    Template::render("login", context! {
        message: "",
    })
}

#[post("/login", data = "<user>")]
pub async fn loginfn(user: Form<user::User>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{

    let mut _message: String = "".to_string();
    let existing_users = sqlx::query(r#"select * from users where email= $1"#)
        .bind(user.get_email())
        .bind(user.get_password())
        .fetch_one(&mut *db)
        .await;
    
        match existing_users{
            Ok(data) => {
                let id: Option<i64> = data.get("id");
                let name: Option<String> = data.get("name");
                let surname: Option<String> = data.get("surname");
                let email: String = data.get("email");
                let password: String = data.get("password");
                if password == user.get_password().as_str(){

                    println!("Success");
                    _message = "Success".to_string();

                    create_cookies(id, name, surname, email, cookies);
                    return Ok(Redirect::to(uri!(schedule())));
                    //return Ok(Template::render("schedule", context!{message: _message}))
                }
                else{
                    _message = "Incorrect password".to_string();
                    return Err(Template::render("login", context!{message: _message}))
                }
            }
            Err(err) => {
                match err{
                    Error::RowNotFound => {
                        _message = String::from("No users found with this email");
                        return Ok(Redirect::to(uri!(signup())))
                    }
                    _ => {
                        _message = String::from("Trouble connecting to database");
                        println!("{}", err);
                    }
                }
            }
    } 
        Err(Template::render("login", context! {
            message: _message,
        }))

}

#[get("/logout")]
pub fn logout(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(login()))
}

#[get("/signup")]
pub fn signup() -> Template {
    Template::render("signup", context! {
        message: "",
    })
}

#[post("/signup", data = "<user>")]
pub async fn signupfn(user: Form<user::User>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{

let existing_users = sqlx::query(r#"select count(id) as count from users where email= $1"#)
    .bind(user.get_email())
    .fetch_one(&mut *db)
    .await;

    let mut count: i64 = 0;
    let mut success: bool = false;
    let mut message: String = String::from("");
    match existing_users{
        Ok(data) => {
            count = data.get("count");
            println!("{}", count);
        }
        Err(err) => {
            println!("{err}");
            message = err.to_string();
        }
    }
    if count == 0 {
            let query = rocket_db_pools::sqlx::query(r#"INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4);"#)
                .bind(user.get_name())
                .bind(user.get_surname())
                .bind(user.get_email())
                .bind(user.get_password())
                .execute(&mut *db)
                .await;
                match query{
                    Ok(_fine) => {
                        success = true;
                        println!("Inserted!");
                        let get_id = sqlx::query(r#"SELECT * from users WHERE email= $1"#)
                                .bind(user.get_email())
                                .fetch_one(&mut *db)
                                .await;

                                match get_id{
                                    Ok(id_result) =>{
                                        let id: Option<i64> = id_result.get("id");
                                        let name: Option<String> = id_result.get("name");
                                        let surname: Option<String> = id_result.get("surname");
                                        let email: String = id_result.get("email");
                                        create_cookies(id, name, surname, email, cookies);
                                        return 
                                            Ok(Redirect::to(uri!(userprofile)));

                                    }
                                    Err(e) =>{
                                        println!("{e}")
                                    }
                                }
                            
                    }
                    Err(error) => {
                        println!("Err:{}", error);
                        message = error.to_string();}
            }
            
        }
    else {
            println!("Already exists");
            message = String::from("User with this email already exists");
            
        }

    if success {
        return 
        Ok(Redirect::to(uri!(userprofile)));
    }

    Err(Template::render("signup", context! {
        message: message,
    }))
} 
//admin
#[post("/adminpanel")]
pub async fn adminpanel(mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Result<Redirect, Template>{
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let mut appointments: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, locations.id, locations.description, locations.user_id, locations.alt, locations.lng FROM appointments JOIN locations ON appointments.user_id = locations.user_id;"#)
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

                s.push('{');

                let full_str = format!("\"{}\": \"{}\", \"{}\": {},\"{}\": {},\"{}\": \"{}\",\"{}\": {},\"{}\": {}, \"{}\": {}", stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(duration), duration, stringify!(alt), alt, stringify!(lng), lng, stringify!(appointment_id), appointment_id);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }

            for i in &appointments{
                println!("{:?}", i);
            }


            return Err(Template::render("adminpanel", context!{appointments: appointments}));
        } 
        _ => {
            Ok(Redirect::to(uri!(adminlogin())))
        }
    }

}
/* 
#[get("/adminpanel")]
pub async fn adminpanelget(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("adminpanel", 
            context! {}))
    }
    Err(Redirect::to(uri!(adminlogin())))
}*/

#[get("/adminpanel")]
pub async fn adminpanelget(cookies: &CookieJar<'_>, mut db: Connection<Logs>) -> Result<Template, Redirect> {
    let mut id_cookie = cookies.get_private("id");
    match id_cookie {
        Some(id) => {

            let mut appointments: Vec<String> = Vec::new();
            
            let query = sqlx::query(r#"SELECT appointments.id AS appointment_id, appointments.user_id, CAST(appointments.day AS VARCHAR), appointments.start_hour, appointments.start_minute, appointments.duration, appointments.price, locations.id, locations.description, locations.user_id, locations.alt, locations.lng FROM appointments JOIN locations ON appointments.user_id = locations.user_id;"#)
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

                s.push('{');

                let full_str = format!("\"{}\": \"{}\", \"{}\": {},\"{}\": {},\"{}\": \"{}\",\"{}\": {},\"{}\": {}, \"{}\": {}", stringify!(day), day, stringify!(start_hour), start_hour, stringify!(start_minute), start_minute, stringify!(duration), duration, stringify!(alt), alt, stringify!(lng), lng, stringify!(appointment_id), appointment_id);
                
                s.push_str(&full_str);

                s.push('}');

                appointments.push(s);
            }

            for i in &appointments{
                println!("{:?}", i);
            }


            return Ok(Template::render("adminpanel", context!{appointments: appointments}));
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

/* 
#[post("/adminlogin", data = "<admin>")]
pub async fn adminloginfn(admin: Form<admin::Admin>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Template{

    let mut _message: String = "".to_string();
    let existing_admins = sqlx::query(r#"select * from admins where email= $1"#)
        .bind(admin.get_email())
        .bind(admin.get_password())
        .fetch_one(&mut *db)
        .await;
    
        match existing_admins{
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
                        return 
                            Template::render("adminpanel", context!{message: _message})
                }
                else{
                    _message = "Incorrect password".to_string();
                    return Template::render("adminlogin", context!{message: _message})
                }
            }
            Err(err) => {
                match err{
                    Error::RowNotFound => {
                        _message = String::from("No admins found with this email");
                    }
                    _ => {
                        _message = String::from("Trouble connecting to database");
                        println!("{}", err);
                    }
                }
            }
    } 
        Template::render("adminlogin", context! {
            message: _message,
        })

}*/

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
                    //return Ok(Template::render("schedule", context!{message: _message}))
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