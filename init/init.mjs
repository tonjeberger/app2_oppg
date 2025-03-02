import {Tree, Node, saveTree} from "../data/tree.mjs"
//import {console} from "inspector"; // copilot sier at vi ikke trenger denne importen
import fs from "fs/promises";
import express from "express";
import treeRouter from '../routes/lectureRoutes/treeAPI.mjs';
// import server from ('../server.mjs');

let dummyTreeData = await fs.readFile("./init/dummy/tree1.json");
dummyTreeData = JSON.parse(dummyTreeData);
console.log(dummyTreeData);



let treeData = await fs.readFile("./init/dummy/tree.json");




// server.use(express.json());
// server.use("/tree", treeRouter);

// server.get("/", (req, res, next) => {
//     res.json(dummyTreeData);
//     console.log(dummyTreeData);
// });

//___________start server_________
const server = await import('../server.mjs');
// sekundær måte å kjøre serveren på