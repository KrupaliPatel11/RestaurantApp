module.exports = {

  attributes: {
    userId: {
      model: "Users"
    },
    foodName: {
      model: "Food"
    },
    quantity: {
      type: "number",
      defaultsTo : 1
    },
    totalAmount: {
      type: "number",
    },
    isDeleted : {
      type : "boolean",
      defaultsTo : false
    }

  }
};

