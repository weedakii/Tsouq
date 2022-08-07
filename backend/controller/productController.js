import catchAsyncErr from "../middlewares/catchAsyncErr.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import Products from '../model/productModel.js'
import Carosal from '../model/carosalModel.js'
import APIFeatures from "../utils/APIFeatures.js";
import cloudinary from 'cloudinary'

// home page products
export const homeProducts = catchAsyncErr(async (req, res, next) => {
    const carousel = await Carosal.find()
    const resPerPage = 8
    let topRated = new APIFeatures(Products.find({type: "top rated"}), req.query).pagination(resPerPage)
    let hot = new APIFeatures(Products.find({type: "hot"}), req.query).pagination(resPerPage)
    let newest = new APIFeatures(Products.find({type: "new"}), req.query).pagination(resPerPage)

    const topRatedProducts = await topRated.query.clone()
    const hotProducts = await hot.query.clone()
    const newestProducts = await newest.query.clone()

    res.status(200).json({
        success: true,
        products: {
            carousel,
            topRatedProducts,
            hotProducts,
            newestProducts
        }
    })
})
// get all products
export const getProducts = catchAsyncErr(async(req, res, next) => {
    const resPerPage = 8
    const productsCount = await Products.countDocuments()
    const apifeatures = new APIFeatures(Products.find(), req.query)
                            .search()
                            .filter();

    let products = await apifeatures.query.clone()
    let filteredProducts = products.length

    apifeatures.pagination(resPerPage)

    products = await apifeatures.query.clone()

    res.status(200).json({
        success: true,
        productsCount,
        filteredProducts,
        resPerPage,
        products
    })
})
// admin => get all products
export const adminGetProducts = catchAsyncErr(async(req, res, next) => {
    const products = await Products.find()

    res.status(200).json({
        success: true,
        products
    })
})
// get Single Product
export const getSingleProduct = catchAsyncErr(async(req, res, next) => {
    const product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('product not found with this id', 404));
    }

    product.views += 1;
    product.save()

    res.status(200).json({
        success: true,
        product
    })
})
// admin => create Products
export const createProduct = catchAsyncErr(async(req, res, next) => {
    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLink = []

    for (let i = 0; i < images.length; i++) {
        let result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        })
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLink
    req.body.user = req.user.id
    req.body.oldPrice = req.body.price;
    req.body.index = await Products.countDocuments()
    const product = await Products.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})
// update product
export const updateProduct = catchAsyncErr(async(req, res, next) => {
    let product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('product not found with this id', 404));
    }

    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        let imagesLink = []
        for (let i = 0; i < images.length; i++) {
            let result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            })
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLink
    }

    if (req.body.oldPrice) {
        let dis = ((req.body.oldPrice - req.body.price) / req.body.oldPrice * 100)
        req.body.discount = Math.round(dis)
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})
// admin delete products
export const deleteProduct = catchAsyncErr(async(req, res, next) => {
    let product = await Products.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('product not found with this id'))
    }

    // delete img from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(
            product.images[i].public_id
        )
    }

    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})