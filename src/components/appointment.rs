use serde::{Deserialize, Serialize};
use std::hash::{Hash, Hasher};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Appointment {
    id: Option<i64>,
    user_id: Option<i64>,
    provider_id: Option<i64>,
    day: String,
    start_hour: i32,
    start_minute: i32,
    duration: String,
    kind: String,
    price: Option<f32>,
    paid: bool,
}

impl Appointment {
    pub fn get_id(&self) -> &Option<i64> {
        &self.id
    }
    pub fn get_user_id(&self) -> &Option<i64> {
        &self.user_id
    }
    pub fn get_provider_id(&self) -> &Option<i64> {
        &self.provider_id
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
    pub fn get_price(&self) -> &Option<f32> {
        &self.price
    }
    pub fn get_paid(&self) -> &bool {
        &self.paid
    }
    pub fn new(
        id: Option<i64>,
        user_id: Option<i64>,
        provider_id: Option<i64>,
        day: String,
        start_hour: i32,
        start_minute: i32,
        duration: String,
        kind: String,
        price: Option<f32>,
        paid: bool,
    ) -> Self {
        Self {
            id,
            user_id,
            provider_id,
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
