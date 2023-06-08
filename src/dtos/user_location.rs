use serde::{Deserialize, Serialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct UserLocation {
    user_id: i64,
    name: String,
    surname: String,
    phone: String,
    email: String,
    description: String,
    alt: f64,
    lng: f64,
}

impl UserLocation {
    pub fn get_user_id(&self) -> &i64 {
        &self.user_id
    }
    pub fn get_name(&self) -> &String {
        &self.name
    }
    pub fn get_surname(&self) -> &String {
        &self.surname
    }
    pub fn get_phone(&self) -> &String {
        &self.phone
    }
    pub fn get_email(&self) -> &String {
        &self.email
    }
    pub fn get_description(&self) -> &String {
        &self.description
    }
    pub fn get_alt(&self) -> &f64 {
        &self.alt
    }
    pub fn get_lng(&self) -> &f64 {
        &self.lng
    }

    pub fn new(
        user_id: i64,
        name: String,
        surname: String,
        phone: String,
        email: String,
        description: String,
        alt: f64,
        lng: f64,
    ) -> Self {
        Self {
            user_id,
            name,
            surname,
            phone,
            email,
            description,
            alt,
            lng,
        }
    }
}
