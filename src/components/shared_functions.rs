use rocket::http::{Cookie, CookieJar};
use rocket_db_pools::sqlx::{self};
use rocket_db_pools::Database;

#[derive(Database)]
#[database("webappdb")]
pub struct Logs(sqlx::PgPool);

pub fn create_cookies(
    id: Option<i64>,
    name: Option<String>,
    surname: Option<String>,
    email: String,
    password: String,
    cookies: &CookieJar<'_>,
) {
    cookies.add_private(Cookie::new("id", id.unwrap().to_string()));
    cookies.add_private(Cookie::new("name", name.unwrap()));
    cookies.add_private(Cookie::new("surname", surname.unwrap()));
    cookies.add_private(Cookie::new("email", email));
    cookies.add_private(Cookie::new("password", password));
}

pub fn remove_cookies(cookies: &CookieJar<'_>) {
    cookies.remove_private(Cookie::named("id"));
    cookies.remove_private(Cookie::named("name"));
    cookies.remove_private(Cookie::named("surname"));
    cookies.remove_private(Cookie::named("email"));
    cookies.remove_private(Cookie::named("password"));
}

pub fn check_cookies(cookies: &CookieJar<'_>) -> bool {
    return (cookies.get_private("id").is_some()
        && cookies.get_private("name").is_some()
        && cookies.get_private("surname").is_some()
        && cookies.get_private("email").is_some()
        && cookies.get_private("password").is_some());
}

pub fn update_location_cookies(cookies: &CookieJar<'_>, alt: f64, lng: f64) {
    cookies.add_private(Cookie::new("alt", alt.to_string()));
    cookies.add_private(Cookie::new("lng", lng.to_string()));
}

pub fn get_cookie_id(cookies: &CookieJar<'_>) -> i64 {
    return cookies
        .get_private("id")
        .expect("id not found in cookies")
        .value()
        .to_string()
        .parse::<i64>()
        .unwrap();
}

pub fn get_cookie_name(cookies: &CookieJar<'_>) -> String {
    return cookies
        .get_private("name")
        .expect("name not found in cookies")
        .value()
        .to_string();
}

pub fn get_cookie_surname(cookies: &CookieJar<'_>) -> String {
    return cookies
        .get_private("surname")
        .expect("surname not found in cookies")
        .value()
        .to_string();
}

pub fn get_cookie_email(cookies: &CookieJar<'_>) -> String {
    return cookies
        .get_private("email")
        .expect("email not found in cookies")
        .value()
        .to_string();
}

pub fn get_cookie_password(cookies: &CookieJar<'_>) -> String {
    return cookies
        .get_private("password")
        .expect("password not found in cookies")
        .value()
        .to_string();
}

pub fn get_cookie_alt(cookies: &CookieJar<'_>) -> f64 {
    return cookies
        .get_private("alt")
        .expect("alt not found in cookies")
        .value()
        .to_string()
        .parse::<f64>()
        .unwrap();
}

pub fn get_cookie_lng(cookies: &CookieJar<'_>) -> f64 {
    return cookies
        .get_private("lng")
        .expect("lng not found in cookies")
        .value()
        .to_string()
        .parse::<f64>()
        .unwrap();
}
