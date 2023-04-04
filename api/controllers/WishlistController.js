const uuid = require("uuid-random");
module.exports = {

    addWishlist: async (req, res) => {
        const { foodName } = req.body
        userId = req.userData.uuid

        const food = await Food.findOne({ foodName: foodName })
        if (!food) {
            return res.send({ Message: "Food is not found" })
        }

        const alreadyAdded = await Wishlist.findOne({ userId: userId, foodName: foodName })
        if (alreadyAdded) {
            return res.send({ Message: "Food already added to wishlist" })
        }

        const wishList = await Wishlist.create({
            id: uuid(),
            foodName: foodName,
            userId: userId
        }).fetch()
        return res.send({
            Message: "Added to wishlist",
            wishList: wishList
        })
    },

    list: async (req, res) => {
        const userId = req.userData.uuid
        const wishlist = await Wishlist.find({ userId: userId })
        if (wishlist.length <= 0) {
            return res.send({ Message: "Your wishlist is empty" })
        }
        return res.send({
            Message: "Your Wishlist",
            totalWishlist: wishlist.length,
            wishlist: wishlist
        })
    },

    remove: async (req, res) => {
        const { foodName } = req.body
        userId = req.userData.uuid
        if (!foodName) {
            return res.send({ Message: "Food name is required" })
        }
        const food = await Wishlist.findOne({ userId: userId, foodName: foodName, isDeleted: false })
        if (!food) {
            return res.send({ Message: "Food not found in wishlist" })
        }
        const removeWishlist = await Wishlist.updateOne({ userId: userId, isDeleted: false }).set({ isDeleted: true })
        return res.send({
            Message: "Food successfully removed from your wishlist",
            removeWishlist: removeWishlist
        })               
    }

};

