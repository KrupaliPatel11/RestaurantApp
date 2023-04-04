/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const CategoryController = require("../api/controllers/CategoryController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UsersController : {
    logout : "check_auth"
  },
  CategoryController : {
    add : "check_auth",
    // list : "check_auth",
    remove : "check_auth"
  },
  FoodController : {
    add : "check_auth",
    // list : "check_auth",
    remove : "check_auth",
    edit : "check_auth"
  },
  OrderController : {
    place : "check_auth",
    cancel : "check_auth",
    track : "check_auth"
  },
  CartController : {
    add : "check_auth",
    list : "check_auth",
    edit : "check_auth",
    delete : "check_auth"
  },
  WishlistController : {
    addWishlist : "check_auth",
    list : "check_auth",
    remove : "check_auth"
  },
  BookingController : {
    Booking : "check_auth",
    cancel : "check_auth"
  }





};
