# rocket

Web app made using Rocket framework

## Setup

 1. Run:

    `git clone https://github.com/antheazd/rocket.git`

 2. Open PgAdmin and Docker 

 3. Delete migrations folder from project

 4. Update docker-compose.yml, Cargo.toml and Rocket.toml to match your password and username for PgAdmin

 5. Open Windows Command Prompt and run:
    `cargo clean`
    &nbsp; 
    `docker-compose up -d`
    &nbsp; 
    `cargo install diesel_cli --no-default-features --features "postgres"` 
    &nbsp; 
    `set DATABASE_URL=postgres://postgres:rocket@localhost:5435/webappdb` 
    &nbsp; 
    `diesel setup` 
    &nbsp; 
    `diesel migration generate user_table`
    &nbsp; 
    `diesel migration generate admin_table`
    &nbsp; 
    `diesel migration generate appointment_table`
    &nbsp; 
    `diesel migration generate location_table`
    &nbsp; 
 
 6. Copy code from up.sql and down.sql to newly generated migrations folder

 7. Run

    `diesel migration run`
    &nbsp; 
    `set ROCKET_DATABASES={webappdb={url="postgres://postgres:rocket@localhost:5435/webappdb"}}`
    &nbsp; 
    `cargo run`
    &nbsp; 

