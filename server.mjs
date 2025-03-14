import express from 'express'
import { sessionMiddleware } from './modules/saveSessionInfo.mjs';
import router from './routes/noteRouter.mjs';

const server = express();
const port = (process.env.PORT || 8000);


server.set('port', port);
server.use(express.static('public'));
server.use(express.json());
server.use(sessionMiddleware)    
server.use(router);


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