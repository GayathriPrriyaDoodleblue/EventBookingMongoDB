import './src/db/mongoose';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import assignRoutes from './src/routes/index';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


assignRoutes(app);

app.listen(9900, function () {
    console.log('The project is running on port 9900');
});

export default app;