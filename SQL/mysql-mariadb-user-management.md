# SQL user management
This sql dialect is mainly for Mysql and Mariadb.

## Create User

```SQL
CREATE USER 'webdev'@'localhost' IDENTIFIED BY '0wbYh^ncDia*Re$5';
```

## Grant Access

Only grant the necessary permissions!

```SQL
-- Most common usage, specific permissions granted to a specific user on
--   a specific machine designated by ip.
GRANT SELECT, DELETE, INSERT, UPDATE ON dbname.* TO 'username'@'172.22.1.112';


--Grant specific permissions to user on localhost accessing all tables on
--  database webdev.
GRANT SELECT, DELETE, INSERT, UPDATE ON webdev.* TO 'username'@'localhost';


-- Grant all privileges to user 'username' on database webdev accessible from
-- anywhere.
GRANT ALL PRIVILEGES ON webdev.* TO 'username'@'%';


-- Grant all privileges to user 'username' on database webdev accessible from
--  specific computer with static ip. 
GRANT ALL PRIVILEGES ON webdev.* TO 'username'@'192.168.1.25' WITH GRANT OPTION;

-- Note that 'WITH GRANT OPTION' is not necessarily a preferred practice, 
--  it is shown above for proper format.
```

### Available permissions
- ALL PRIVILEGES- as we saw previously, this would allow a MySQL user full access to a designated database (or if no database is selected, global access across the system)
- CREATE- allows them to create new tables or databases
- DROP- allows them to them to delete tables or databases
- DELETE- allows them to delete rows from tables
- INSERT- allows them to insert rows into tables
- SELECT- allows them to use the SELECT command to read through databases
- UPDATE- allow them to update table rows
- WITH GRANT OPTION- allows them to grant or remove other users’ privileges

## Other Useful Commands

```SQL
-- Reloads the grant table enabling the changes made without restarting server.
FLUSH PRIVILEGES;

-- Display the grants for a user specified by access location.
SHOW GRANTS FOR 'username'@'localhost';

-- Drops a users access completely.
DROP USER 'username'@'localhost';

-- Removes all privileges on a database level
REVOKE ALL PRIVILEGES ON dbname.* FROM 'username'@'localhost';
```
[For more on Mysql Access](https://dev.mysql.com/doc/refman/5.7/en/grant.html)