import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';
import {newDeck, shuffleDeck, drawCard} from './uke_4_kortstokk/kortFunksjoner.mjs';
import {quotes, poem} from './uke_3_dikt_sitat/dikt_sitat.mjs';
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';
import {newSessionInfo, printInfo, readSessionInfo, reuseSession} from './modules/saveSessionInfo.mjs';


const server = express();
const port = (process.env.PORT || 8000);
const ENABLE_LOGGING = false; // denne blir ikke brukt noe sted nå, men denne kan vi sette til false for å ikke logge

const logger = log(LOG_LEVELS.VERBOSE);
 
let globalSessionInfo = {};

async function init() { //bruker denne slik at 
    await reuseSession(true);
        globalSessionInfo = await readSessionInfo();
        // if(!globalSessionInfo || Object.keys(globalSessionInfo).length === 0){
        //     await newSessionInfo();  
        //     globalSessionInfo = await readSessionInfo();
        // }
        console.log('Global Session Info initialized:', globalSessionInfo);
}

init().then(() => {
    server.set('port', port);
    server.use(logger); // hver gang det kommer en request så vil log-funksjonen kjøres. om det er noe man ikke vil logge legger man denne under det i koden
    server.use(express.static('public')); // middleware som gjør at vi kan hente filer fra public-mappen


    server.use(async(req, res, next) => {
        await printInfo();
        next();
    });

    server.use((req, res, next) => {
        req.sessionInfo = globalSessionInfo;
        next();
    });

    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });

    function getRoot(req, res, next) {
        eventLogger("Noen spurte etter root")
        res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
        console.log("root")
    }
    function getQuote(){
        return quotes[Math.ceil(Math.random() * quotes.length)];
    }





    // dikt/sitat
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





    //kortstokk
    
    server.post('temp/deck', (req, res) => {
        res.json(newDeck());
        console.log("post deck")
    });

    server.get('/temp/deck', (req, res) => {
        res.json(newDeck());
        console.log("get deck")
    });


    server.get('/temp/deck/:deck_id', (req, res) => { 
        const deck_id = parseInt(req.params.deck_id);
        const deck = allDecks[deck_id];
        if(deck){ 
            
            res.json({ deck_id, deck });
        }    
        else{
            res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck ' + deck_id + ' not found');
        }
    });

    server.patch('temp/deck/shuffle/:deck_id', (req, res) => {
        const deck_id = req.params.deck_id; //parseInt(req.params.deck_id);
        const shuffledDeck = shuffleDeck(deck_id);
        res.json(shuffledDeck);
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
            
            res.json({ deck_id, deck });
        }    
        else{
            res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck ' + deck_id + ' not found');
        } 
    });

    server.get('temp/deck/:deck_id/card', (req, res) => {
        const deck_id = parseInt(req.params.deck_id);
        const deck = allDecks[deck_id];
        res.json(drawCard(deck_id));
    }); 



    server.listen(server.get('port'), function () {
        console.log('server running', server.get('port'));
    });


});