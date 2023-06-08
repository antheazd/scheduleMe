use serde::{Deserialize, Serialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct UserAppointment {
    id: i64,
    user_id: i64,
    name: String,
    surname: String,
    day: String,
    start_hour: i32,
    start_minute: i32,
    duration: String,
    kind: String,
    price: f32,
    paid: bool,
}

impl UserAppointment {
    pub fn get_id(&self) -> &i64 {
        &self.id
    }
    pub fn get_user_id(&self) -> &i64 {
        &self.user_id
    }
    pub fn get_name(&self) -> &String {
        &self.name
    }
    pub fn get_surname(&self) -> &String {
        &self.surname
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
    pub fn new(
        id: i64,
        user_id: i64,
        name: String,
        surname: String,
        day: String,
        start_hour: i32,
        start_minute: i32,
        duration: String,
        kind: String,
        price: f32,
        paid: bool,
    ) -> Self {
        Self {
            id,
            user_id,
            name,
            surname,
            day,
            start_hour,
            start_minute,
            duration,
            kind,
            price,
            paid,
        }
    }
}
