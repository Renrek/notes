CREATE DATABASE renrek;
CREATE USER 'renrek'@'localhost' IDENTIFIED BY 'fame4093';

GRANT ALL PRIVILEGES ON renrek.* TO 'renrek'@'localhost';

FLUSH PRIVILEGES;


ALL PRIVILEGES- as we saw previously, this would allow a MySQL user full access to a designated database (or if no database is selected, global access across the system)
CREATE- allows them to create new tables or databases
DROP- allows them to them to delete tables or databases
DELETE- allows them to delete rows from tables
INSERT- allows them to insert rows into tables
SELECT- allows them to use the SELECT command to read through databases
UPDATE- allow them to update table rows
GRANT OPTION- allows them to grant or remove other users’ privileges


SHOW GRANTS FOR 'username'@'localhost';

DROP USER 'username'@'localhost';

REVOKE ALL ON renrek.* FROM 'renrek'@'localhost';