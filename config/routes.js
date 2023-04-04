/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // Users
    "POST /users/signup" : "UsersController.signup",
    "POST /users/login" : "UsersController.login",
    "POST /users/logout" : "UsersController.logout",

    // Category
    "POST /users/category" : "CategoryController.add",
    "GET /users/category" : "CategoryController.list",
    "DELETE /users/category" : "CategoryController.remove",

    // Food
    "POST /users/food/add" : "FoodController.add",
    "POST /users/food/list" : "FoodController.list",
    "DELETE /users/food/remove" : "FoodController.remove",
    "PATCH /users/food/edit" : "FoodController.edit",

    // Cart
    "POST /users/cart" : "CartController.add",
    "GET /users/cart" : "CartController.list",
    "PATCH /users/cart" : "CartController.edit",
    "DELETE /users/cart" : "CartController.delete",

    // Order
    "POST /users/order/place" : "OrderController.place",
    "DELETE /users/order/cancel" : "OrderController.cancel",
    "POST /users/order/track" : "OrderController.track",

    // Wishlist
    "POST /users/add/wishlist" : "WishlistController.addWishlist",
    "GET /users/wishlist" : "WishlistController.list",
    "DELETE /users/wishlist" : "WishlistController.remove",

    // Booking
    "POST /users/table/booking" : "BookingController.booking",
    "DELETE /users/table/cancel" : "BookingController.cancel",
};
