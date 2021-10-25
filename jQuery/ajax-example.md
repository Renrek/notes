```js
$( document ).ready( pageLoaded );
let quotes = [];
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
        //"Are we there yet?" Don't make me turn this function around
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