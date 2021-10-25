# Express Basic Web Server

#### Install Server

```shell
mkdir project-name
cd project-name
npm init --yes
npm install express
mkdir server
mkdir public
touch ./server/server.js

code .
```

#### Configure Server

```js
const express = require('express');
const app = express();
app.use(express.static('../public'));
const PORT = 5000;
app.listen(port, function() {
    console.log(`LIVE on: http://localhost:${PORT}`);
});
```