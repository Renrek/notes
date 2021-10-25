# Express Basic Web Server

This is a basic express server to host static websites. It is also a solid base to start a REST server.

#### Install Commands

```shell
mkdir project-name
cd project-name
npm init --yes
npm install express
mkdir server
mkdir public
touch ./server/server.js
npm install nodemon --save-dev
code .
```

#### server.js
```js
/** ---------- SYSTEM ---------- **/
const express = require('express');
const app = express();

const PORT = 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static('public'));
/** ---------- EXPRESS ROUTES ---------- **/

/** ---------- START SERVER ---------- **/
app.listen(PORT, function() {
    console.log(`LIVE on: http://localhost:${PORT}`);
});
```
##### package.json
```json
"scripts": {
    "start": "node server/server.js",
    "server": "nodemon  --watch server server/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```