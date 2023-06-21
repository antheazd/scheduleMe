#[allow(dead_code)]
#[allow(unused)]
#[macro_use]
extern crate rocket;

mod components;
mod dtos;
mod sql_functions;
mod handlers;

use crate::components::shared_functions::Logs;

use crate::sql_functions::provider::*;
use crate::sql_functions::user::*;

use crate::handlers::provider::*;
use crate::handlers::user::*;
use crate::handlers::public::*;

use handlers::public::faq_get;
use rocket::fs::{relative, FileServer};
use rocket_db_pools::Database;
use rocket_dyn_templates::Template;
use std::env;

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
                providers_get,
                providersignup_get,
                providersignup_post,
                providerlogin_get,
                providerlogin_post,
                providerschedule_get,
                providerschedule_post,
                providerchats_get,
                providerchat_get,
                providerchat_post,
                providerpayments_get,
                providerpayment_get,
                providerpayment_post,
                providerprofile_get,
                providerlogout_get,
                schedule_appointments,
                schedule_info,
                ordered_users,
                ordered_users_with_location,
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
                providers_info,
                provider_info,
                payment_add,
                contacts_get,
                socialmedia_get,
                privacypolicy_get,
                termsofservice_get,
                support_get,
                faq_get
            ],
        )
        .mount("/static", FileServer::from(relative!("public")))
        .register("/", catchers![not_found])
        .attach(Template::fairing())
}
