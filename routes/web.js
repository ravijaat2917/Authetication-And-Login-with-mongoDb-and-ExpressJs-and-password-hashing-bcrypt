import {express} from '../app.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/' , userController.home);
router.get('/login' , userController.login);
router.post('/login' , userController.loginAuthentication)
router.get('/registeration' , userController.registeration);
router.post('/registeration' ,userController.createUserDoc );

export default router;