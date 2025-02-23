import {Tree, Node, saveTree} from "../data/tree.mjs"
//import {console} from "inspector"; // copilot sier at vi ikke trenger denne importen
import fs from "fs/promises";


let dummyTreeData = await fs.readFile("./init/dummy/tree1.json");
console.log(dummyTreeData)

// har laget tree.json, må kanskje hente ut den dataen
// slik som over, så kan jeg fjerne den fra tree.mjs?
// må finne ut hvordan jeg skal koble det til serveren fra denne filen

server.get("/", (req, res, next) => {
    res.json(dummyTreeData);
    console.log("tree");
});

//___________start server_________
const server = await import('../server.mjs');
// sekundær måte å kjøre serveren på