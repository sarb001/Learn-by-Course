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
        console.log('');
    }
}

export const addlecture = async(req,res) => {
    const { id } = req.params;
    const {title,description} = req.body;

    const getspecificCourse = await Course.findById(id);

    if(!getspecificCourse){
        return res.json({message : " Course Not  Found  Can't Add Lectures Now "})
    }

    getspecificCourse.lectures.push({
        title,
        description
    })

    getspecificCourse.numofvideos = getspecificCourse.lectures.length;

    await getspecificCourse.save();
    res.status(200).json({
        message: " Lecture Added Now "
    })

}

export const deletelecture = async(req,res) => {

}


export const getcourselectures = async(req,res) => {

}