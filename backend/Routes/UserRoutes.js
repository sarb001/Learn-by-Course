import express from 'express';
import { DeleteUser, addedtoplaylist, changepassword,
     deletemyprofile,forgetpassword, getallusers,
      getmyprofile,
      login, logout, register, removefromplaylist,
     resetpassword,
     updateUserRole, updateprofile } 
from '../Controllers/UserController.js';

import { authorizeAdmin, isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/getmyprofile').get( isAuthenticated ,getmyprofile)
router.route('/deletemyprofile').delete( isAuthenticated ,deletemyprofile)


router.route('/changepassword').put( isAuthenticated ,changepassword)


// forget get link via email 

router.route('/forgetpassword').post(forgetpassword)

// with token create new pass  

router.route('/resetpassword/:token').put(resetpassword)




router.route('/updateprofile').put( isAuthenticated ,updateprofile)


// added to Playlist

router.route('/addedtoplaylist').post(isAuthenticated,addedtoplaylist)

router.route('/removefromplaylist').delete(isAuthenticated,removefromplaylist)


// Specific for admin

router.route('/admin/users').get(isAuthenticated,authorizeAdmin,getallusers)


router.route('/admin/user/:id')
.put(isAuthenticated,authorizeAdmin,updateUserRole)
.delete(isAuthenticated,authorizeAdmin,DeleteUser)


export default router;