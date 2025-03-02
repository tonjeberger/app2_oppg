import express from 'express'
import session from 'express-session';
import HTTP_CODES from './utils/httpCodes.mjs';
import {printInfo, readSessionInfo, reuseSession} from './uke_6_middleware/saveSessionInfo.mjs';
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';
import treeRouter from './routes/lectureRoutes/treeAPI.mjs';
import questLogRouter from './routes/lectureRoutes/questLogAPI.mjs';
import userRouter from './routes/lectureRoutes/userAPI.mjs';

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
        // console.log("Session middleware kjører...");
        // console.log("req.session:", req.session);
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

    server.get("/", getRoot);


    server.get("/notes", (req, res) => {
        res.send('List all notes');
    });

    server.post("/notes", (req, res) => {
        //create a new note
    });
    
    server.get("/notes/:id", (req, res) => {
        //show note with a pecific id
    });

    server.patch("/notes/:id", (req, res) => {
        //update note with a specific id
    });

    server.put("/notes/:id", (req, res) => {
        //replace note with a specific id
    });

    server.delete("/notes/:id", (req, res) => {
        //delete note with a specific id
    });



    server.listen(server.get('port'), function () {
        console.log('server running', server.get('port'));
    });

});

export default server;