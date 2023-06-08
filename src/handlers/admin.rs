use crate::components::admin::{self};
use crate::components::appointment::{self as appointment};
use crate::components::message::Message;
use crate::components::response::Response;
use crate::sql_functions::admin::*;
use rocket::form::Form;
use rocket::http::CookieJar;
use rocket::response::Redirect;
use rocket_db_pools::Connection;
use rocket_dyn_templates::context;
use rocket_dyn_templates::Template;

use crate::components::shared_functions::{check_cookies, remove_cookies, Logs};

//Admin schedule
#[get("/adminschedule")]
pub async fn adminschedule_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminschedule", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

#[post("/adminschedule", data = "<appointment>")]
pub async fn adminschedule_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    appointment: Form<appointment::Appointment>,
) -> Result<Template, Redirect> {
    match appointment_add(appointment.into_inner(), db, cookies).await {
        Response::Success => Ok(Template::render(
            "adminschedule",
            context! {message: "Appointment added"},
        )),
        Response::ErrorInserting => Ok(Template::render(
            "adminschedule",
            context! {message: "Error adding appointment"},
        )),
        _ => Err(Redirect::to(uri!(adminlogin_get()))),
    }
}

//Admin profile
#[get("/adminprofile")]
pub async fn adminprofile_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminprofile", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

//Admin login
#[get("/adminlogin")]
pub fn adminlogin_get() -> Template {
    Template::render(
        "adminlogin",
        context! {
            message: "",
        },
    )
}

#[post("/adminlogin", data = "<admin>")]
pub async fn adminlogin_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    admin: Form<admin::Admin>,
) -> Result<Redirect, Template> {
    match admin_login(db, cookies, admin.into_inner()).await {
        Response::Success => Ok(Redirect::to(uri!(adminschedule_get()))),
        Response::UserNotFound => Err(Template::render(
            "adminlogin",
            context! {message: "Admin with this mail does not exist"},
        )),
        _ => Err(Template::render(
            "adminlogin",
            context! {message: "Wrong password"},
        )),
    }
}

//Admin log out
#[get("/adminlogout")]
pub fn adminlogout_get(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(adminlogin_get()))
}

//Admin chat
#[get("/adminchat")]
pub async fn adminchats_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminchats", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

#[get("/adminchat/<_>")]
pub async fn adminchat_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminchat", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

#[post("/adminchat/<user_id>", data = "<message>")]
pub async fn adminchat_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    message: Form<Message>,
    user_id: i64,
) -> Result<Template, Redirect> {
    match message_add(db, cookies, message.into_inner(), user_id).await {
        Response::Success => Ok(Template::render("chat", context! {})),
        Response::ErrorInserting => Ok(Template::render(
            "chat",
            context! {message: "Error occured while sending message"},
        )),
        _ => Err(Redirect::to(uri!(adminlogin_get()))),
    }
}

//Admin payments
#[get("/adminpayments")]
pub async fn adminpayments_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminpayments", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

#[get("/adminpayments/<_>")]
pub async fn adminpayment_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("adminpayment", context! {}));
    }
    return Err(Redirect::to(uri!(adminlogin_get())));
}

#[post("/adminpayments/<_>", data = "<app_id>")]
pub async fn adminpayment_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    app_id: String,
) -> Result<Template, Redirect> {
    match payment_add(db, cookies, app_id).await {
        Response::Success => Ok(Template::render(
            "chat",
            context! {messsage: "Appointment set as paid"},
        )),
        Response::ErrorInserting => Ok(Template::render(
            "chat",
            context! {messsage: "Error while executing request"},
        )),
        _ => Err(Redirect::to(uri!(adminlogin_get()))),
    }
}
