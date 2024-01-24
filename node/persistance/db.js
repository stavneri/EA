import pg from "pg";
import fs from "fs";
import waitPort from "wait-port";

export let db;

export async function init() {

    db = new pg.Client({
        user: 'postgres',
        host: 'db',
        database: 'postgres',
        password: '061191',
        port: 5432,
      });
      

    return db.connect().then(async () => {
        console.log(`Connected to postgres db at host 3000`);
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}