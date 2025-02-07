import express from 'express'
import session from 'express-session';
import FileStore from 'session-file-store';
import HTTP_CODES from './utils/httpCodes.mjs';
import {suits, values} from './uke_4_kortstokk/kortdata.mjs';
import {quotes, poem} from './uke_3_dikt_sitat/dikt_sitat.mjs';
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';


const server = express();
const port = (process.env.PORT || 8000);
const ENABLE_LOGGING = false; // denne blir ikke brukt noe sted nå, men denne kan vi sette til false for å ikke logge

const logger = log(LOG_LEVELS.VERBOSE);

server.set('port', port);
server.use(logger); // hver gang det kommer en request så vil log-funksjonen kjøres. om det er noe man ikke vil logge legger man denne under det i koden
server.use(express.static('public')); // middleware som gjør at vi kan hente filer fra public-mappen
//server.use(cors({origin: 'http://localhost:8000/temp/deck'})); // middleware som gjør at vi kan hente data fra serveren fra en annen server enn localhost:8000


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    //res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    next();
});



// functions
function getRoot(req, res, next) {
    eventLogger("Noen spurte etter root")
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

function getQuote(){
    return quotes[Math.ceil(Math.random() * quotes.length)];
}


// requests
server.get("/", getRoot);

server.get("/tmp/poem", (req, res) => {
    res.send(poem);
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
    let deck_id = Math.floor(Math.random() * 10)// toString(Math.floor(Math.random() * 10));
    allDecks[deck_id] = deck;
    return {deck_id, deck};
}

function shuffleDeck(deck_id){
    const deck = allDecks[deck_id];
    const shuffledDeck = deck.sort(() => Math.random() - 0.5);
    allDecks[deck_id] = shuffledDeck;
    return shuffledDeck;
};

function drawCard(deck_id){
    const deck = allDecks[deck_id];
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    return randomCard;
}




 
server.post('temp/deck', (req, res) => {
    res.send(newDeck());
});

server.get('/temp/deck', (req, res) => {
    res.send(newDeck());
});

server.get('/temp/deck/:deck_id', (req, res) => { 
    const deck_id = parseInt(req.params.deck_id);
    const deck = allDecks[deck_id];
    if(deck){ 
        
        res.send({ deck_id, deck });
    }    
    else{
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck ' + deck_id + ' not found');
    }
});

server.patch('temp/deck/shuffle/:deck_id', (req, res) => {
    const deck_id = req.params.deck_id; //parseInt(req.params.deck_id);
    const shuffledDeck = shuffleDeck(deck_id);
    res.send(shuffledDeck);
    // const deck = allDecks[deck_id];
    // const randomDeck = deck[Math.floor(Math.random() * deck.length)];
    // res.send(randomDeck);


    // må hente kortstokken og bruke Math.random på en måte
    // for å stokke kortene i den spesifiserte kortstokken basert på deck_id


});

server.get('temp/deck/shuffle/:deck_id', (req, res) => {
    const deck_id = parseInt(req.params.deck_id);
    const deck = allDecks[deck_id];
    if(deck){
        
        res.send({ deck_id, deck });
    }    
    else{
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck ' + deck_id + ' not found');
    } 
});

server.get('temp/deck/:deck_id/card', (req, res) => {
    const deck_id = parseInt(req.params.deck_id);
    const deck = allDecks[deck_id];
    res.send(drawCard(deck_id));
}); 



server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});