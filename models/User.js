"use strict";
class User {
constructor(id, username, password, email, profilepic,firstname,lastname,gender,address,mobilenum) {
this.id = id;
this.username = username;
this.password = password;
this.email = email;
this.profilepic = profilepic;
this.firstname = firstname;
this.lastname = lastname;
this.gender = gender;
this.address = address;
this.mobilenum = mobilenum;
}

setUsername(username) {
    this.username = username;
}
setPassword(password) {
    this.password = password;
}
setEmail(email) {
    this.email = email;
}
setProfilePic(profilepic) {
    this.profilepic = profilepic;
}
setFirstName(firstname){
    this.firstname = firstname
}
setLastName(lastname){
    this.lastname = lastname
}
setGender(gender){
    this.gender = gender
}
setAddress(address){
    this.address = address
}
setMobileNum(mobilenum){
    this.mobilenum = mobilenum
}
getId() {
    return this.id;
}
getUsername() {
    return this.username;
}
getPassword() {
    return this.password;
}
getEmail() {
    return this.email;
}
getProfilePic() {
    return this.profilepic;
}
getFirstName(){
    return this.firstname;
}
getLastName(){
    return this.lastname
}
getGender(){
    return this.gender
}
getAddress(){
    return this.address
}
getMobileNum(){
    return this.mobilenum
}
}
module.exports = User;