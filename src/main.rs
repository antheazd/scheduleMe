#[allow(dead_code)]
#[allow(unused)]
#[macro_use]
extern crate rocket;
mod admin_handlers;
mod components;
mod dtos;
mod sql_functions;
mod user_handlers;
use crate::components::shared_functions::Logs;
use crate::sql_functions::admin::*;
use crate::sql_functions::user::*;
use admin_handlers::*;
use rocket::fs::{relative, FileServer};
use rocket_db_pools::Database;
use rocket_dyn_templates::Template;
use std::env;
use user_handlers::*;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Logs::init())
        .mount(
            "/",
            routes![
                index_get,
                login_get,
                login_post,
                signup_get,
                signup_post,
                location_get,
                location_post,
                schedule_get,
                schedule_post,
                chat_get,
                chat_post,
                payments_get,
                payments_post,
                profile_get,
                profile_post,
                logout_get,
                adminlogin_get,
                adminlogin_post,
                adminschedule_get,
                adminschedule_post,
                adminchats_get,
                adminchat_get,
                adminchat_post,
                adminpayments_get,
                adminpayment_get,
                adminpayment_post,
                adminprofile_get,
                adminlogout_get,
                schedule_appointments,
                schedule_info,
                ordered_users,
                users_with_existing_chat,
                users_without_chat,
                user_chat,
                existing_debt,
                user_messages,
                user_payments,
                user_payments_info,
                user_location,
                user_location_info,
                user_detailed_info,
                admin_info
            ],
        )
        .mount("/static", FileServer::from(relative!("public")))
        .register("/", catchers![not_found])
        .attach(Template::fairing())
}
