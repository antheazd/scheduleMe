use serde::{Deserialize, Serialize};

#[derive(FromForm, Debug, Serialize, Deserialize, Clone)]
pub struct Message {
    id: Option<i64>,
    user_id: Option<i64>,
    provider_id: Option<i64>,
    created: Option<i64>,
    content: String,
    is_provider: Option<bool>,
}

impl Message {
    pub fn get_id(&self) -> &Option<i64> {
        &self.id
    }
    pub fn get_user_id(&self) -> &Option<i64> {
        &self.user_id
    }
    pub fn get_provider_id(&self) -> &Option<i64> {
        &self.provider_id
    }
    pub fn get_created(&self) -> &Option<i64> {
        &self.created
    }
    pub fn get_content(&self) -> &String {
        &self.content
    }
    pub fn get_is_provider(&self) -> &Option<bool> {
        &self.is_provider
    }

    pub fn new(
        id: Option<i64>,
        user_id: Option<i64>,
        provider_id: Option<i64>,
        created: Option<i64>,
        content: String,
        is_provider: Option<bool>,
    ) -> Self {
        Self {
            id,
            user_id,
            provider_id,
            created,
            content,
            is_provider,
        }
    }
}
