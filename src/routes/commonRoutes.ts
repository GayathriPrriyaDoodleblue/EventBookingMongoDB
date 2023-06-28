import { Router } from 'express';
import { saveUser,login,saveEvent,bookEvent,getEventsById,deleteBooking,eventsAroundMe} from '../controllers/userControllers';
const router: Router = Router();
import  { authMiddleware }  from '../middleware/authentication';




router.post('/create', saveUser);
router.post('/login', login);
router.post('/createEvent',authMiddleware('admin'),saveEvent);
router.post('/bookEvent',authMiddleware('user'), bookEvent);
router.get('/getEvents/:userId',authMiddleware('user'), getEventsById);
router.delete('/deleteBooking/:id',authMiddleware('user'), deleteBooking);
router.get('/eventsAroundMe',authMiddleware('user'), eventsAroundMe);

export default router;