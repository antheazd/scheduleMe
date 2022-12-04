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
    `docker-compose up -d`
    `cargo install diesel_cli --no-default-features --features "postgres"`
    `set DATABASE_URL=postgres://postgres:rocket@localhost:5435/webappdb`
    `diesel setup`
    `diesel migration generate user_table`
    `diesel migration generate admin_table`
 
 6. Copy code from up.sql and down.sql to newly generated migrations folder

 7. Run

    `diesel migration run`
    `set ROCKET_DATABASES={webappdb={url="postgres://postgres:rocket@localhost:5435/webappdb"}}`
    `cargo run`


