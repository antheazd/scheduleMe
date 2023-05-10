#[allow(dead_code)]
#[allow(unused)]
#[macro_use]
extern crate rocket;
mod admin_functions;
mod components;
mod user_functions;
use crate::components::shared_functions::Logs;
use admin_functions::{
    add_admin_message, adminchat, adminchats, adminlogin, adminloginfn, adminlogout, adminpanel,
    adminpanelget, adminpayments, adminprofile, set_as_paid, user_payments,
};
use rocket::fs::{relative, FileServer};
use rocket_db_pools::Database;
use rocket_dyn_templates::Template;
use std::env;
use user_functions::{
    add_appointment, add_payment, add_user_message, chat, index, indexget, location_get,
    location_post, login, loginfn, logout, not_found, payments, profile, profilepost, schedule,
    signup, signupfn,
};

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Logs::init())
        .mount(
            "/",
            routes![
                index,
                profile,
                profilepost,
                login,
                logout,
                signup,
                signupfn,
                loginfn,
                payments,
                user_payments,
                add_payment,
                chat,
                add_user_message,
                schedule,
                add_appointment,
                indexget,
                adminpanel,
                adminpanelget,
                adminlogin,
                adminloginfn,
                adminlogout,
                adminprofile,
                adminchats,
                adminchat,
                add_admin_message,
                adminpayments,
                location_get,
                location_post,
                set_as_paid
            ],
        )
        .mount("/static", FileServer::from(relative!("public")))
        .register("/", catchers![not_found])
        .attach(Template::fairing())
}
