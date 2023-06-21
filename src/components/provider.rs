use serde::{Deserialize, Serialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Provider {
    id: Option<i64>,
    name: Option<String>,
    surname: Option<String>,
    email: String,
    password: String,
    phone: Option<String>,
}

impl Provider {
    pub fn get_id(&self) -> &Option<i64> {
        &self.id
    }
    pub fn get_name(&self) -> &Option<String> {
        &self.name
    }
    pub fn get_surname(&self) -> &Option<String> {
        &self.surname
    }
    pub fn get_email(&self) -> &String {
        &self.email
    }
    pub fn get_password(&self) -> &String {
        &self.password
    }
    pub fn get_phone(&self) -> &Option<String> {
        &self.phone
    }
    pub fn new(
        id: Option<i64>,
        name: Option<String>,
        surname: Option<String>,
        email: String,
        password: String,
        phone: Option<String>,
    ) -> Provider {
        Provider {
            id,
            name,
            surname,
            email,
            password,
            phone,
        }
    }
}
