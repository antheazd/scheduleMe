use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct UserAppointmentLocation {
    id: i64,
    user_id: i64,
    user_name: String,
    user_surname: String,
    day: String,
    start_hour: i32,
    start_minute: i32,
    duration: String,
    kind: String,
    price: f32,
    paid: bool,
    description: String,
    alt: f64,
    lng: f64,
}

impl UserAppointmentLocation {
    pub fn get_id(&self) -> &i64 {
        &self.id
    }
    pub fn get_user_id(&self) -> &i64 {
        &self.user_id
    }
    pub fn get_user_name(&self) -> &String {
        &self.user_name
    }
    pub fn get_user_surname(&self) -> &String {
        &self.user_surname
    }
    pub fn get_day(&self) -> &String {
        &self.day
    }
    pub fn get_start_hour(&self) -> &i32 {
        &self.start_hour
    }
    pub fn get_start_minute(&self) -> &i32 {
        &self.start_minute
    }
    pub fn get_duration(&self) -> &String {
        &self.duration
    }
    pub fn get_kind(&self) -> &String {
        &self.kind
    }
    pub fn get_price(&self) -> &f32 {
        &self.price
    }
    pub fn get_paid(&self) -> &bool {
        &self.paid
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
        id: i64,
        user_id: i64,
        user_name: String,
        user_surname: String,
        day: String,
        start_hour: i32,
        start_minute: i32,
        duration: String,
        kind: String,
        price: f32,
        paid: bool,
        description: String,
        alt: f64,
        lng: f64,
    ) -> Self {
        Self {
            id,
            user_id,
            user_name,
            user_surname,
            day,
            start_hour,
            start_minute,
            duration,
            kind,
            price,
            paid,
            description,
            alt,
            lng,
        }
    }
}
