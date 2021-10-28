# Express Setup
## Notes ToDo:
- [x] Installation on sheel and file setup
- [ ] Show public file setup
- [ ] 
- [ ]

## Shell Instructions
```shell
npm init --yes
npm install express
```
## File: /server/server.js

```js
// create your express app

// Include the express module
const express = require('express');
// Call on the express module
const app = express();
app.use(express.static('./server/public'));
// Configure and Activate the Listen Server
const port = 5000;
app.listen(port, function() {
    // Wanted full URL for ctrl + click to open browser to page
    console.log('View Project on: http://localhost:5000 ');
});
```