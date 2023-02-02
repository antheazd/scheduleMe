#[allow(dead_code)]
#[allow(unused)]
#[macro_use] extern crate rocket;
mod components;
mod sqlx_functions;
use rocket::fs::{self, FileServer, relative};
//use components::admin as admin;
use rocket_db_pools::{Database};
use rocket_dyn_templates::Template;
use sqlx_functions::{index, userprofile, userprofilepost, login, logout, signup, adminpanel, signupfn, loginfn, payments, chat, schedule, add_appointment, indexget, Logs, not_found, adminpanelget, adminlogin, adminloginfn, adminlogout};
use std::env;

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(Logs::init())
    .mount("/", routes![index, userprofile, userprofilepost, login, logout, signup, signupfn, loginfn, payments, chat, schedule, add_appointment, indexget, adminpanel, adminpanelget,  adminlogin, adminloginfn, adminlogout])
    .mount("/static", FileServer::from(relative!("public")))     
    .register("/", catchers![not_found])
    .attach(Template::fairing())
}