module.exports = {

  attributes: {
      userId :{
        model : "Users"
      },
      currentAddress: { 
        type : "string",
        required : true
      },
      orderAt : {
        type : "string",
      },
      isDeliverd : {
        type : "boolean",
        defaultsTo : false
      },
      isDeleted : {
        type : "boolean",
        defaultsTo : false
      },
      
  },
};

