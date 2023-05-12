import mongoose from "mongoose";

import { Course } from "../Models/Course.js";


export const  createcourse = async(req,res) => {
    const { title,description,category ,createdBy } = req.body;

    try{
        if(!title ||!description || !category ||!createdBy){
            return res.json({message : " Please Fill All Fields "})
        }

        const user = await Course.create({
            title,
            description,
            category,
            createdBy
        })
        
        res.status(201).json({
            user,
            message: " Course is Created Succesfully ,You can add Lectures Now "
        })
    }catch(error){
        console.log('Error while Creating Course  -- ',error);
    }
}

export const  deletecourse = async(req,res) => {
    const {id} = req.params;

    const delcourse = await Course.findById(id);

    if(!delcourse){
        return res.json({message : " Course Not Found "})
    }

    await delcourse.deleteOne();
    res.status(200).json({
        message : " Course Deleted "
    })
}

export const getallcourses = async(req,res) => {

    try{
        const courses = await Course.find();
        res.status(200).json({
            courses,
        })
    }catch(error){
        console.log('error forallcourses -- ',error);
    }
}

export const addlecture    = async(req,res) => {
    const { id } = req.params;
    const {title,description} = req.body;

    const getspecificCourse = await Course.findById(id);

    if(!getspecificCourse)return res.json({message : " Course Not  Found  Can't Add Lectures Now "})

    getspecificCourse.lectures.push({title,description})

    getspecificCourse.numofvideos = getspecificCourse.lectures.length;

    await getspecificCourse.save();
    res.status(200).json({message: " Lecture Added Now "})

}

export const deletelecture = async(req,res) => {

    const { courseid , lectureid  } = req.query;

    try{
                const findcourse = await Course.findById(courseid);
                if(!findcourse){
                    return res.json({message : " Course Not Found "});
                }
                
                const findspecificlecture = findcourse.lectures.find((item) => {
                    if(item._id.toString() === lectureid.toString())
                    return item;
                })  
                
                console.log('find lecture -- ',findspecificlecture);                        // got the  lecture 
                
                findcourse.lectures = findcourse.lectures.filter((item) => {          // here Removed it Permanently 
                    if(item._id.toString() !== lectureid.toString()){
                        return item;
                    }
                })
                await findcourse.save();
                res.status(200).json({ message : " Lecture Deleted " })
                
            }catch(error){
                console.log('Error is -',error);
            }
}

export const getcourselectures = async(req,res) => {
        const { id }  = req.params;
        const findcourse = await Course.findById(id);

        if(!findcourse){ return res.json({message : " Course Not Found "})  }

        findcourse.views +=1;

        await findcourse.save();
        res.status(200).json({
            lectures : findcourse.lectures
        })
}