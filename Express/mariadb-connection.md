# Mariadb Connection

#### Packages to install
```shell
npm i mariadb
```

#### .env system variables

Prevents your connection info from being pushed to version control.

_Note: add .env to .gitignore_

```vim
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=
```

#### server/modules/pool.js
```js
const mariadb = require('mariadb');

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
};

const pool = mariadb.createPool(config);

module.exports = pool;
```

#### router example
```js
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Add contact initiator (current user) is userIdA
router.get('/:id', (req, res) => {
  
  const statement = `SELECT * FROM user WHERE id = ?;`;

  pool.query(statement, [ req.params.id ])
    .then( results => {
      res.send(results);
    })
    .catch(err => {
      console.log('ERROR: Get users by id', err);
      res.sendStatus(500)
    })
});

module.exports = router;

```