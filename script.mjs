import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}


server.get("/", getRoot);

server.get("/tmp/poem", (req, res) => {
    res.send("I eat my peas with honey. I've done it all my life. It makes the peas taste funny. But it keeps them on the knife!");
})

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
