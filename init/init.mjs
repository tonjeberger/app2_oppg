import {Tree, Node, saveTree} from "../data/tree.mjs"
//import {console} from "inspector"; // copilot sier at vi ikke trenger denne importen
import fs from "fs/promises";


let treeData = await fs.readFile("./init/dummy/tree1.json");
console.log(treeData)



//___________start server_________
const server = await import('../server.mjs');
// sekundær måte å kjøre serveren på