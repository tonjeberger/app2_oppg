import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname);
const filename = 'sessionInfo.csv';
const filepath = path.join(directory, "../sessionLog", filename);
console.log(filepath);

let sessionInfo = {};

export async function sessionMiddleware(req, res, next) {

    try {
        await reuseSession(false); // change to false to start new sessions
    }catch (error) {
        console.error("Error awaiting reuseSession", error);
    }
    
    if(req){
        req.sessionInfo = sessionInfo;
    }
    console.log(sessionInfo);
    next();
}; 


async function saveSessionInfo(newInfo) {
    newInfo = 
    `Session: ${newInfo.token}, session start (date, time): ${newInfo.sessionStart}, Session end: ${newInfo.sessionEnd}\n`; 
    
    try {
        await fs.appendFile(filepath, newInfo); 
        console.log("Saved session info");
    } catch (error) {
        console.error("Error saving session info");
    }
};  

async function readSessionInfo() {

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

}


async function reuseSession(reuse = true){
    if(reuse){
        await readSessionInfo();
        console.log("Reusing session");
    }

    if (Object.keys(sessionInfo).length === 0 || !reuse || !sessionInfo){
        let date = new Date();
        let token = Math.random().toString(36);
        sessionInfo = {
            token: token,
            sessionStart: date.toLocaleString("no-NO"), 
            sessionEnd: null // mulig å senere kunne registrere når sessionen slutter/skal slutte?
        };
        await saveSessionInfo(sessionInfo);
    }; 
    return sessionInfo;
}