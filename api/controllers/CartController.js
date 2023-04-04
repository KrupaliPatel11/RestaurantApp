const uuid = require("uuid-random")
module.exports = {

    // Add Food to cart
    add: async (req, res) => {
        const { quantity, foodName } = req.body
        if (!foodName) {
            return res.send({ Message: "Food Name is required" })
        }
        const food = await Food.findOne({ foodName: foodName })
        if (!food) {
            return res.send({ Message: "Food not found" })
        }
        const alreadyCart = await Cart.findOne({
            userId: req.userData.userId,
            foodName: foodName,
            isDeleted : false
        })
        if (alreadyCart) {
            return res.send({ Message: "Already added to cart" })
        }
        if (!quantity) {
            const cart = await Cart.create({
                id: uuid(),
                userId: req.userData.uuid,
                foodName: foodName,
                totalAmount: food.price
            }).fetch()
            return res.send({
                Message: "Order successfully added to cart",
                cartItem: cart
            })
        }
        const cart = await Cart.create({
            id: uuid(),
            userId: req.userData.uuid,
            foodName: foodName,
            quantity: quantity,
            totalAmount: quantity * food.price,
        }).fetch()
        return res.send({
            Message: "Order successfully added to cart",
            cartItem: cart
        })
    },

    // List cart order
    list: async (req, res) => {
        userId = req.userData.userId
        const cartOrder = await Cart.find({ userId: userId, isDeleted: false })
        if (cartOrder.length <= 0) {
            return res.send({ Message: "You have not any cart order" })
        }
        return res.send({
            Message: "All carted order",
            count: cartOrder.length,
            cartOrder: cartOrder
        })
    },

    // Edit order in cart
    edit: async (req, res) => {
        const { foodName, newQuantity } = req.body
        const food = await Food.findOne({ foodName: foodName })
        const cartOrder = await Cart.findOne({ userId: req.userData.uuid, foodName: foodName, isDeleted: false })
        if (!cartOrder) {
            return res.send({ Message: "Cart order not found" })
        }
        if (cartOrder.quantity == newQuantity) {
            return res.send({ Message: "Cart order is already updated" })
        }
        const updatedCart = await Cart.updateOne({ userId: req.userData.uuid, isDeleted: false, foodName: foodName })
            .set({ quantity: newQuantity, totalAmount: newQuantity * food.price })
        return res.send({
            Message: "Cart order updated",
            updatedCart: updatedCart
        })
    },

    // Delete cart order
    delete: async (req, res) => {
        const { foodName } = req.body
        userId = req.userData.uuid

        const cart = await Cart.findOne({ userId: userId, foodName: foodName, isDeleted: false })
        if (!cart) {
            return res.send({ Message: "Cart order not found" })
        }
        if (cart) {
            const deleteCart = await Cart.updateOne({ userId: userId, foodName: foodName, isDeleted: false }).set({ isDeleted: true })
            res.send({
                Message: "Cart order deleted successfully",
                deletedCart: deleteCart
            })
        }
    }
}



