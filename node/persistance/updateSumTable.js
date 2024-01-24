import { db } from "./db.js"

async function updateSumTable (body) {
    
    const sumTableName = body.month+body.year+"sum";
    const expTableName = body.month+body.year+"exp";

    console.log (sumTableName);
    console.log(expTableName);

    const checkQuery = "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '"+sumTableName+"')";
    const createQuery = "CREATE TABLE " + sumTableName + " (id SERIAL PRIMARY KEY, category TEXT REFERENCES categories(category), amount DECIMAL(10, 2))";
    const insertQuery = "INSERT INTO " + sumTableName + " (category, amount) VALUES ($1, $2)";
    const sumQuery = "SELECT SUM (amount) FROM " + expTableName + " WHERE category = $1"
    const addSumToTable = "UPDATE " + sumTableName + " SET amount=$1 WHERE (category)=($2)" 
    
  

    // Make category array, fill it from category table.
    const categoryResult = await db.query("SELECT category FROM categories");
    let categoryArray = [];
    categoryResult.rows.forEach(async (category) => {
        categoryArray.push(category);
    });




    // Check if there is a matching table, if not - create it. 
    try{
        const result = await db.query(checkQuery);
    if (!result.rows[0].exists){
        await db.query(createQuery);
        // fill it from category array
        categoryArray.forEach(async (category) => {
            await db.query(insertQuery, [category.category, 0]);
        });
    }
    } catch (err) {
        console.log(err);
    }


    let valByCategory = 0;
    categoryArray.forEach(async (category) => {
        valByCategory = await db.query(sumQuery,[category.category]);
        if (!valByCategory.rows[0].sum){
            await db.query(addSumToTable,[0, category.category]);
        }
        else {
            await db.query(addSumToTable,[valByCategory.rows[0].sum, category.category]);
        }
    });



}

export default updateSumTable;