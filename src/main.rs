#[allow(dead_code)]
#[allow(unused)]
#[macro_use] extern crate rocket;
mod components;
mod user_functions;
mod admin_functions;
use rocket::fs::{FileServer, relative};
use rocket_db_pools::{Database};
use rocket_dyn_templates::Template;
use user_functions::{index, userprofile, userprofilepost, login, logout, signup, signupfn, loginfn, payments, add_payment, chat, add_user_message, schedule, add_appointment, indexget, not_found, location_get, location_post};
use admin_functions::{adminpanel, adminpanelget, adminlogin, adminloginfn, adminlogout, adminprofile,  adminchats, adminchat, add_admin_message, adminpayments, user_payments};
use crate::components::shared_functions::Logs as Logs;
use std::env;

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(Logs::init())
    .mount("/", routes![index, userprofile, userprofilepost, login, logout, signup, signupfn, loginfn, payments, user_payments, add_payment, chat, add_user_message, schedule, add_appointment, indexget, adminpanel, adminpanelget,  adminlogin, adminloginfn, adminlogout, adminprofile, adminchats, adminchat, add_admin_message, adminpayments, location_get, location_post])
    .mount("/static", FileServer::from(relative!("public")))     
    .register("/", catchers![not_found])
    .attach(Template::fairing())
}