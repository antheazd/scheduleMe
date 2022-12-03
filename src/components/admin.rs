/*#[derive(FromForm, Debug)]
struct Admin{
    id: Option<i64>,
    name: Option<String>,
    surname: Option<String>,
    email: String,
    password: String
}

impl Admin{
    pub fn get_name(&self)-> &Option<String>{
        &self.name
    }
    pub fn get_surname(&self)-> &Option<String>{
        &self.surname
    }
    pub fn get_email(&self)-> &String{
        &self.email
    }
    pub fn get_password(&self) -> &String{
        &self.password
    }
    pub fn new(id: Option<i64>, name: Option<String>, surname: Option<String>, email: String, password: String)-> Admin {
        Admin{ 
             id,
             name,
             surname,
             email,
             password
     }}
    } 
    */