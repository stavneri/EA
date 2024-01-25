import { db } from "./db.js"
import updateTable from "./updateTable.js";

export async function addNewConnection (body) {

    const company = body.company;
    const category = body.category;

    const query = "INSERT INTO known_connections (company, category) VALUES ($1, $2)" 

    try {
        await db.query(`CREATE TABLE IF NOT EXISTS known_connections
        (id serial PRIMARY KEY, company TEXT UNIQUE NOT NULL, 
        category TEXT);`);

        await db.query(query, [company, category]);
    }
    catch (err) {
        console.log(err);
    }

}


export async function getConnections (body) {

    try {
        const response = await db.query(`SELECT * FROM known_connections ORDER BY category ASC;`);

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


export async function addNewCategory (body) {

    const category = body.category;

    try {
        await db.query(`CREATE TABLE IF NOT EXISTS categories
        (id serial PRIMARY KEY, category TEXT UNIQUE NOT NULL);`);

        await db.query(`INSERT INTO categories (category) VALUES ($1)` , [category]);
    }
    catch (err) {
        console.log(err);
    }

}

export async function getCategories (body) {

    try {
        const response = await db.query(`SELECT * FROM categories ORDER BY category ASC;`);

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