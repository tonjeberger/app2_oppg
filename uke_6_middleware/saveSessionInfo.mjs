import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname);
const filename = 'sessionInfo.csv';
const filepath = path.join(directory, "./sessions", filename);
console.log(filepath);

let sessionInfo = {};

// må ha en middlewarefunksjon, tar i mot req... i newSessionInfo
export async function newSessionInfo(req, res, next) {
    let date = new Date();
    let token = Math.random().toString(36);

    if (Object.keys(sessionInfo).length === 0 ){
        
        sessionInfo = {
            token: token,
            sessionStart: date.toISOString().replace("T", " ").substring(0, 16),
            sessionEnd: null // har lyst til å kunne sette en tid på hvor lenge en session skal vare
        };
        await saveSessionInfo(sessionInfo);
    };  
    if(req){
        req.sessionInfo = sessionInfo;
    }
    next();
}; 

export async function printInfo() {
    console.log(sessionInfo);
};


async function saveSessionInfo(newInfo) {
    newInfo = `${newInfo.token},${newInfo.sessionStart},${newInfo.sessionEnd}\n`;
    try {
        await fs.appendFile(filepath, newInfo); 
        console.log("Saved session info");
    } catch (error) {
        console.error("Error saving session info");
    }
};  

export async function readSessionInfo() {

        try {
            const data = await fs.readFile(filepath, "utf-8");
            const savedInfo = data.trim().split("\n");
            const lastSessionArray = savedInfo[savedInfo.length - 1].split(",");
            const [token, sessionStart, sessionEnd] = lastSessionArray;

            sessionInfo = {
                token: token,
                sessionStart: sessionStart,
                sessionEnd: sessionEnd
            };
            return sessionInfo;

        } catch (error) {
            console.error("Error reading session info");  
        }

        console.log(sessionInfo);
}


export async function reuseSession(reuse = true){ // om vi vil bruke den forrige sessionen setter man true der funksjonen brukes
    if(!reuse){
        await newSessionInfo();
    } else {
        await readSessionInfo();
        if(!sessionInfo || Object.keys(sessionInfo).length === 0){
            await newSessionInfo();
        }
    }

}