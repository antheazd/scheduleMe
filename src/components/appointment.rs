use serde::{Serialize, Deserialize};
use std::hash::{Hash, Hasher};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Appointment{
    id: Option<i64>,
    user_id: Option<i64>,
    day: String,
    start_hour: i32,
    start_minute: i32,
    duration: String,
    price: Option<f32>
}

impl Appointment{
    pub fn get_id(&self)-> &Option<i64>{
        &self.id
    }
    pub fn get_user_id(&self)-> &Option<i64>{
        &self.user_id
    }
    pub fn get_day(&self)-> &String{
        &self.day
    }
    pub fn get_start_hour(&self)-> &i32{
        &self.start_hour
    }
    pub fn get_start_minute(&self)-> &i32{
        &self.start_minute
    }
    pub fn get_duration(&self) -> &String{
        &self.duration
    }
    pub fn get_price(&self) -> &Option<f32>{
        &self.price
    }
    pub fn new(id: Option<i64>, user_id: Option<i64>, day: String, start_hour: i32, start_minute: i32, duration: String, price: Option<f32>)-> Self {
        Self{ 
             id,
             user_id,
             day,
             start_hour,
             start_minute,
             duration,
             price}
    } 
    } 

