# Do I need this?
```sql
CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```