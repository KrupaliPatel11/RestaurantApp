module.exports = {

  attributes: {
    userId : {
      model : "Users"
    },
    foodName : {
      model  : "Food",
      required : true
    },
    isDeleted : {
      type : "boolean",
      defaultsTo : false
    }
  },

};

