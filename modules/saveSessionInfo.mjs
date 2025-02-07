import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = __dirname;
const filename = 'sessionInfo.csv';
const filepath = path.join(directory, "../sessions", filename);

console.log(filepath);

let sessionInfo = {};

export function newSessionInfo() {
    let token = Math.random().toString(36);

    if (Object.keys(sessionInfo).length === 0){
        sessionInfo = {
            token: token,
            sessionStart: Date.now(),
            sessionEnd: null,
            clicks: 0
        };
    };  
};

export async function printInfo() {
    console.log(sessionInfo);
    await saveSessionInfo(sessionInfo);
};

async function saveSessionInfo(newInfo) {
    newInfo = `${newInfo.token},${newInfo.sessionStart},${newInfo.sessionEnd},${newInfo.clicks}\n`;
    try {
        
        await fs.appendFile("./sessions/sessionInfo.csv", newInfo);
        console.log("Saved session info");
    } catch (error) {
        console.error("Error saving session info");
    }
};  

