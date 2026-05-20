import Course from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js"


export const createCourse = async (req, res) => {
    try{
        const {title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({message:"title or category is required"});
        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })
        return res.status(201).json(course)
    }catch(err){
        return res.status(500).json({message: `create course error ${err}`})
    }
}

export const getPublishedCourse = async (req, res) => {
    try{
        const courses = await Course.find({isPublished: true}).populate("lectures reviews");
        if(!courses){
            return res.status(400).json({message:"courses is not found"});
        }
        return res.status(200).json(courses)
    }catch(err){
        return res.status(500).json({message: `published course error ${err}`})
    }
}

export const getCreatorCourses = async (req, res) => {
    try{
        const userId = req.userId;
        const courses = await Course.find({creator: userId});
        if(!courses){
            return res.status(400).json({message:"courses is not found"});
        }
        return res.status(200).json(courses)
    }catch(err){
        return res.status(500).json({message: `creator course error ${err}`})
    }
}

export const editCourse = async (req, res) =>{
    try{
        const {courseId} = req.params;
        const {title, subtitle, description, category, level, isPublished
            , price
        } = req.body;
        let thumbnail;
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path);
        }
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"courses is not found"});
        }
        const updatedData = {title, subtitle, description, category, level, isPublished
            , price, thumbnail
        }
        course = await Course.findByIdAndUpdate(courseId, updatedData, 
            {new: true}
        )
        return res.status(200).json(course)
    }catch(err){
        return res.status(500).json({message: `edit course error ${err}`})
    }
}

export const getCourseById = async (req, res) => {
    try{
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"course is not found"})
        }
        return res.status(200).json(course);
    }catch(err){
         return res.status(500).json({message: `failed to get course error ${err}`})
    }
}

export const removeCourse = async (req, res) => {
    try{
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"course is not found"})
        }
        course = await Course.findByIdAndDelete(courseId, {new: true})
        return res.status(200).json({message: "course removed"});
    }catch(err){
        return res.status(500).json({message: `failed to remove course error ${err}`})
    }
}

export const createLecture = async (req, res) => {
    try{
        const {lectureTitle} = req.body;
        const {courseId} = req.params;
        if(!lectureTitle || !courseId){
            return res.status(400).json({message:"lecture title is required"})
        }
        const lecture = await Lecture.create({lectureTitle});
        const course = await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
        }
        await course.save();
        await course.populate("lectures")
        //await course.save();
        return res.status(201).json({lecture, course})
    }catch(err){
        return res.status(500).json({message:`failed to create lectures ${err}`})
    }
}
// export const createLecture = async (req, res) => {
//     try {

//         const { lectureTitle } = req.body;
//         const { courseId } = req.params;

//         if (!lectureTitle || !courseId) {
//             return res.status(400).json({
//                 message: "Lecture title is required"
//             });
//         }

//         const course = await Course.findById(courseId);

//         if (!course) {
//             return res.status(404).json({
//                 message: "Course not found"
//             });
//         }

//         const lecture = await Lecture.create({
//             lectureTitle
//         });

//         course.lectures.push(lecture._id);

//         //await course.save();

//         await course.populate("lectures");

//         return res.status(201).json({
//             lecture,
//             course
//         });

//     } catch (err) {

//         console.log(err);

//         return res.status(500).json({
//             message: `Failed to create lectures ${err.message}`
//         });
//     }
// }

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        await course.save();
        await course.populate("lectures")
        //await course.save()
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({message:`Failed to get Lectures ${error}`})
    }
}

// export const getCourseLecture = async (req,res) => {
//     try {

//         const {courseId} = req.params

//         const course = await Course.findById(courseId)
//         .populate("lectures")

//         if(!course){
//             return res.status(404).json({
//                 message:"Course not found"
//             })
//         }

//         return res.status(200).json(course);

//     } catch (error) {

//         return res.status(500).json({
//             message:`Failed to get Lectures ${error.message}`
//         })
//     }
// }


export const editLecture = async (req, res) =>{
    try{
        const {lectureId} = req.params;
        const {isPreviewFree, lectureTitle} = req.body;
        const lecture = await Lecture.findById(lectureId);
        if(!lectureId){
            return res.status(404).json({message: "lecture is not found"})
        }
        let videoUrl;
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl;
        }
        lecture.isPreviewFree = isPreviewFree;
        await lecture.save();
        return res.status(200).json(lecture)
    }catch(err){
        return res.status(500).json({message:`failed to edit lectures ${err}`})
    }
}

export const removeLecture = async (req, res) => {
    try{
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture){
            return res.status(404).json({meaage: "lecture is not found"});
        }
        await Course.updateOne(
            {lectures: lectureId},
            {$pull: {lectures: lectureId}}
        )
        return res.status(200).json({message: "Lecture deleted"})
    }catch(err){
        return res.status(500).json({message:`failed to delete lectures ${err}`})
    }
}

export const getCreatorById = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        if(!user){
             return res.status(404).json({meaage: "user is not found"});
        }
        return res.status(200).json(user);
    }catch(err){
        return res.status(200).json({message: `failed to get creator ${err}`})
    }
}

