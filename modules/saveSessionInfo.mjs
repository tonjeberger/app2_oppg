import fs from "node:fs/promises";


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

export async function readSessionInfo() {
    try {
        
    } catch (error) {
        console.error("Error reading session info");
        
    }
}