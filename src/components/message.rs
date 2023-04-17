use serde::{Serialize, Deserialize};
use sqlx::types::chrono;

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Message{
    id: Option<i64>,
    user_id: Option<i64>,
    admin_id: Option<i64>,
    created: Option<i64>,
    content: String,
    is_admin: Option<bool>
}

impl Message{
    pub fn get_id(&self) -> &Option<i64>{
        &self.id
    }
    pub fn get_user_id(&self)-> &Option<i64>{
        &self.user_id
    }
    pub fn get_admin_id(&self)-> &Option<i64>{
        &self.admin_id
    }
    pub fn get_created(&self)-> &Option<i64>{
        &self.created
    }
    pub fn get_content(&self) -> &String{
        &self.content
    }
    pub fn get_is_admin(&self) -> &Option<bool>{
        &self.is_admin
    }
    
    pub fn new(id: Option<i64>, user_id: Option<i64>, admin_id: Option<i64>, created: Option<i64>, content: String, is_admin: Option<bool>)-> Self {
        Self{ 
            id,
            user_id,
            admin_id,
            created,
            content,
            is_admin
     }} 
    }