//mappenavnet her er modules, som er vanlig å bruke for moduler
// pipe er en serie med funksjoner som kjøres etter hverandre

//import _ from 'idk' // tror han importerte noe her

let level_id = 0;

export const LOG_LEVELS = {
    VERBOSE:++level_id,
    IMPORTANT:++level_id,
    ALWAYS:++level_id
}// disse nivåene er satt opp for å kunne filtrere ut loggingen

let currentGlobalLogLevel = LOG_LEVELS.VERBOSE;


const log = function(logLevel){ // next har med middleware å gjøre. next kaller det neste middleware
    currentGlobalLogLevel = logLevel;
    return logInstance;
};

export const eventLogger = function (eventDescription, logLevel = LOG_LEVELS.VERBOSE) {

    if(logLevel >= currentGlobalLogLevel){
        console.log(`${Date.now()}|${eventDescription}`);
        saveLog(`${Date.now()}|${eventDescription}`);
    }
}

const colorize = (text) => {
    const colors = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        reset: '\x1b[0m'
    }
    const methods = {
        GET: colors.green,
        POST: colors.red,
        PUT: colors.red,
        PATCH: colors.yellow,
    }
    return `${methods[text]}${text}\x1b[0m`;
}


const logInstance = async (req, res, next) =>{
    await logVerbose(req,res),
    await logImportant(req,res),
    await logAlways(req,res)
    next()
}

const logVerbose = async (req, res, next) => {
    if(LOG_LEVELS.VERBOSE == currentGlobalLogLevel){//statementet er true hvis loggLevel er større eller lik currentGlobalLogLevel 
        await printLog(req,res)
    }   

};

const logImportant = async (req, res, next) => {
    if(LOG_LEVELS.IMPORTANT == currentGlobalLogLevel){//statementet er true hvis loggLevel er større eller lik currentGlobalLogLevel 
        await printLog(req,res)
    }   

};

const logAlways = async (req, res, next) => {
    if(LOG_LEVELS.ALWAYS == currentGlobalLogLevel){//statementet er true hvis loggLevel er større eller lik currentGlobalLogLevel 
        await printLog(req,res)
    }   

};

const printLog = async (req, res, next) => {
    // let logStatement = `${Date.now()}|${colorize(req.method)}|${req.url}`;
    console.log(`${Date.now()}|${colorize(req.method)}|${req.url}`);
    await saveLog(`${Date.now()}|${req.method}|${req.url}`); // dele ting inn i små funksjoner for å gjøre det lettere å teste
};

const saveLog = async (text) => {
    text += "\n";
    //await fs.appendFile("./logs/log.csv", text)
}

export default log;