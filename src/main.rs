#[allow(dead_code)]
#[allow(unused)]
#[macro_use] extern crate rocket;
mod components;
mod sqlx_functions;
//use components::admin as admin;
use rocket_db_pools::{Database};
use rocket_dyn_templates::Template;
use sqlx_functions::{index, userprofile, login, logout, signup, adminpanel, signupfn, loginfn, payments, chat, schedule, indexget, Logs, not_found};



#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(Logs::init())
    .mount("/", routes![index, userprofile, login, logout, signup, adminpanel, signupfn, loginfn, payments, chat, schedule, indexget])
    .register("/", catchers![not_found])
    .attach(Template::fairing())
}