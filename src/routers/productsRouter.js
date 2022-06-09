const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
//const products = require('../data/products.json');
const debug = require('debug')('app:productsRouter');
const productsRouter = express.Router();
const {MongoClient, ObjectID} = require('mongodb');

productsRouter.use((req, res, next) => {
    if(req.user){
        next();
    } else{
        res.redirect('auth/login')
    }
})


productsRouter.route('/').get((req, res) => {
    // const url ='mongodb+srv://dbUser:admin@cluster0.z72qg.mongodb.net/?retryWrites=true&w=majority';
    // const dbName = 'Cluster0';
  //  const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.cjz8n.mongodb.net/?retryWrites=true&w=majority' 
//   const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.l3pw3.mongodb.net/?retryWrites=true&w=majority';
//   const dbName = 'NodeExpressWebApp';
const url = 'mongodb+srv://ayaalkotamy:ayaalkotamy@productswebapp.7iclf.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ProductsWebApp';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to mongodb');

            const db= client.db(dbName);

            const products = await db.collection('product').find().toArray();
          
        res.render('products', {products});
        }
        catch(error){
           debug(error.stack);
        }
        //client.close();
     }());
    
   // res.render('products', {products})
})
 
productsRouter.route('/:id').get((req, res) => {
     const id = req.params.id;
    //  const url ='mongodb+srv://dbUser:P@ssw0rd@nodeexpresswebapp.vdeeu.mongodb.net/?retryWrites=true&w=majority';
    //  const dbName = 'NodeExpressWebApp';
    // const url ='mongodb+srv://dbUser:admin@cluster0.z72qg.mongodb.net/?retryWrites=true&w=majority';
    // const dbName = 'Cluster0';
    //const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.cjz8n.mongodb.net/?retryWrites=true&w=majority' 
    //const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.l3pw3.mongodb.net/?retryWrites=true&w=majority'
    // const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.l3pw3.mongodb.net/?retryWrites=true&w=majority';
    // const dbName = 'NodeExpressWebApp';
    const url = 'mongodb+srv://ayaalkotamy:ayaalkotamy@productswebapp.7iclf.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'ProductsWebApp';
    
     (async function mongo(){
         let client;
         try{
             client = await MongoClient.connect(url);
             debug('Connected to mongodb');
 
             const db= client.db(dbName);
 
             const product = await db.collection('product').findOne({_id: new ObjectID(id)});
            res.render('product', {product})
         }
         catch(error){
             debug(error.stack);
         }
     }())
   
 })
 
 module.exports = productsRouter;