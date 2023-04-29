import express from 'express';
import { createcourse, deletecourse, getallcourses } from '../Controllers/CourseController.js';
const router = express.Router();


router.route('/createcourse').post(createcourse)
router.route('/deletecourse/:id').delete(deletecourse)


router.route('/allcourses').get(getallcourses)

export default router;