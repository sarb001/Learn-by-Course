import mongoose from "mongoose";

const schema =  new mongoose.Schema({

    title : {
        type:String,
        required : [true," Please Enter Course Title "],
        minlength : [4," Title must be atleast 4 Characters "],
        maxlength : [80," Title can't exceed 80 Characters "],
    },

    description : {
        type:String,
        required :  [true," Please Enter Course Dwwescription "],
        minlength : [20," Title Description must be atleast 20 Characters "],
    },

    category :
    {
        type:String,
        required : true,
    },

    createdBy : {
       type:String,
       required : [true," Enter Course Creator Name "],  
    },

    createdAt : {
        type:Date,
        default : Date.now,
    },

    // lectures : [
    //     {
    //         title : {
    //             type:String,
    //             required : true,
    //         },
    //         description : {
    //             type:String,
    //             required : true,
    //         },
    //         video : {
    //             public_id : {
    //                 type:String,
    //                 required: true,
    //             },
    //             url : {
    //                 type:String,
    //                 required : true,
    //             },
    //         },
    //     }
    // ],

    // poster : {
    //     public_id  : {
    //         type:String,
    //         required: true,
    //     },
    //     url: {
    //         type:String,
    //         required : true,       
    //     }, 
    // },

    views : {
        type:Number,
        default :0,
    },

    numofvideos:{
        type:Number,
        default:0,
    }
})

export const Course = mongoose.model("course",schema);