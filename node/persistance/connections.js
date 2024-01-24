import { db } from "./db.js"
import updateTable from "./updateTable.js";

export async function addNewConnection (body) {

    const company = body.company;
    const category = body.category;

    const query = "INSERT INTO known_connections (company, category) VALUES ($1, $2)" 

    try {
        await db.query(`CREATE TABLE IF NOT EXISTS known_connections
        (company TEXT UNIQUE NOT NULL, 
        category TEXT);`);

        await db.query(query, [company, category]);
        return (await db.query(`SELECT * FROM known_connections;`));
    }
    catch (err) {
        console.log(err);
    }

}


export async function getConnections (body) {

    try {
        const response = await db.query(`SELECT * FROM known_connections;`);

        if(response){
            return (response.rows);
        }
        else
        return ;
    }
    catch (err) {
        console.log(err);
    }

}
