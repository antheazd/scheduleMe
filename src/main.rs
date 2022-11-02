#[macro_use] extern crate rocket;
use rocket::{Rocket, Build};
use rocket_db_pools::{Database, Connection};
use rocket_db_pools::sqlx::{self, Row};

#[derive(Database)]
#[database("webappdb")]
struct Logs(sqlx::PgPool);

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}


#[launch]
fn rocket() -> _ {
    rocket::build().attach(Logs::init()).mount("/", routes![index, read])
}