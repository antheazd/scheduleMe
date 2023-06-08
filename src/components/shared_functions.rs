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
}

pub fn check_cookies(cookies: &CookieJar<'_>) -> bool {
    return (cookies.get_private("id").is_some()
        && cookies.get_private("name").is_some()
        && cookies.get_private("surname").is_some()
        && cookies.get_private("email").is_some());
}
