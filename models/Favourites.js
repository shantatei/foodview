"use strict";
class Favourites {
constructor(id, restaurantId, restaurant, userId, username) {
this.id = id;
this.restaurantId = restaurantId;
this.restaurant = restaurant;
this.userId = userId;
this.username = username;
}
setRestaurantId(restaurantId) {
    this.restaurantId = restaurantId;
}
setRestaurant(restaurant) {
    this.restaurant = restaurant;
}
setUserId(userId){
    this.userId = userId;
}
setUsername(username) {
    this.username = username;
}
getId() {
    return this.id;
}
getRestaurantId() {
    return this.restaurantId;
}
getRestaurant() {
    return this.restaurant;
}
getUserId() {
    return this.userId
}
getUsername() {
    return this.username;
}

}
module.exports = Favourites;