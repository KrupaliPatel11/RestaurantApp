const uuid = require("uuid-random")

module.exports = {

    place: async (req, res) => {
        userId = req.userData.uuid
        const { currentAddress } = req.body

        if (!currentAddress) {
            return res.send({ Message: "Current Address is required" })
        }
        
        const cartOrder = await Cart.find({ userId: userId, isDeleted: false })
        console.log(cartOrder);

        if (cartOrder.length > 0) {
            const updateCart = await Cart.update({userId : userId, isDeleted: false}).set({isDeleted: true})
            
            const order = await Order.create({
                id: uuid(),
                userId: userId,
                cartOrder: cartOrder,
                orderAt: new Date().toLocaleString(),
                currentAddress: currentAddress
            }).fetch()
            return res.send({
                Message: "Order place successfully",
                yourOrder: order
            })
        } else {
        return res.send({ Message: "Not found any order in your cart" })
        }
    },

    // Cancel order
    cancel: async (req, res) => {
        const { orderId } = req.body
        userId = req.userData.uuid
        if (!orderId) {
            return res.send({ Message: "Order ID is required" })
        }
        const order = await Order.findOne({
            id: orderId,
            isDeleted: false
        })
        if (!order) {
            return res.send({ Message: "Order Not Found" })
        }
        const cancelledOrder = await Order.updateOne({ id: orderId, }).set({ isDeleted: true })
        res.send({
            Message: "Order cancelled successsfully",
            cancelledOrder: cancelledOrder
        })
    },

    track: async (req, res) => {
        const { orderId } = req.body

        const orderTrack = await Order.findOne({ id: orderId, isDeleted: false })

        if (!orderTrack) {
            return res.send({ Message: "Order ID is invalid" })
        } else {
            return res.send({
                Message: "Your Order",
                order: orderTrack
            })
        }
    }
};

