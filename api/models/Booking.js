module.exports = {

  attributes: {

    userId : {
      model : "Users"
    },
    date : {
      type : "string",
    },
    guest : {
      type : "number"
    },
    time : {
      type  : "string"
    },
    isDeleted : {
      type : "Boolean",
      defaultsTo : false
    }
  },

};

