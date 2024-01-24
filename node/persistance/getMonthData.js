import { db } from "./db.js"

async function getMonthData (body) {
    
    const tableName = body.month+body.year+"sum";

    const selectQuery = "SELECT * FROM " +tableName;
    const checkQuery = "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '"+tableName+"')";

    try{
        const result = await db.query(checkQuery);
        if (!result.rows[0].exists){
            return ;
        }
    } catch (err) {
        console.log(err);
    }

    try {
        const result = await db.query(selectQuery)
        if (!result.rows){
            return ;
        }
        else {
            return result.rows;
        }
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

export default getMonthData;