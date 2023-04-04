/**
 * Food.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    foodName: {
      type: "String",
      required: true,
      unique: true
    },
    price: {
      type: "number",
      required: true
    },
    catId: {
      model: 'Category'
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false
    }
  },

};

