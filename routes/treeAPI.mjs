import express from 'express';

import {Tree, Node, newTree, saveTree} from "../data/tree.mjs"

const treeRouter = express.Router();

const tree = Tree(Node(""));

saveTree(newTree);


treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {
    res.json(newTree);
    console.log("tree");
});

treeRouter.post("/", (req, res, next) => {
    let newNode = Node(req.body.data);
    newTree.root.connections.push(newNode);

   res.send("post tree");
});


treeRouter.put("/", (req, res, next) => {
    res.send("put tree");
    // lage en funksjon som kan brukes her for å erstatte et tre/noder?
});
treeRouter.patch("/", (req, res, next) => {
    res.send("patch tree");
    //kode for å endre et tre/noder?
    //vi skal ikke lage en klient, må finne ut hvordan dette skal gjøres
});

treeRouter.delete("/", (req, res, next) => {
    res.send("delete tree");
    //kode for å slette et tre/noder?
});

export default treeRouter;