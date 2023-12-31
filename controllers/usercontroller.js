const express=require('express');
const router=express.Router();
const User = require('../models/user');

//profilepage
module.exports.profile = async function(req, res){
    try {
        if (!req.user) {
            return res.redirect('/sign-in'); // Redirect to login if user is not found in the database
        }

        return res.render('profile', { profile_user: req.user }); // Pass the user object to the template
       
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.redirect('/sign-in'); // Handle error by redirecting to login or showing an error page
    }
}
module.exports.signup = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }
     res.render('sign_up');
  };

  module.exports.signin = (req, res) => {

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    res.render('sign_in');
  };
  //create and save user in db
  module.exports.create = async function(req, res){
    try{
        if(req.body.password !== req.body.confirm_password){
            return res.redirect('back');
        }
           
        const user = await User.findOne({email: req.body.email});

        if(!user){
            const newUser=await User.create(req.body);
            req.flash('success', 'User Created');
            console.log("new user created:" , newUser);
            return res.redirect('/users/sign-in');
        }

    }catch (error) {
            console.error('Error:', error);
           
        }
 }
 module.exports.createSession =  function(req, res){
    req.flash('success', 'Logged in Successfully');
   return res.redirect('/users/profile');
 }

// usersController.js
module.exports.destroySession = async function(req, res) {
    try {
        await new Promise((resolve, reject) => {
            req.logout(function(err) {
                if (err) {
                    // Reject the promise with the error if logout fails
                    reject(err);
                } else {
                    // Resolve the promise if logout succeeds
                    resolve();
                }
            });
        });
        req.flash('success', 'Logged out Successfully');
        // Redirect the user after successfully logging out
        return res.redirect('/');
    } catch (error) {
        // Handle any error that occurred during logout
        console.error(error);
        // You might want to display an error page or a message to the user
        return res.redirect('/');
    }
}