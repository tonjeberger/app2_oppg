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
    res.send("Dikt her");
})

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});

// server.get("/tmp/poem", function (){
//     console.log("heihei", server.get('port'));
// })

// server.get("/tmp/poem", getPoem);

// server.listen("/tmp/poem", getPoem);