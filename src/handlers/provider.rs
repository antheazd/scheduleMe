use crate::components::provider::{self, Provider};
use crate::components::appointment::{self as appointment};
use crate::components::message::Message;
use crate::components::response::Response;
use crate::sql_functions::provider::*;
use rocket::form::Form;
use rocket::http::CookieJar;
use rocket::response::Redirect;
use rocket_db_pools::Connection;
use rocket_dyn_templates::context;
use rocket_dyn_templates::Template;

use crate::components::shared_functions::{check_cookies, remove_cookies, Logs};

//Provider schedule
#[get("/providerschedule")]
pub async fn providerschedule_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerschedule", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

#[post("/providerschedule", data = "<appointment>")]
pub async fn providerschedule_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    appointment: Form<appointment::Appointment>,
) -> Result<Template, Redirect> {
    
    match appointment_add(appointment.into_inner(), db, cookies).await {
        Response::Success => Ok(Template::render(
            "providerschedule",
            context! {message: "Appointment added"},
        )),
        Response::ErrorInserting => Ok(Template::render(
            "providerschedule",
            context! {message: "Error adding appointment"},
        )),
        _ => Err(Redirect::to(uri!(providerlogin_get()))),
    }
}

//Provider profile
#[get("/providerprofile")]
pub async fn providerprofile_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerprofile", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

//Provider login
#[get("/providerlogin")]
pub fn providerlogin_get() -> Template {
    Template::render(
        "providerlogin",
        context! {
            message: "",
        },
    )
}

#[post("/providerlogin", data = "<provider>")]
pub async fn providerlogin_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    provider: Form<provider::Provider>,
) -> Result<Redirect, Template> {
    match provider_login(db, cookies, provider.into_inner()).await {
        Response::Success => Ok(Redirect::to(uri!(providerschedule_get()))),
        Response::UserNotFound => Err(Template::render(
            "providerlogin",
            context! {message: "Provider with this mail does not exist"},
        )),
        _ => Err(Template::render(
            "providerlogin",
            context! {message: "Wrong password"},
        )),
    }
}

//Sign up
#[get("/providersignup")]
pub fn providersignup_get() -> Template {
    Template::render(
        "providersignup",
        context! {
            message: "",
        },
    )
}

#[post("/providersignup", data = "<provider>")]
pub async fn providersignup_post(
    provider: Form<Provider>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Redirect {
    match provider_add(provider.into_inner(), db, cookies).await {
        Response::Success => Redirect::to(uri!(providerschedule_get)),
        Response::UserExists => Redirect::to(uri!(providerlogin_get)),
        _ => Redirect::to(uri!(providersignup_get)),
    }
}

//Provider log out
#[get("/providerlogout")]
pub fn providerlogout_get(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(providerlogin_get()))
}

//Provider chat
#[get("/providerchat")]
pub async fn providerchats_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerchats", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

#[get("/providerchat/<_>")]
pub async fn providerchat_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerchat", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

#[post("/providerchat/<user_id>", data = "<message>")]
pub async fn providerchat_post(
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
        _ => Err(Redirect::to(uri!(providerlogin_get()))),
    }
}

//Provider payments
#[get("/providerpayments")]
pub async fn providerpayments_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerpayments", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

#[get("/providerpayments/<user_id>")]
pub async fn providerpayment_get(cookies: &CookieJar<'_>, user_id: i64) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("providerpayment", context! {}));
    }
    return Err(Redirect::to(uri!(providerlogin_get())));
}

#[post("/providerpayments/<user_id>", data = "<app_id>")]
pub async fn providerpayment_post(
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    app_id: String,
    user_id: i64
) -> Redirect {
    match payment_add(db, cookies, app_id).await {
        Response::Success => Redirect::to(uri!(providerpayment_get(user_id))),
        Response::ErrorInserting => Redirect::to(uri!(providerpayment_get(user_id))),
        _ => Redirect::to(uri!(providerlogin_get())),
    }
}
