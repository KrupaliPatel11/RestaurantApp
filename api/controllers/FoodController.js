const uuid = require("uuid-random");
const CategoryController = require("./CategoryController");
module.exports = {

    // Add Food by admin
    add: async (req, res) => {
        const { foodName, price, catId } = req.body
        const role = req.userData.role

        if (role != 'admin') {
            return res.send({ Message: "You cannot add food" })
        }
        if (!foodName || !price || !catId) {
            return res.send({ Error: "Please fill in the required field" })
        }
        const category = await Category.find({ id: catId })
        if (category.length <= 0) {
            return res.send({ Message: "Category ID is not found" })
        }
        const food = await Food.find({ foodName: foodName })
        if (food.length >= 1) {
            return res.send({ Message: "Food is already added" })
        }
        try {
            const add = await Food.create({
                id: uuid(),
                foodName: foodName,
                price: price,
                catId: catId
            }).fetch()
            return res.send({
                Message: "Food added successfully",
                Food: add
            })
        } catch (err) {
            return res.send(err)
        }
    },

    // Remove Food by admin
    remove: async (req, res) => {
        const foodName = req.body.foodName
        const role = req.userData.role

        if (role != 'admin') {
            return res.send({ Error: "You cannot remove the food" })
        }
        if (!foodName) {
            return res.send({ Error: 'Food Name is required' })
        }
        const food = await Food.findOne({
            isDeleted: true,
            foodName: foodName,
        })
        if (food) {
            return res.send({ Error: "Food is not found" })
        }
        else {

        const removeCart = await Cart.updateOne({foodName : foodName, isDeleted: false}).set({isDeleted : true})

        const removeWishlist = await  Wishlist.updateOne({foodName : foodName, isDeleted: false}).set({isDeleted : true}) 
        
        const removeFood = await Food.updateOne({ foodName: foodName, isDeleted : false}).set({isDeleted : true})
            return res.send({
                Message: "Food removed successfully",
                removedFood: removeFood
            })
        }
            
        
    },

    // List food
    list: async (req, res) => {
        const { ID } = req.body

        let food = await Food.find({ catId: ID })
        if (!food[0]) {
            food = await Food.findOne({ id: ID })
            if (!food) {
                return res.send({ Message: "ID not found" })
            }
        }
        return res.send({
            Message: "Food Details",
            foodDetail: food
        })
    },

    // Edit food by admin
    edit: async (req, res) => {
        const { foodId, newPrice } = req.body
        const role = req.userData.role
        if (!foodId || !newPrice) {
            return res.send({ Message: "Please fill some value in required field" })
        }
        if (role != 'admin') {
            return res.send({ Message: "You cannot update price" })
        }
        const oldFood = await Food.findOne({ id: foodId })
        if (!oldFood) {
            return res.send({ Message: "Food ID is invalid" })
        }
        const updatedFood = await Food.updateOne({
            id: foodId,
        })
            .set({
                price: newPrice
            })
        return res.send({
            Message: "Food price updated successfully",
            updatedFood: updatedFood
        })
    }, 
};

