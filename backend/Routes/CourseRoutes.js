import express from 'express';
import { createcourse } from '../Controllers/CourseController.js';
const router = express.Router();


router.route('/createcourse').post(createcourse)

export default router;