import multer from "multer"
import path from "path"

// filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        return res.status(400).json({
            success: false,
            error: "file not sypport"
        })
    }
}

// avatar - single image
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/uploads/avatar/")
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname.replace(/\s+/g, '_') + '-' + Date.now() + path.extname(file.originalname))
    }
})
export const uploadAvatar = multer({storage: avatarStorage, fileFilter: fileFilter}).single('file')

// category - single image
const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/uploads/category/")
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname.replace(/\s+/g, '_') + '-' + Date.now() + path.extname(file.originalname))
    }
})
export const uploadCategory = multer({storage: categoryStorage, fileFilter: fileFilter}).single('categoryImage')

// carusel - single image
const caruselStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/uploads/carusel/")
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname.replace(/\s+/g, '_') + '-' + Date.now() + path.extname(file.originalname))
    }
})
export const uploadCarusel = multer({storage: caruselStorage, fileFilter: fileFilter}).single('caruselImage')

// products - multi images
const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./backend/uploads/products/")
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname.replace(/\s+/g, '_') + '-' + Date.now() + path.extname(file.originalname))
    }
})
export const uploadProducts = multer({storage: storageProducts, fileFilter: fileFilter}).fields([{name: 'productImages', maxCount: 5}])
