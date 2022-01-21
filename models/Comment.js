"use strict";
class Comment {
constructor(id, restaurantId, restaurant, userId, username, review, rating, dateposted) {
this.id = id;
this.restaurantId = restaurantId;
this.restaurant = restaurant;
this.userId = userId;
this.username = username;
this.review = review;
this.rating = rating;
this.dateposted = dateposted;
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
setReview(review) {
    this.review = review;
}
setRating(rating) {
    this.rating = rating;
}
setDatePosted(dateposted) {
    this.dateposted = dateposted;
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
getReview() {
    return this.review;
}
getRating() {
    return this.rating;
}
getDatePosted() {
    return this.dateposted;
}


}
module.exports = Comment;
