import express from 'express';
import { getuserprofile, login, logout, register } from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/auth.js';
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/getuserprofile').get( isAuthenticated ,getuserprofile)


export default router;