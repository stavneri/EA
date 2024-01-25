import express, { response } from "express";
import { init , db} from "./persistance/db.js"
import { addNewConnection , getConnections, addNewCategory , getCategories } from "./persistance/connections.js";


const app = express();
const port = 3000;

init().then(() => {
    app.listen(3000, () => console.log(`Listening on port ${port}`));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req,res) => {
    res.send('Hello World!')
});


app.post("/api/add-new-connection", async (req, res) => {
    console.log("add-new-connection was called");
    await addNewConnection(req.body)
    .then(response => {
        res.status(200).send(req.body);
    })
    .catch(async (error) => {
        console.log("add new connection sending error");
        await db.end();
        console.log('db has disconnected3');
        res.status(500).send(error);
    })
});

app.get("/api/get-connections", async (req, res) => {
    console.log("get-connections was called");
    await getConnections()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(async (error) => {
        console.log("get connection sending error");
        await db.end();
        console.log('db has disconnected3');
        res.status(500).send(error);
    })
});

app.post("/api/add-new-category", async (req, res) => {
    console.log("add-new-category was called");
    await addNewCategory(req.body)
    .then(response => {
        res.status(200).send(req.body);
    })
    .catch(async (error) => {
        console.log("add new category sending error");
        await db.end();
        console.log('db has disconnected3');
        res.status(500).send(error);
    })
});

app.get("/api/get-categories", async (req, res) => {
    console.log("get-categories was called");
    await getCategories()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(async (error) => {
        console.log("get categories sending error");
        await db.end();
        console.log('db has disconnected3');
        res.status(500).send(error);
    })
});
