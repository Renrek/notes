# jQuery AJAX template

```js
let quotes = [];

$( document ).ready( pageLoaded );

function pageLoaded(){
    console.log('JQ loaded');
    $( document ).on('click', '#getQuotes', getQuotes)
}

function getQuotes() {
    console.log('Quote Me');
    
    $.ajax({
        url: '/quotes',
        method: 'GET'
    })
    .then(function(response, info){
        console.log('GET /quotes response', response)
        quotes = response;
        let targetElement = $('ul#quotes');
        targetElement.empty();
        for (const quote of response) {
            targetElement.append(`<li>${quote.text}</ls>`);
        }
        console.log(info.statusCode);
    });
}


```