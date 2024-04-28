import express, { NextFunction, Request, Response } from 'express'
import path from 'path';
import taskRoutes from './routes/taskRoutes';
import { db } from './models';
import router from './routes/taskRoutes';


const app = express();

const cors = require('cors');
const corsOptions = {
    origin: [ 'http://localhost:8100', 'http://localhost:3000' ],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../src/public')));


// TODO: Add routing middleware here
app.use('/api/tasks', router );


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
})

db.sync({ alter: true }).then(() => {
    console.info("Connected to the database!")
});

app.listen(3000);