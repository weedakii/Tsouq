import Carusel from '../model/carosalModel.js'
import Category from '../model/categoryModel.js'
import catchAsyncErr from "../middlewares/catchAsyncErr.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import cloudinary from 'cloudinary'

// get Category
export const getCategory = catchAsyncErr(async (req, res, next) => {
    
    const category = await Category.find()

    res.status(200).json({
        success: true,
        category
    })
})
export const createCategory = catchAsyncErr(async (req, res, next) => {
    
    const category = await Category.create(req.body)

    res.status(200).json({
        success: true,
        category
    })
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
    let carousel = await Carusel.create(req.body)

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

