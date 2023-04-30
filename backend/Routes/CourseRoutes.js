import express from 'express';
import { addlecture, createcourse, deletecourse, deletelecture, getallcourses , getcourselectures } 
from '../Controllers/CourseController.js';

const router = express.Router();
router.route('/allcourses').get(getallcourses)

router.route('/createcourse').post(createcourse)

router.route('/course/:id').get(getcourselectures)
.post(addlecture)
.delete(deletecourse)

router.route('/lecture').delete(deletelecture)

export default router;