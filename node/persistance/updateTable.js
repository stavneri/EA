import { db } from "./db.js"

async function updateTable (tableName) {
    
    const selectQuery = "SELECT (company) , (category) FROM known_connections";
    
    const insertQuery = "UPDATE " + tableName + " SET category=$1 WHERE (company)=($2)" 
    let allConnections = [];
    try {
        const result = await db.query(selectQuery);
        result.rows.forEach((connection) => {
            allConnections.push(connection);
        });
    }
    catch (err) {
        console.log(err);
    }
    allConnections.forEach(async (connection) =>  {

        const testQuery = "SELECT * FROM " + tableName + " WHERE  company=$1";

        try {
            const result = await db.query(testQuery, [connection.company]);
        }
        catch (err) {
            console.log(err);
        }



        try {
            await db.query(insertQuery, [connection.category, connection.company]);
        }
        catch (err) {
            console.log(err);
        }
    });
}

export default updateTable;