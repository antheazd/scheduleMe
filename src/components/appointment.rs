use serde::{Serialize, Deserialize};
use crate::components::user;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Appointment{
    id: Option<i64>,
    user: user::User,
    place: String,
    start_time: i32,
    end_time: i32
}

impl Appointment{
    pub fn get_user(&self)-> &Option<i64>{
        &self.user.get_id()
    }
    pub fn get_place(&self)-> &String{
        &self.place
    }
    pub fn get_start_time(&self)-> &i32{
        &self.start_time
    }
    pub fn get_end_time(&self) -> &i32{
        &self.end_time
    }
    } 
    