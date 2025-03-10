import express from 'express'
// import session from 'express-session';
import HTTP_CODES from './utils/httpCodes.mjs';
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';
import {printInfo, readSessionInfo, reuseSession} from './uke_6_middleware/saveSessionInfo.mjs';
import router from './routes/noteRouter.mjs';

const server = express();
const port = (process.env.PORT || 8000);
const ENABLE_LOGGING = true; // denne blir ikke brukt noe sted nå, men denne kan vi sette til false for å ikke logge

const logger = log(LOG_LEVELS.VERBOSE);
 
let globalSessionInfo = {};

async function init() { //bruker denne slik at ikke serveren starter før vi har fått session info
    await reuseSession(true); // velger om vi skal lage ny session for hver request eller gjenbruke den forrige
        globalSessionInfo = await readSessionInfo();
        console.log('Global Session Info initialized:', globalSessionInfo);
}

init().then(() => {
    server.set('port', port);
    server.use(logger); // hver gang det kommer en request så vil log-funksjonen kjøres. om det er noe man ikke vil logge legger man denne under det i koden
    server.use(express.static('public')); // middleware som gjør at vi kan hente filer fra public-mappen
    server.use(express.json()); // middleware som gjør at vi kan hente json fra body
    server.use(router);


    // server.use((req, res, next) => {
    //     console.log("Session middleware kjører...");
    //     console.log("req.session:", req.session);
    //     next();
    // });
    

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

    server.get("*.mjs", (req, res, next) => {
        res.type("application/javascript");
        next();
    });// sjekke opp i denne igjen


    function getRoot(req, res, next) {
        eventLogger("Noen spurte etter root")
        res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
        console.log("root")
    }

    server.get("/", getRoot);

    server.listen(server.get('port'), function () {
        console.log('server running', server.get('port'));
    });

});
export default server;