use serde::{Deserialize, Serialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Location {
    id: Option<i64>,
    user_id: Option<i64>,
    description: String,
    alt: f64,
    lng: f64,
}

impl Location {
    pub fn get_id(&self) -> &Option<i64> {
        &self.id
    }
    pub fn get_user_id(&self) -> &Option<i64> {
        &self.user_id
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
        id: Option<i64>,
        user_id: Option<i64>,
        description: String,
        alt: f64,
        lng: f64,
    ) -> Self {
        Self {
            id,
            user_id,
            description,
            alt,
            lng,
        }
    }
}
