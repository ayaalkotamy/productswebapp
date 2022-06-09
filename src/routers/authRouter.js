const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
//const passport = require('../config/passport');
const passport = require('passport');

const authRouter = express.Router();
// authRouter.use((req, res, next) => {
//   if(req.user){
//       next();
//   } else{
//       res.redirect('/')
//   }
// })
authRouter.route('/signUp').post((req, res) => {
  const { username, password, email} = req.body;
  // const url ='mongodb+srv://dbUser:admin@cluster0.z72qg.mongodb.net/?retryWrites=true&w=majority';
  // const dbName = 'Cluster0';
  //const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.cjz8n.mongodb.net/?retryWrites=true&w=majority' 
  // const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.l3pw3.mongodb.net/?retryWrites=true&w=majority';
  // const dbName = 'NodeExpressWebApp';
  ///////// res.json(req.body); 
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
//   (async function addUser() {
//     let client;
//     try {
//       client = await MongoClient.connect(url);

//       const db = client.db(dbName);
//       const user = { username, password };
//       const results = await db.collection('users').insertOne(user);
//       debug(results);
//       req.login(results.ops[0], () => {
//         res.redirect('/auth/profile');
//       });
//     } catch (error) {
//       debug(error);
//     }
//     client.close();
//   })();
// });

// authRouter
//   .route('/signIn')
//   .get((req, res) => {
//     res.render('signin');
//   })
//   .post(
//     passport.authenticate('local', {
//       successRedirect: '/auth/profile',
//       failureRedirect: '/',
//     })
//   );

 });

 authRouter.route('/login').get((req, res)=>{
     res.render('login');
 })
 .post(passport.authenticate('local', {
successRedirect: '/auth/profile',
failureMessage: '/',

 }));

 authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
 });

 

module.exports = authRouter;
