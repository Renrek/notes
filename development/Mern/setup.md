# MERN Setup

## Install Base

```shell
create-react-app my-app
cd my-app
npm install express
npm install react-router-dom
npm install react-redux
npm install redux-saga
npm install nodemon --save-dev
npm install dotenv
mkdir server
touch .env server/server.js 
code .
```

##### server/server.js
```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081; // Researching this was awesome.

/** ---------- MIDDLEWARE ---------- **/
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log(`Server is Active - http://localhost:${PORT}`);
});
```

##### package.json
```
"proxy": "http://localhost:8081",

"scripts": {
    "start": "node server/server.js",
    "build": "react-scripts build",
    "client": "react-scripts start",
    "server": "nodemon  --watch server server/server.js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

### Step 3 : 

##### Starting server & client

```shell
npm run server
npm run client
```


## Router example
```js
```
#### Material UI
```js

```

#### MongoDB
```js
const MongoClient = require('mongodb').MongoClient

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        return this.db
    }

}

Connection.db = null
Connection.url = 'mongodb://127.0.0.1:27017/test_db'
Connection.options = {
    bufferMaxEntries:   0,
    reconnectTries:     5000,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }
```
## Router example
```js
const router = require('express').Router()
const { Connection } = require('../lib/Connection.js')

// This should go in the app/server setup, and waited for.
Connection.open()

router.get('/files', async (req, res) => {
   try {
     const files = Connection.db.collection('files').find({})
     res.json({ files: files })
   }
   catch (err) {
     res.status(500).json({ error: err })
   }
})

module.exports = router
```
#### mongodb

```shell
npm install mongodb
```


```js

// Potential
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

```