import express from 'express'
import log from './modules/log.mjs';
import { LOG_LEVELS, eventLogger } from './modules/log.mjs';
import { sessionMiddleware } from './uke_6_middleware/saveSessionInfo.mjs';
import router from './routes/noteRouter.mjs';

const server = express();
const port = (process.env.PORT || 8000);
const ENABLE_LOGGING = true;

const logger = log(LOG_LEVELS.VERBOSE);


server.set('port', port);
server.use(express.static('public')); // middleware som gjør at vi kan hente filer fra public-mappen
server.use(express.json()); // middleware som gjør at vi kan hente json fra body
server.use(sessionMiddleware)    
server.use(router);

if(ENABLE_LOGGING){
    server.use(logger);
};


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.get("*.mjs", (req, res, next) => {
    res.type("application/javascript");
    next();
});


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});

export default server;