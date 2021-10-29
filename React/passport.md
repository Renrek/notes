# User Auth using Passport

#### Minimum requirements for user table

```SQL
--Written for and tested on MariaDB
CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
```

```shell
npm i passport passport-local cookie-session bcryptjs
mkdir src/strategies
cd server/modules
touch encryption.js strategy.js
```

**File: server/modules/encryption.js**

```js
/******** Password Encryption ********/
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (submittedPassword, storedPassword) => {
    return bcrypt.compareSync(submittedPassword, storedPassword);
}

module.exports = {
    encryptPassword,
    comparePassword,
};
```





<!-- 
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:,
    user: '',
    password:,
    database:,
})
-->