//use components::admin as admin;
use rocket::http::{Cookie, CookieJar};
use rocket_db_pools::{Database, Connection};
use rocket_db_pools::sqlx::{self, Row, Error};
use rocket::form::Form;
use rocket_dyn_templates::Template;
use rocket_dyn_templates::context;
use rocket::response::Redirect;
use crate::components::user as user;
use crate::components::admin as admin;

#[derive(Database)]
#[database("webappdb")]
pub struct Logs(sqlx::PgPool);

pub fn create_cookies(id: Option<i32>, name: Option<String>, surname: Option<String>, email: String, cookies: &CookieJar<'_>){
    cookies.add_private(Cookie::new("id", id.unwrap().to_string()));
    cookies.add_private(Cookie::new("name", name.unwrap()));
    cookies.add_private(Cookie::new("surname", surname.unwrap()));
    cookies.add_private(Cookie::new("email", email));
}

pub fn remove_cookies(cookies: &CookieJar<'_>){
    cookies.remove_private(Cookie::named("id"));
    cookies.remove_private(Cookie::named("name"));
    cookies.remove_private(Cookie::named("surname"));
    cookies.remove_private(Cookie::named("email"));
}

#[catch(404)]
pub fn not_found() -> Template {
    Template::render("", context! {})
}

#[post("/")]
pub fn index() -> Template {
    Template::render("index", context!{})
}

#[get("/")]
pub async fn indexget(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("index", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/userprofile")]
pub async fn userprofile(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("userprofile", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}


#[get("/chat")]
pub async fn chat(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("chat", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/schedule")]
pub async fn schedule(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("schedule", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/payments")]
pub async fn payments(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("payments", context! {}))
    }
    Err(Redirect::to(uri!(login())))
}

#[get("/login")]
pub fn login() -> Template {
    Template::render("login", context! {
        message: "",
    })
}

#[post("/login", data = "<user>")]
pub async fn loginfn(user: Form<user::User>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Template{

    let mut _message: String = "".to_string();
    let existing_users = sqlx::query(r#"select * from users where email= $1"#)
        .bind(user.get_email())
        .bind(user.get_password())
        .fetch_one(&mut *db)
        .await;
    
        match existing_users{
            Ok(data) => {
                let id: Option<i32> = data.get("id");
                let name: Option<String> = data.get("name");
                let surname: Option<String> = data.get("surname");
                let email: String = data.get("email");
                let password: String = data.get("password");
                if password == user.get_password().as_str(){

                println!("Success");
                _message = "Success".to_string();

                create_cookies(id, name, surname, email, cookies);
                return 
                    Template::render("index", context!{message: _message})
                }
                else{
                    _message = "Incorrect password".to_string();
                    return Template::render("login", context!{message: _message})
                }
            }
            Err(err) => {
                match err{
                    Error::RowNotFound => {
                        _message = String::from("No users found with this email");
                    }
                    _ => {
                        _message = String::from("Trouble connecting to database");
                        println!("{}", err);
                    }
                }
            }
    } 
        Template::render("signup", context! {
            message: _message,
        })

}

#[get("/logout")]
pub fn logout(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(login()))
}

#[get("/signup")]
pub fn signup() -> Template {
    Template::render("signup", context! {
        message: "",
    })
}

#[post("/signup", data = "<user>")]
pub async fn signupfn(user: Form<user::User>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Template{

let existing_users = sqlx::query(r#"select count(id) as count from users where email= $1"#)
    .bind(user.get_email())
    .fetch_one(&mut *db)
    .await;

    let mut count: i64 = 0;
    let mut success: bool = false;
    let mut message: String = String::from("");
    match existing_users{
        Ok(data) => {
            count = data.get("count");
            println!("{}", count);
        }
        Err(err) => {
            println!("{err}");
            message = err.to_string();
        }
    }
    if count == 0 {
            let query = rocket_db_pools::sqlx::query(r#"INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4) "#)
                .bind(user.get_name())
                .bind(user.get_surname())
                .bind(user.get_email())
                .bind(user.get_password())
                .execute(&mut *db)
                .await;
                match query{
                    Ok(_fine) => {
                        success = true;
                        println!("Inserted!");
                        let get_id = sqlx::query(r#"select * from users where email= $1"#)
                                .bind(user.get_email())
                                .fetch_one(&mut *db)
                                .await;
                                match get_id{
                                    Ok(id_result) =>{
                                        let id: Option<i32> = id_result.get("id");
                                        let name: Option<String> = id_result.get("name");
                                        let surname: Option<String> = id_result.get("surname");
                                        let email: String = id_result.get("email");
                                        create_cookies(id, name, surname, email, cookies);
                                        return 
                                            Template::render("index", context! {
                                                message: "Success",
                                                username: user.get_name(),
                                                usersurname: user.get_surname(),
                                                usermail: user.get_email(),
                                                userpassword: user.get_password()})

                                    }
                                    Err(e) =>{
                                        println!("{e}")
                                    }
                                }
                            
                    }
                    Err(error) => {
                        println!("Err:{}", error);
                        message = error.to_string();}
            }
            
        }
    else {
            println!("Already exists");
            message = String::from("User with this email already exists");
            
        }

    if success {
        return 
        Template::render("index", context! {
            message: "Success",
            username: user.get_name(),
            usersurname: user.get_surname(),
            usermail: user.get_email(),
            userpassword: user.get_password()
        })
    }

    Template::render("signup", context! {
        message: message,
    })
} 
//admin
#[post("/adminpanel")]
pub fn adminpanel() -> Template {
    Template::render("admin", context! {
        message: "",
    })

}

#[get("/adminpanel")]
pub async fn adminpanelget(cookies: &CookieJar<'_>) -> Result<Template, Redirect> {
    if cookies.get_private("id").is_some(){
        return Ok(Template::render("adminpanel", context! {}))
    }
    Err(Redirect::to(uri!(adminlogin())))
}

#[get("/adminlogin")]
pub fn adminlogin() -> Template {
    Template::render("adminlogin", context! {
        message: "",
    })
}


#[post("/adminlogin", data = "<admin>")]
pub async fn adminloginfn(admin: Form<admin::Admin>, mut db: Connection<Logs>, cookies: &CookieJar<'_>) -> Template{

    let mut _message: String = "".to_string();
    let existing_admins = sqlx::query(r#"select * from admins where email= $1"#)
        .bind(admin.get_email())
        .bind(admin.get_password())
        .fetch_one(&mut *db)
        .await;
    
        match existing_admins{
            Ok(data) => {
                let id: Option<i32> = data.get("id");
                let name: Option<String> = data.get("name");
                let surname: Option<String> = data.get("surname");
                let email: String = data.get("email");
                let password: String = data.get("password");
                if password == admin.get_password().as_str(){

                        println!("Success");
                        _message = "Success".to_string();

                        create_cookies(id, name, surname, email, cookies);
                        return 
                            Template::render("adminpanel", context!{message: _message})
                }
                else{
                    _message = "Incorrect password".to_string();
                    return Template::render("adminlogin", context!{message: _message})
                }
            }
            Err(err) => {
                match err{
                    Error::RowNotFound => {
                        _message = String::from("No admins found with this email");
                    }
                    _ => {
                        _message = String::from("Trouble connecting to database");
                        println!("{}", err);
                    }
                }
            }
    } 
        Template::render("adminlogin", context! {
            message: _message,
        })

}

#[get("/adminlogout")]
pub fn adminlogout(cookies: &CookieJar<'_>) -> Redirect {
    remove_cookies(cookies);
    Redirect::to(uri!(adminlogin()))
}