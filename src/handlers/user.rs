use crate::components::appointment::{self as appointment};
use crate::components::location::{self as location};
use crate::components::message::Message;
use crate::components::response::Response;
use crate::components::shared_functions::Logs;
use crate::components::shared_functions::{check_cookies, remove_cookies};
use crate::components::user::*;
use crate::sql_functions::user::*;
use rocket::form::Form;
use rocket::http::CookieJar;
use rocket::response::Redirect;
use rocket_db_pools::Connection;
use rocket_dyn_templates::context;
use rocket_dyn_templates::Template;

//Error
#[catch(404)]
pub fn not_found() -> Template {
    Template::render("login", context! {})
}

//Index
#[get("/")]
pub fn index_get(cookies: &CookieJar<'_>) -> Template {
    return Template::render("index", context! {});
}

//Profile
#[get("/profile/<_>")]
pub async fn profile_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("profile", context! {}));
    }
    return Err(Redirect::to(uri!(login_get())));
}

#[post("/profile/<_>", data = "<location>")]
pub async fn profile_post(
    location: Form<location::Location>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Template {
    match location_update(location.into_inner(), cookies, db).await {
        Response::Success => Template::render("profile", context! {}),
        _ => Template::render("profile", context! {message: "Error updating location"}),
    }
}

//Chat
#[get("/chat/<_>")]
pub async fn chat_get(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("chat", context! {}));
    }
    return Err(Redirect::to(uri!(login_get())));
}

#[post("/chat/<provider_id>", data = "<message>")]
pub async fn chat_post(
    message: Form<Message>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    provider_id: i64,
) -> Result<Redirect, Template> {
    match message_add(message.into_inner(), db, cookies, provider_id).await {
        Response::Success => return Ok(Redirect::to(uri!(chat_get(provider_id)))),
        Response::ErrorInserting => {
            return Err(Template::render(
                "chat",
                context! {message: "Message not sent"},
            ))
        }
        _ => return Ok(Redirect::to(uri!(login_get()))),
    }
}

//Schedule
#[get("/schedule/<provider_id>")]
pub async fn schedule_get(cookies: &CookieJar<'_>, provider_id: i64) -> Result<Template, Redirect> {
    match check_cookies(cookies) {
        true => {
            return Ok(Template::render("schedule", context! {}));
        }
        _ => {
            return Err(Redirect::to(uri!(login_get())));
        }
    }
}

#[post("/schedule/<provider_id>", data = "<appointment>")]
pub async fn schedule_post(
    appointment: Form<appointment::Appointment>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
    provider_id: i64,
) -> Result<Template, Redirect> {
    match appointment_add(appointment.into_inner(), db, cookies, provider_id).await {
        Response::Success => {
            return Ok(Template::render(
                "schedule",
                context! {message: "Appointment added"},
            ))
        }
        Response::ErrorInserting => {
            return Ok(Template::render(
                "schedule",
                context! {message: "Appointment added"},
            ))
        }
        _ => Err(Redirect::to(uri!(login_get()))),
    }
}

//Payments
#[get("/payments/<_>")]
pub async fn payments_get(
    cookies: &CookieJar<'_>,
    db: Connection<Logs>,
) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("payments", context! {}));
    }
    return Err(Redirect::to(uri!(login_get())));
}

#[post("/payments/<_>", data = "<response>")]
pub async fn payments_post(
    response: String,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Result<Template, Redirect> {
    if check_cookies(cookies) {
        return Ok(Template::render("payments", context! {}));
    }
    return Err(Redirect::to(uri!(login_get())));
}

//Log in
#[get("/login")]
pub fn login_get() -> Template {
    Template::render(
        "login",
        context! {
            message: "",
        },
    )
}

#[post("/login", data = "<user>")]
pub async fn login_post(
    user: Form<User>,
    cookies: &CookieJar<'_>,
    db: Connection<Logs>,
) -> Result<Redirect, Template> {
    match user_login(
        db,
        cookies,
        user.get_email().clone(),
        user.get_password().clone(),
    )
    .await
    {
        Response::Success => Ok(Redirect::to(uri!(providers_get()))),
        Response::UserNotFound => Ok(Redirect::to(uri!(signup_get()))),
        _ => Err(Template::render(
            "login",
            context! {message: "Wrong password!"},
        )),
    }
}

//Log out
#[get("/logout")]
pub fn logout_get(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(login_get()))
}

//Sign up
#[get("/signup")]
pub fn signup_get() -> Template {
    Template::render(
        "signup",
        context! {
            message: "",
        },
    )
}

#[post("/signup", data = "<user>")]
pub async fn signup_post(
    user: Form<User>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Redirect {
    match user_add(user, db, cookies).await {
        Response::Success => Redirect::to(uri!(location_get)),
        Response::UserExists => Redirect::to(uri!(login_get)),
        _ => Redirect::to(uri!(signup_get)),
    }
}

//Location
#[get("/location")]
pub fn location_get() -> Template {
    Template::render("location", context! {})
}

#[post("/location", data = "<location>")]
pub async fn location_post(
    location: Form<location::Location>,
    db: Connection<Logs>,
    cookies: &CookieJar<'_>,
) -> Redirect {
    match location_add(db, cookies, location.into_inner()).await {
        Response::Success => Redirect::to(uri!(providers_get)),
        _ => Redirect::to(uri!(signup_get)),
    }
}

//Providers
#[get("/providers")]
pub async fn providers_get(cookies: &CookieJar<'_>) -> Template {
    return Template::render("providers", context! {});
}
