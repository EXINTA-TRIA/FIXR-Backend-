import Artisan from "../models/artisan.model.js";
import Order from "../models/order.model.js";

export const createOrderByCustomer = async (req, res) => {
    const customerId = req.user.id

    const { artisanId, problem, location } = req.body;

    if (!artisanId || !problem || !location) {
        return res.status(400).json({ message: "Fill all fields" })
    }

    try {
        const newOrder = new Order({
            customerId,
            artisanId,
            problem,
            location
        })
        await newOrder.save()

        return res.status(201).json("Order created!")
    } catch (err) {
        console.log("Error in createOrderByCustomer function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error creating order" } || "Server error")
    }
}

export const getOrderByCustomerId = async (req, res) => {
    const customerId = req.user.id
    try {
        let orders = await Order.find({ customerId }).populate("artisanId")
        return res.status(200).json(orders)
    } catch (err) {
        console.log("Error in getOrderByCustomerId  function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error fetching customer's orders" })
    }
}

export const getOrderByArtisanId = async (req, res) => {
    const artisanId = req.user.id
    try {
        let orders = await Order.find({ artisanId }).populate("customerId")
        return res.status(200).json(orders)
    } catch (err) {
        console.log("Error in getOrderByArtisanId function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error fetching artisan's orders" })
    }
}

export const updateOrderReview = async (req, res) => {
    const customerId = req.user.id;
    const { orderId } = req.params;
    const { comment, rating } = req.body
    try {
        let order = await Order.findByIdAndUpdate(orderId, { review: { customerId, comment, rating } }, { new: true })

        const artisan = await Artisan.findByIdAndUpdate(order.artisanId, { $push: { reviews: { customerId, comment, rating } } }, { new: true });

        return res.status(200).json(order)
    } catch (err) {
        console.log("Error in updateOrderReview function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error adding review to order" })
    }
}

export const updateOrderRepairStatus = async (req, res) => {
    const { orderId } = req.params;
    const { repairStatus } = req.body
    try {
        let orders = await Order.findByIdAndUpdate(orderId, { repairStatus }, { new: true })
        return res.status(200).json(orders)
    } catch (err) {
        console.log("Error in updateOrderRepairStatus function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error adding repair status to order" })
    }
}
export const updateOrderRepairFee = async (req, res) => {
    const { orderId } = req.params;
    const { repairFee } = req.body
    try {
        let orders = await Order.findByIdAndUpdate(orderId, { repairFee }, { new: true })
        return res.status(200).json(orders)
    } catch (err) {
        console.log("Error in updateOrderRepairFee function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error adding repair fee to order" })
    }
}

export const updateOrderRepairReport = async (req, res) => {

    const { orderId } = req.params;
    const { note } = req.body

    const preImg = req.files.preImg?.[0].filename
    const postImg = req.files.postImg?.[0].filename

    //console.log(preImg, postImg)

    try {
        let orders = await Order.findByIdAndUpdate(orderId, { repairReport: { preImg, postImg, note } }, { new: true })
        return res.status(200).json(orders)
    } catch (err) {
        console.log("Error in updateOrderRepairReport function in order.controller.js", err.message)
        return res.status(500).json({ message: "Error adding repair report to order" })
    }
}