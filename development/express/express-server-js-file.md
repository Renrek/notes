```js
console.log('Express Server Running');
let quotes = require('./modules/quotes');



//load the express Library
//from node_modules/express
const express = require('express');
const app = express();

//Install body-parser
//npm install body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// Create our "app" (server)




// Listen for request coming to 
// a specific URL: url/quotes
// req res
app.get('/quotes', function(request, response) {
    console.log('Ready to send back quotes');
    console.log('request.route.path is', request.route.path);
    response.send(quotes);
});

app.use(express.static('./server/public'));



app.post('/quotes', function(request, response) {
    console.log('Ready to take in quotes');
    console.log('request.route.path is', request.route.path);
    console.log('request.body', request.body);
    let newQuote = request.body;
    if (!newQuote[0].author || !newQuote[0].text){
        response.status(400).send({
            message: "Missing a required field! Git'er Dun"
        });
        return; // End post function
    }

    quotes.push(newQuote[0]);

    let ok = 200;
    response.send(ok);
    console.log(quotes);
    
});

// Listen
const port = 5000;
app.listen(port, function() {
    // kind of like our onReady function
    console.log('View Project on: http://localhost:5000 ');
});

```