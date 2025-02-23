import {Tree, Node} from "../data/tree.mjs"


const a1 = Node("A1", 
                    Node("A11"), 
                    Node("A12"));
const a2 = Node("A2", 
                    Node("A21"));
const a3 = Node("A3", 
                    Node("A31"), 
                    Node("A32"), 
                    Node("A33"));
const a = Node("A", a1, a2, a3);

const b1 = Node("B1", 
                    Node("B11"), 
                    Node("B12"));
const b2 = Node("B2", 
                    Node("B21"),
                    Node("B22"));
const b = Node("B", b1, b2);

const c1 = Node("C1", 
                    Node("C11"), 
                    Node("C12"),
                    Node("C13"));
const c2 = Node("C2", 
                    Node("C21"));
const c3 = Node("C3", 
                    Node("C31"), 
                    Node("C32"));
const c4 = Node("C4", 
                    Node("C41"));
const c = Node("C", c1, c2, c3, c4);


const root = Node("treeRoot",a,b,c);
export const newTree = new Tree(root);