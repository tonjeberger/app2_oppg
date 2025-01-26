import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import {suits, values} from './kortdata.mjs';

const server = express();
const port = (process.env.PORT || 8000);

const quotes = [
    "I think, therefore I am. - René Descartes", 
    "The only thing we have to fear is fear itself. - Franklin D. Roosevelt", 
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Life is trying things to see if they work. - Ray Bradbury",
    "I never look back, darling. It distracts from the now. - Edna Mode, The Incredibles"
    ];

server.set('port', port);
server.use(express.static('public')); 
// static er noe som ikke endrer seg. Denne linjen kobler til public mappen
// når vi har kalt den for index.html så vil den automatisk hente den filen. om det heter noe annet går det ikke
// index er default/standard
// det som er klienten kan man legge i denne mappen, for der skal det ikke være noe sensitivt
// vi kan også lage nye mapper inne i public-mappen igjen. Vi har lagt en css-mappe, og da kan den også hentes


// functions
function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

function getQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)];
}


// requests
server.get("/", getRoot);

server.get("/tmp/poem", (req, res) => {
    res.send('I eat my peas with honey <br> I\'ve done it all my life <br> It makes the peas taste funny <br> But it keeps them on the knife!');
})

server.get("/tmp/quote", (req, res) => {
    res.send(getQuote());
})

server.post('/tmp/sum/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.send(sum.toString());
});
// ser via postman at denne fungerer





// Kortstokk
const allDecks = {};

function newDeck(){
    
    const deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({suit, value});
        });
    });
    let deck_id = 4;//Math.floor(Math.random() * 10);
    allDecks[deck_id] = deck;
    return {deck_id, deck};
}

server.post('temp/deck', (req, res) => {
    res.send(newDeck());
});

server.get('/temp/deck', (req, res) => {
    res.send(newDeck());
});

server.get('/temp/deck/:deck_id', (req, res) => { ///:deck_id
    const deck_id = parseInt(req.params.deck_id);
    const deck = allDecks[deck_id];
    if(deck){

        res.send({ deck_id, deck });
    }    
    else{
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck ' + deck_id + ' not found');
    }
});


async function fetchDeck(deck_id){
    console.log(deck_id);
    try {
        const response = await fetch('http://localhost:8000/temp/deck/' + deck_id);
        if (!response.ok) {
            throw new Error('Nope');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
      //console.error('Error:', error);
    }

}

fetchDeck(4).then(data => {
    if (data) {
        console.log('Deck:', data);
    }
});


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});