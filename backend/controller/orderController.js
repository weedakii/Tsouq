import catchAsyncErr from "../middlewares/catchAsyncErr.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import Order from '../model/orderModel.js'
import Product from '../model/productModel.js'

// create order
export const createOrder = catchAsyncErr(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
})
// get single order
export const getSingleOrder = catchAsyncErr(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('no order found with this id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})
// get my orders
export const getMyOrder = catchAsyncErr(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})
// admin get all orders
export const getAllOrders = catchAsyncErr(async (req, res, next) => {
    const orders = await Order.find()
    const length= orders.length

    let totalAmount = 0
    orders.forEach(e => {
        totalAmount += e.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        length,
        orders
    })
})
// admin update order process
export const updateRole = catchAsyncErr(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('order not found with this id', 401))
    }
    if (order.orderStatus === 'delivered') {
        return next(new ErrorHandler('order have already been delivered', 400))
    }
    order.orderItems.forEach(async (item) => {
        await updateStocks(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})
async function updateStocks(id, quantity) {
    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({ validateBeforeSave: false })
}
// delete order
export const deleteOrder = catchAsyncErr(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('no order found with this id', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: 'order deleted successfully'
    })
})