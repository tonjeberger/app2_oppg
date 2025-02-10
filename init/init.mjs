import {Tree, Node} from "../data/tree.mjs"

const a1 = Node("A1");
const a2 = Node("A2");
const a = Node("A", a1, a2);

const b1 = Node("B1");
const b2 = Node("B2");
const b = Node("B", b1, b2);

const root = Node("data", a, b);
const tree = Tree(root);

//___________start server_________
const server = await import('./server.mjs');
// sekundær måte å kjøre serveren på