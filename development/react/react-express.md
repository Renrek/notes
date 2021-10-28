# React and Express installed together

### Step 1 : Install create-react-app
```shell
npx create-react-app name-of-app
```

### Step 2 : Install Express
```shell
cd name-of-app
npm install express
npm install react-router-dom
npm install nodemon --save-dev
npm install dotenv
mkdir server
touch server/server.js 

code .
```

##### server/server.js
```js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081; // Researching this was awesome.

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

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

```js

```