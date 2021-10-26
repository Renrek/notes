# REST resource naming

These examples are in a format that is used specificity for Express using PostgreSQL. The route naming however can be applied to any stack used.

#### 
#### Collection

Take notice of the plural noun "customers" within the endpoint route.

```js
// Fetch all customer records
router.get('/api/customers/', (req, res) => {
  
    const statement = `
        SELECT 
            id, 
            first_name, 
            last_name
        FROM
            customers
    `;

  db.query(statement)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Delete movie', err);
      res.sendStatus(500)
    })
});
}
```

#### Singleton

Notice that the noun is still plural, the request of the id signifies that only one record is requested.

```js
// Fetch a customer records based on their id.
router.get('/api/customers/:id', (req, res) => {
  
    const statement = `
        SELECT 
            id, 
            first_name, 
            last_name
        FROM
            customers
        WHERE
            id = $1
    `;

    db.query(statement, [ req.params.id ])
        .then( result => {
        res.send(result.rows);
        })
        .catch(err => {
        console.log('ERROR: Delete movie', err);
        res.sendStatus(500)
        })
    });
}
```