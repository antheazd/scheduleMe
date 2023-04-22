use serde::{Serialize, Deserialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct User{
    id: Option<i64>,
    name: Option<String>,
    surname: Option<String>,
    phone: Option<String>,
    email: String,
    password: String,
    description: Option<String>,
}

impl User{
    pub fn get_id(&self) -> &Option<i64>{
        &self.id
    }
    pub fn get_name(&self)-> &Option<String>{
        &self.name
    }
    pub fn get_surname(&self)-> &Option<String>{
        &self.surname
    }
    pub fn get_phone(&self) -> &String{
        &self.password
    }
    pub fn get_email(&self)-> &String{
        &self.email
    }
    pub fn get_password(&self) -> &String{
        &self.password
    }
    pub fn get_description(&self) -> &Option<String>{
        &self.description
    }
    
    pub fn new(id: Option<i64>, name: Option<String>, surname: Option<String>, phone: Option<String>, email: String, password: String, description: Option<String>)-> Self {
        Self{ 
             id,
             name,
             surname,
             phone,
             email,
             password,
             description
     }} 
    }