import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on port: http://localhost: ${port}`);
    })
}

run().catch(err => console.log(err));

