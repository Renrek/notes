# Express Setup

### Suggested File Structure
Note: This is only the developers created files, it does not include installation files from express for example.
```
project
|   .gitignore
|
|___server
|   |   server.js
|   |
|   |___public
|   |   |   index.html
|   |   |   
|   |   |___styles
|   |   |   |   main.css
|   |   |
|   |   |___scripts
|   |   |   |   client.js
|   |   |
|   |   |___vendors
|   |   |   |   jquery.js
|   |   |
|   |   |___images
|   |
|   |___routes
|   |   |   nameOfRoute.route.js
|   |
|   |___modules
|   |   |   pool.js
```
### Base Install


1.  Initiate the directory with npm
    ```shell 
    npm init --yes 
    ```
    Note: --yes : answers all questions

    Add the following "start" line to package.json
    ```json
    "scripts": {
        test": "echo \"Error: no test specified\" && exit 1",
        "start": "node ./server/server.js"
    },
    ```

1.  Basic boiler Plate for express server
    ```js
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = process.env.PORT || 8080; // Researching this was awesome.
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('server/public'));

    app.listen(PORT, () => {
        console.log(`Server is Active - http://localhost:${PORT}`);
    });
    ```
    Note: research app.use(express.urlencoded({extended: true}));

1.  Install express server
    ```shell
    npm install express
    ```


1.  Create .gitignore and add the follwing enteries
    ```shell
    touch .gitignore
    ```

    ```
    #  .gitignore contents
    .DS_Store
    node_modules/
    logs
    *.log
    npm-debug.log*
    ```

1.  Install body-parser, may avoid having to do     this depending on notes from urlencoded research
    ```shell
    npm install body-parser
    ```

1.  Install database, in this case postgres
    ```shell
    npm install pg
    ```

    