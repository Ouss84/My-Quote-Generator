//Manipulating the DOM elements
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader =document.querySelector('#loader');

// showing loader
function loading (){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

// quote loaded
function loaded (){
    if (!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
// Get Quote function from API
async function getQuote () {
loading();
const proxyUrl = 'https://pacific-escarpment-24387.herokuapp.com/'
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
try{
const res = await fetch (proxyUrl + apiUrl);
const data = await res.json();

//reduce font size If the quote is too long
if (data.quoteText.length > 100){
    quoteText.classList.add('long-quote')
}else{
    quoteText.classList.remove('long-quote')
}
quoteText.innerText = data.quoteText;

//If the author is unknown
if (data.quoteAuthor === ''){
    quoteAuthor.innerText ="Unknown"
}else {
    quoteAuthor.innerText = data.quoteAuthor;
}
loaded()
} catch(error){
    getQuote();
}
}

//tweet Quote function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetURL,'_blank');
}

//defining the event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
