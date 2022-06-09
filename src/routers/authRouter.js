const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();
authRouter.route('/signUp').post((req, res) => {
  const { username, password, email} = req.body;
  const url = 'mongodb+srv://ayaalkotamy:ayaalkotamy@productswebapp.7iclf.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'ProductsWebApp';
  
(async function addUser(){
    let client;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
      const user = { username, password, email};
      const results = await db.collection('user').insertOne(user);
      debug(results);
      req.login(results.ops[0],()=>{
        res.redirect('/auth/profile');
         })
        } catch (error) {
          debug(error);
        }
        client.close();
}())


 });

 authRouter.route('/login').get((req, res)=>{
     res.render('login');
 })
 .post(passport.authenticate('local', {
successRedirect: '/auth/profile',
failureMessage: '/',

 }));

 authRouter.route('/profile').get((req, res) => {
   res.json(req.user) 
 });

 

module.exports = authRouter;
