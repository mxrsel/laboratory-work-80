import express from 'express';
import {fileDb} from "./fileDb";
import {inventoryRouter} from "./routers/inventory";

const fs = require('fs');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/inventory', inventoryRouter)
app.use(express.static('public'));

const run = async () => {
    if(fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify(
            {
                items: [],
                location: [],
                category: []
            }));

        console.log('adding db');
    }

    app.listen(port, () => {
        console.log(`Server started on port: http://localhost:${port}`);
    })
}

run().catch(err => console.error(err));