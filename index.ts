import express from 'express';
import {fileDb} from "./fileDb";
import {itemsRouter} from "./routers/items";
import {locationsRouter} from "./routers/locations";
import {categoriesRouter} from "./routers/categories";

const fs = require('fs');

const app = express();
const port = 8000;

app.use(express.json());
app.use('/inventory', itemsRouter);
app.use('/inventory', locationsRouter);
app.use('/inventory', categoriesRouter);
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