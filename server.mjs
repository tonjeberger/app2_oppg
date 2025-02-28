import express from 'express'
import session from 'express-session';
import HTTP_CODES from './utils/httpCodes.mjs';
import {newDeck, shuffleDeck, drawCard, allDecks} from './uke_4_kortstokk/kortFunksjoner.mjs';
import {quotes, poem} from './uke_3_dikt_sitat/dikt_sitat.mjs';
import {newSessionInfo, printInfo, readSessionInfo, reuseSession} from './uke_6_middleware/saveSessionInfo.mjs';
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';
import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';

const server = express();
const port = (process.env.PORT || 8000);
const ENABLE_LOGGING = false; // denne blir ikke brukt noe sted nå, men denne kan vi sette til false for å ikke logge

const logger = log(LOG_LEVELS.VERBOSE);
 
let globalSessionInfo = {};

async function init() { //bruker denne slik at ikke serveren starter før vi har fått session info
    await reuseSession(true);
        globalSessionInfo = await readSessionInfo();
        console.log('Global Session Info initialized:', globalSessionInfo);
}

init().then(() => {
    server.set('port', port);
    server.use(logger); // hver gang det kommer en request så vil log-funksjonen kjøres. om det er noe man ikke vil logge legger man denne under det i koden
    server.use(express.static('public')); // middleware som gjør at vi kan hente filer fra public-mappen
    server.use("/tree", treeRouter); // hvis noe er fulgt av /tree så vil den bruke treeRouter
    server.use("/quest", questLogRouter); // hvis noe er fulgt av /questLog så vil den bruke questLogRouter
    server.use("/user", userRouter);

    server.use(session({
        secret: 'hemmelig_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    server.use((req, res, next) => {
        console.log("Session middleware kjører...");
        console.log("req.session:", req.session);
        next();
    });
    

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
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

    server.get("/", getRoot);




//------------------- dikt/sitat -------------------

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





//------------------- kortstokk -------------------
    
    server.post('/temp/deck', (req, res) => {
        console.log("Before setting deck id", req.session)

        if(req.session.deck_id){
            console.log("deck id already exists in session")
            return res.json({deck_id: req.session.deck_id, message: 'Deck already exists'});
        }
        let deck = newDeck();
        req.session.deck_id = deck.deck_id;
        console.log("After setting deck id", req.session)
        res.json(deck);
    });

    server.get('/temp/deck', (req, res) => {
        console.log("session GET /temp/deck ", req.session)
        
        if(req.session.deck_id && allDecks[req.session.deck_id]){
            return res.json({deck_id: req.session.deck_id, deck: allDecks[req.session.deck_id]});
        }
        console,log("No deck found in session")
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({error: 'No deck found'});
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

    server.patch('/temp/deck/shuffle/:deck_id', (req, res) => {
        const deck_id = parseInt(req.params.deck_id);
        const shuffledDeck = shuffleDeck(deck_id);
        res.json(shuffledDeck);
        console.log(shuffledDeck)
    });



    server.get('/temp/deck/:deck_id/card', (req, res) => {
        const deck_id = parseInt(req.params.deck_id);
        const deck = allDecks[deck_id];

        if(!deck){
            return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({error: `Deck ${deck_id} not found`});
        }

        try {
            const card = drawCard(deck_id);
            res.json(card);
            console.log(card)
        } catch (error) {
            console.error("error drawing card: ", error)
            res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({error: 'failed to draw card'});
        }

    }); 



    server.listen(server.get('port'), function () {
        console.log('server running', server.get('port'));
    });


});

export default server;