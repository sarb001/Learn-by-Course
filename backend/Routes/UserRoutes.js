import express from 'express';
import { changepassword, getuserprofile, login, logout, register, updateprofile } from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/auth.js';
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/getuserprofile').get( isAuthenticated ,getuserprofile)


router.route('/changepassword').put( isAuthenticated ,changepassword)
router.route('/updateprofile').put( isAuthenticated ,updateprofile)


export default router;