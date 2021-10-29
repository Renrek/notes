# Mariadb Connection

```shell
npm i mariadb
```

```vim
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=
```

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

```js
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Add contact initiator (current user) is userIdA
router.get('/', (req, res) => {
  
  const statement = `SELECT * FROM user WHERE id = ?;`;

  pool.query(statement, [ 2 ])
    .then( results => {
      res.send(results);
    })
    .catch(err => {
      console.log('ERROR: Post contacts', err);
      res.sendStatus(500)
    })
});

module.exports = router;

```