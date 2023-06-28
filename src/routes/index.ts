import { Router, Express } from 'express';
import  assignRoutes  from '../routes/commonRoutes';

const router: Router = Router();

router.use('/app', assignRoutes);

export default (app: Express) => {
    app.use(router);
};