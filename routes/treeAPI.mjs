import express from 'express';

import {Tree, Node, newTree, saveTree} from "../data/tree.mjs"

const treeRouter = express.Router();

const tree = Tree(Node(""));

saveTree(newTree);


treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {
    res.json(newTree);
    console.log("tree")
});

export default treeRouter;