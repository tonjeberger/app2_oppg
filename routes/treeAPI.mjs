import express from 'express';

import {Tree, Node, newTree, saveTree} from "../data/tree.mjs"

const treeRouter = express.Router();

const tree = Tree(Node(newTree.root.data, newTree.root.connections));

//saveTree(newTree);


treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {
    res.json(tree);
    console.log("tree")
});

export default treeRouter;