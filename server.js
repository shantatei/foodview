var express = require("express");

var restaurantController = require('./controllers/restaurantController');
var commentController = require('./controllers/commentController');
var userController = require('./controllers/userController');
var favouriteController = require('./controllers/favouriteController');
const res = require("express/lib/response");
var app = express();

app.use(express.static("./public"));
app.use(express.json());

//restaurant routes
app.route('/restaurants').get(restaurantController.getAllRestaurants);

//reviews routes
app.route('/comments').get(commentController.getAllComments);
app.route('/usercomment').post(commentController.getUserComments);
app.route('/comments/:restaurantId').get(commentController.getSomeComments);
app.route('/comments').post(commentController.addComment);
app.route('/comments/:id').put(commentController.updateComment);
app.route('/comments/:id').delete(commentController.deleteComment);

//user routes
app.route('/users').get(userController.getAllUsers);
app.route('/users').post(userController.addUser);
app.route('/users').put(userController.updateUser);
app.route('/delete').delete(userController.deleteUser);
app.route('/login').post(userController.LoginUser);
app.route('/member').post(userController.getUser);
app.route('/forgetpassword').post(userController.forgetPassword);

app.post('/validate', userController.validation);
app.put('/updatepassword',userController.updatePassword);


//favourites routes
app.route('/favourites').get(favouriteController.getAllFavourites)
app.route('/favourites/:token').get(favouriteController.getSomeFavourites)
app.route('/favourites/:token').post(favouriteController.addFavourites)
app.route('/favourites/:id').delete(favouriteController.deleteFavourites)

app.get('/:username/:token', (req, res)=>{
    res.sendFile(__dirname + '/public/reset-password.html')
});
app.listen(8080, "127.0.0.1");
console.log("web server running @http://127.0.0.1:8080");