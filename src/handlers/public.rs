use rocket_dyn_templates::{Template, context};

#[get("/contacts")]
pub fn contacts_get() -> Template {
    Template::render(
        "contacts",
        context! {
            message: "",
        },
    )
}
#[get("/socialmedia")]
pub fn socialmedia_get() -> Template {
    Template::render(
        "socialmedia",
        context! {
            message: "",
        },
    )
}
#[get("/privacypolicy")]
pub fn privacypolicy_get() -> Template {
    Template::render(
        "privacypolicy",
        context! {
            message: "",
        },
    )
}
#[get("/termsofservice")]
pub fn termsofservice_get() -> Template {
    Template::render(
        "termsofservice",
        context! {
            message: "",
        },
    )
}

#[get("/support")]
pub fn support_get() -> Template {
    Template::render(
        "support",
        context! {
            message: "",
        },
    )
}

#[get("/faq")]
pub fn faq_get() -> Template {
    Template::render(
        "faq",
        context! {
            message: "",
        },
    )
}