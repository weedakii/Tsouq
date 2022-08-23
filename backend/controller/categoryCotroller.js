import Carusel from '../model/carosalModel.js'
import Category from '../model/categoryModel.js'
import catchAsyncErr from "../middlewares/catchAsyncErr.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import cloudinary from 'cloudinary'
import fs from 'fs'

// get Category
export const getCategory = catchAsyncErr(async (req, res, next) => {
    
    const category = await Category.find()

    res.status(200).json({
        success: true,
        category
    })
})
// create category
export const createCategory = catchAsyncErr(async (req, res, next) => {
    let {name} = req.body
    const path = req.file.destination.split('backend/')[1] + req.file.filename
    
    let image_url = `https://tsouq-backend.herokuapp.com/${path}`
    const category = await Category.create({name, image_url, path})

    res.status(200).json({
        success: true,
        category
    })
})
// delete category
export const deleteCategory = catchAsyncErr(async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return next(new ErrorHandler("Category not found", 404))
        }
        fs.unlinkSync('backend/'+category.path)
        
        await category.remove()
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
})
// delete carusel
export const deleteCarusel = catchAsyncErr(async (req, res, next) => {
    try {
        console.log(req.params.id);
        const carusel = await Carusel.findById(req.params.id)
        if (!carusel) {
            return next(new ErrorHandler("carusel not found", 404))
        }
        fs.unlinkSync('backend/'+carusel.path)
        
        await carusel.remove()
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
})
// get carousel
export const getCarousel = catchAsyncErr(async (req, res, next) => {
    const carusel = await Carusel.find()

    res.status(200).json({
        success: true,
        carusel
    })
})
// get single carousel
export const getSingleCarusel = catchAsyncErr(async (req, res, next) => {
    const carusel = await Carusel.findById(req.params.id)

    if (!carusel) {
        return next(new ErrorHandler('Carusel not found with this id', 404));
    }

    res.status(200).json({
        success: true,
        carusel
    })
})
// create carousel
export const createCarousel = catchAsyncErr(async (req, res, next) => {
    let {public_id} = req.body
    const path = req.file.destination.split('backend/')[1] + req.file.filename
    
    let url = `https://tsouq-backend.herokuapp.com/${path}`
    
    let carousel = await Carusel.create({url, public_id, path})

    res.status(200).json({
        success: true,
        carousel
    })
})
// update carousel
export const updateCarousel = catchAsyncErr(async (req, res, next) => {
    let carusel = await Carusel.findById(req.params.id)

    if (!carusel) {
        return next(new ErrorHandler("Carusel not found", 404))
    }

    if (req.body.images !== '') {

        await cloudinary.v2.uploader.destroy(carusel.public_id)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: 'carusel',
            with: 150,
            crop: "scale",
        })
        req.body.public_id= myCloud.public_id,
        req.body.url= myCloud.secure_url
        
    }

    carusel = await Carusel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        carusel
    })
})

