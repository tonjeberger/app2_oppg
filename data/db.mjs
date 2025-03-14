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
    try {
        await client.connect();
        console.log("client connected");
        const result = await client.query(statement, values)
        
        if(result.rowCount <= 0){
            throw new Error("No records created");
        }else if(result.rowCount > 1){
            return result.rows;
        }else{
            return result.rows[0];
        }

    } catch (error) {
        console.error("feilmeldingen i runQuery catch:", error);
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