import mongoose from "mongoose";

import { Course } from "../Models/Course.js";
import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Utils/errorhandler.js";


export const  createcourse  =  catchAsyncError (async(req,res,next) => {
    const { title,description,category ,createdBy } = req.body;

        if(!title ||!description || !category ||!createdBy){
             return next(new ErrorHandler(" Please Fill All Fields  ",400));
            }

        const user = await Course.create({
            title,
            description,
            category,
            createdBy
        })

        res.status(201).json({
            user,
            message: " Course is Created Succesfully ,You can add Lectures Now ",
        })
})

export const  deletecourse  =  catchAsyncError(async(req,res,next) => {
    const {id} = req.params;

    const delcourse = await Course.findById(id);

    if(!delcourse){
        return res.json({message : " Course Not Found "})
    }

    await delcourse.deleteOne();
    res.status(200).json({
        message : " Course Deleted "
    })
})

export const getallcourses =   catchAsyncError(async(req,res,next) => {
       
     const keyword  =  req.query.keyword   || "";
     const category =  req.query.category  || "";
    
    const courses = await Course.find({
            title : {
            $regex : keyword,
            $options : "i" 
            }, 
            category : {
                $regex : category,
                $options : "i",
            },
        })
        res.status(200).json({
            success : true,
            courses,
        });
})

export const addlecture    =   catchAsyncError  (async(req,res,next) => {
    const { id } = req.params;
    const {title,description} = req.body;

    const getspecificCourse = await Course.findById(id);

    if(!getspecificCourse)
    return next(new ErrorHandler(" Course Not  Found  Can't Add Lectures Now ",404));
   
    getspecificCourse.lectures.push({title,description})

    getspecificCourse.numofvideos = getspecificCourse.lectures.length;

    await getspecificCourse.save();
    res.status(200).json({
        success: true,
        message: " Lecture Added Now "
    })

})

export const deletelecture     =  catchAsyncError (async(req,res,next) => {

                const { courseid , lectureid  } = req.query;

                const findcourse = await Course.findById(courseid);
                if(!findcourse){
                    return next(new ErrorHandler(" Course Not Found " , 404));
                }
                
                const findspecificlecture = findcourse.lectures.find((item) => {
                    if(item._id.toString() === lectureid.toString())
                    return item;
                });  
                
                console.log('find lecture -- ',findspecificlecture);                        // got the  lecture 
                
                findcourse.lectures = findcourse.lectures.filter((item) => {          // here Removed it Permanently 
                    if(item._id.toString() !== lectureid.toString())
                        return item;
                })

                findcourse.numofvideos = findcourse.lectures.length;

                await findcourse.save();

                res.status(200).json({ 
                    success : true,
                    message : " Lecture Deleted " 
                })
})

export const getcourselectures =  catchAsyncError(async(req,res,next) => {
        const { id }  = req.params;
        const findcourse = await Course.findById(id);

        if(!findcourse){
            return next( new ErrorHandler(" Course Not Found " , 404));
            }

        findcourse.views +=1;
        await findcourse.save();
        res.status(200).json({
            success  : true,
            lectures : findcourse.lectures
        });
})