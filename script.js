//Manipulating the DOM elements
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');

// Get Quote function from API
async function getQuote () {
const proxyUrl = 'https://pacific-escarpment-24387.herokuapp.com/'
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try{
const res = await fetch (proxyUrl + apiUrl);
const data = await res.json();
quoteText.innerText = data.quoteText;
quoteAuthor.innerText = data.quoteAuthor;
} catch(error){
    getQuote();
    
}
}

//On Load
getQuote();