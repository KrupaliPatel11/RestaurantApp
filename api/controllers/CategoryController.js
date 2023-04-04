const uuid = require("uuid-random")

module.exports = {

    // Add category by admin
    add: async (req, res) => {
        const CategoryName = req.body.CategoryName
        const role = req.userData.role
        if (!CategoryName) {
            return res.send({ Error: "Category Name Is Required" })
        }
        if (role != 'admin') {
            return res.send({ Error: "You cannot add category" })
        }
        const category = await Category.find({
            CategoryName: CategoryName,
        })
        if (category.length >= 1) {
            return res.send({ Message: "Category Is Already Added" })
        }
        if (role == 'admin') {
            try {
                const category = await Category.create({
                    id: uuid(),
                    CategoryName: CategoryName
                }).fetch()
                return res.send({ Success: "Category Added Successfully", category: category })
            } catch (err) {
                return res.send(err)
            }
        } else {
            return res.send({ Message: "You cannot add category" })
        }
    },

    // List category
    list: async (req, res) => {
        try {
            const category = await Category.find({ isDeleted: false })
            return res.send({
                Message: "List of all category",
                count: category.length,
                category: category
            })
        } catch (err) {
            return res.send(err)
        }
    },

    // Remove category by admin
    remove: async (req, res) => {
        const CategoryName = req.body.CategoryName
        const role = req.userData.role
        if (role !== 'admin') { return res.send({ Message: "You cannot remove the category" }) }
        const category = await Category.findOne({ CategoryName: CategoryName, isDeleted: false })
        if (!category) { return res.send({ Error: "Category is not found" }) }
        const food = await Food.find({ catId: category.id })
        if (food.length <= 0) {
            const delCategory = await Category.updateOne({
                CategoryName: CategoryName,
                isDeleted: false,
            }).set({ isDeleted: true })
            return res.send({
                Message: "Category Deleted Successfully",
                deletedCategory: delCategory
            })
        } else {
            res.send({ Message: "Category cannot be removed it is already in use" })
        }
    }


}
