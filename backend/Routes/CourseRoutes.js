import express from 'express';
import { createcourse, getallcourses } from '../Controllers/CourseController.js';
const router = express.Router();


router.route('/createcourse').post(createcourse)

router.route('/allcourses').get(getallcourses)

export default router;