import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname);
const filename = 'sessionInfo.csv';
const filepath = path.join(directory, "../sessions", filename);
console.log(filepath);

let sessionInfo = {};


export async function newSessionInfo() {
    let date = new Date();
    let token = Math.random().toString(36);

    if (Object.keys(sessionInfo).length === 0 ){
        // let sessionStart = date.toISOString().replace("T", " ").substring(0, 16);
        // let endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
        // let sessionEnd = endDate.toISOString().replace("T", " ").substring(0, 16);
        
        sessionInfo = {
            token: token,
            sessionStart: date.toISOString().replace("T", " ").substring(0, 16),
            sessionEnd: null // må få satt denne til et tidspunkt eller noe
        };
        await saveSessionInfo(sessionInfo);
    };  
};

export async function printInfo() {
    console.log(sessionInfo);
};

// må ha en test her noe sted for å sjekke på om det skal lagres ny sessioninfo,
// eller om den forrige skal gjenbrukes


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


// tenkte å lage en funksjon for når en session skulle avsluttes eller oppdateres
export async function endSession(){
    let date = new Date();
    sessionInfo.sessionEnd = date.toISOString().replace("T", " ").substring(0, 16);
    await saveSessionInfo(sessionInfo);
    console.log("Session ended");
    newSessionInfo();
}; 
