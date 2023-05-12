import express from 'express';
import { addlecture, createcourse, deletecourse, deletelecture, getallcourses , getcourselectures } 
from '../Controllers/CourseController.js';
import { authorizeAdmin, isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();

router.route('/allcourses').get(getallcourses)

router.route('/createcourse').post(isAuthenticated,authorizeAdmin,createcourse)

router.route('/course/:id')
.get(isAuthenticated,getcourselectures)
.post(isAuthenticated,authorizeAdmin,addlecture)
.delete(isAuthenticated,authorizeAdmin,deletecourse)

router
.route('/lecture')
.delete(isAuthenticated,authorizeAdmin,deletelecture)

export default router;