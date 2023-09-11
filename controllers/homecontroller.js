const express=require('express');
const router=express.Router();
module.exports.home = (req, res) => {
    res.render('home');
  };