import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'plz enter product name'],
        trim: true,
        maxlength: [100, 'plz make sure product name is less than 100 characters']
    },
    info: {
        type: String,
        required: [true, 'plz enter product info'],
    },
    type: {
        type: String,
        required: true,
        default: 'new'
    },
    description: {
        type: String,
        required: [true, 'plz enter product description'],
    },
    oldPrice: {
        type: Number,
        maxlength: [5, 'plz make sure that the lenth is maximum 5 numbers'],
    },
    discount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'plz enter product price'],
        default: 0,
        maxlength: [5, 'plz make sure product price is less than 5 digits']
    },
    seller: {
        type: String,
        required: true,
        default: 'Tsouq'
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    ratings: {
        type: Number,
        default: 4
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'plz select product category'],
        enum: {
            values: [
                'Electronics',
                'Clothes',
                'Games',
                'Ladies',
                'Watches',
                'Shoes',
                'Books',
                'Clothes',
                'Shoes',
                'Sports'
            ],
            message: 'plz select correct product category'
        }
    },
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            comment:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAT: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', productSchema)