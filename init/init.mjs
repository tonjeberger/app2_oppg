import {Tree, Node, saveTree} from "../data/tree.mjs"
import {console} from "inspector";
import fs from "fs/promises";

// const a1 = Node("A1");
// const a2 = Node("A2");
// const a = Node("A", a1, a2);

// const b1 = Node("B1");
// const b2 = Node("B2");
// const b = Node("B", b1, b2);

// const root = Node("data", a, b);
// const tree = Tree(root);


let treeData = await fs.readFile("./init/dummy/tree1.json");
console.log(treeData)


//___________start server_________
const server = await import('./server.mjs');
// sekundær måte å kjøre serveren på