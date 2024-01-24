import express, { response } from "express";
import bodyParser from "body-parser";
import { init , teardown, db} from "./persistance/db.js"
import {loadCsv , findCon, getData} from "./persistance/dataModel.js";
import { addNewConnection , getConnections } from "./persistance/connections.js";
import updateTable from "./persistance/updateTable.js";
import updateSumTable from "./persistance/updateSumTable.js";
import getMonthData from "./persistance/getMonthData.js";

const app = express();
const port = 3000;

init().then(() => {
    app.listen(3000, () => console.log(`Listening on port ${port}`));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

// app.use(express.json());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Access-Control-Allow-Headers"
//   );
//   next();
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/api", (req,res) => {
    res.send('Hello World!')
    // getData()
    // .then((response) => {
        // if (response){
        //     console.log("test2!!!!!!");
        //     res.status(200).send(response);
        // }
        // else {
        //     console.log("test3!!!!!!");
        //     res.status(200);
        // }
    // })
    // .catch(async (error) => {
    //     await db.end();
    //     console.log('db has disconnected1');
    //     res.status(500).send(error);
    // });
});



// app.post("/api/add-csv", async (req, res) => {
//     await loadCsv(req.body)
//     .then(response => {
//         res.status(200);
//     })
//     .catch(async (error) => {
//         console.log("load csv sending error");
//         await db.end();
//         console.log('db has disconnected2');
//         res.status(500).send(error);
//     })
// });

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

app.fetch("/api/aget-connections", async (req, res) => {
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

// app.post("/api/update-table", async (req,res) => {
//     const tableName = req.body.month+req.body.year+"exp";
//     await updateTable(tableName)
//     .catch(async (error) => {
//         await db.end();
//         console.log('db has disconnected4');
//         res.status(500).send(error);
//     });
// });

// app.post("/api/update-sum-table", async (req,res) => {
//     await updateSumTable(req.body)
//     .catch(async (error) => {
//         await db.end();
//         console.log('db has disconnected5');
//         res.status(500).send(error);
//     });
// });

// app.post("/api/get-month-table", async (req,res) => {
//     await getMonthData(req.body).then((response) => {
//         if (response){
//             console.log(response);
//             res.status(200).send(response);
//         }
//         else {
//             res.status(200);
//         }
//     }).catch(async (error) => {
//         await db.end();
//         console.log('db has disconnected6');
//         res.status(500).send(error);
//     });
// });

// const gracefulShutdown = () => {
//     teardown()
//         .catch(() => {})
//         .then(() => process.exit());
// };


// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
