import pg from "pg";
import fs from "fs";
import waitPort from "wait-port";

// const {
//     POSTGRES_HOST: HOST,
//     POSTGRES_HOST_FILE: HOST_FILE,
//     POSTGRES_USER: USER,
//     POSTGRES_USER_FILE: USER_FILE,
//     POSTGRES_PASSWORD: PASSWORD,
//     POSTGRES_PASSWORD_FILE: PASSWORD_FILE,
//     POSTGRES_DB: DB,
//     POSTGRES_DB_FILE: DB_FILE,
// } = process.env;

// let db;

// async function init() {
//     const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
//     const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
//     const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE, 'utf8') : PASSWORD;
//     const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

//     await waitPort({ 
//         host, 
//         port: 5432,
//         timeout: 10000,
//         waitForDns: true,
//     });

//     db = new pg.Client({
//         host,
//         user,
//         password,
//         database
//     });

//     return db.connect().then(async () => {
//         console.log(`Connected to postgres db at host ${HOST}`);
//         // Run the SQL instruction to create the table if it does not exist
//         await client.query('CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean)');
//         console.log('Connected to db and created table todo_items if it did not exist');
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// }


// const {
//     POSTGRES_HOST: HOST,
//     POSTGRES_HOST_FILE: HOST_FILE,
//     POSTGRES_USER: USER,
//     POSTGRES_USER_FILE: USER_FILE,
//     POSTGRES_PASSWORD: PASSWORD,
//     POSTGRES_PASSWORD_FILE: PASSWORD_FILE,
//     POSTGRES_DB: DB,
//     POSTGRES_DB_FILE: DB_FILE,
// } = process.env;

export let db;

export async function init() {
//     const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
//     const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
//     const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE, 'utf8') : PASSWORD;
//     const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

//     await waitPort({ 
//         host, 
//         port: 5432,
//         timeout: 10000,
//         waitForDns: true,
//     });

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

// End the connection
export async function teardown() {
    return db.end().then(() => {
      console.log('db ended');
    }).catch(err => {
      console.error('Unable to end db:', err);
    });
}