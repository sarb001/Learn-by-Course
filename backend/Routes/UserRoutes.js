import express from 'express';
import { addedtoplaylist, changepassword, deleteuserprofile, forgetpassword, getuserprofile, login, logout, register, removefromplaylist, updateprofile } 
from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/auth.js';
const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/getuserprofile').get( isAuthenticated ,getuserprofile)
router.route('/deleteuserprofile').delete( isAuthenticated ,deleteuserprofile)


router.route('/changepassword').put( isAuthenticated ,changepassword)

// Deploy First 
router.route('/forgetpassword').put( isAuthenticated ,forgetpassword)


router.route('/updateprofile').put( isAuthenticated ,updateprofile)


// added to Playlist

router.route('/addedtoplaylist').post(isAuthenticated,addedtoplaylist)

router.route('/removefromplaylist').delete(isAuthenticated,removefromplaylist)


export default router;