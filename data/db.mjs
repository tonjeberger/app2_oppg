import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Client } = pg;


const config = {
    connectionString: process.env.DB_CREDENTIALS,
    ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : { "rejectUnauthorized": false }
};


async function create(statement, ...values){
    return await runQuery(statement, ...values);
}
async function update(statement, ...values){
    return await runQuery(statement, ...values);
}
async function read(statement, ...values){
    return await runQuery(statement, ...values);
}
async function purge(statement, ...values){
    return await runQuery(statement, ...values);
}


async function runQuery(statement, ...values){
    const client = new Client(config);
    console.log("runQuery får inn statement: " + statement + " og values: " + values);
    console.log("statement er: ", typeof statement); // 
    console.log("values er: ", typeof values);
    try {
        await client.connect();
        console.log("client connected");
        const result = await client.query(statement, values) // denne vil alltid inneholde et objekt uansett hvilken spørring vi kjører
        console.log(result + "result after client.query");
        
        if(result.rowCount <= 0){
            throw new Error("No records created");
        }else if(result.rowCount > 1){
            return result.rows;
        }else{
            return result.rows[0]; // vi skal lage en instans, derfor returnerer vi den første indeksen
        }

    } catch (error) {
        console.log("feilmeldingen i runQuery catch:")
        console.error(error);
        return null;
    } finally{
        await client.end(); 
    }
};

const dbManager = {
    create,
    update,
    read,
    purge
};

export default dbManager;