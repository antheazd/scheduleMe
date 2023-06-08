#[derive(Debug, PartialEq, Eq)]

pub enum Response {
    CookiesNotFound,
    IncorrectCookies,
    UserNotFound,
    UserExists,
    ErrorInserting,
    ErrorUpdating,
    ErrorSelecting,
    Success,
    IncorrectPassword,
}
