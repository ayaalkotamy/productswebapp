const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const debug = require('debug')('app:adminRouter');
const adminRouter = express.Router();
const { MongoClient } = require('mongodb');

const products = require('../data/newProducts.json');

adminRouter.route('/').get((req, res) => {    
const url = 'mongodb+srv://ayaalkotamy:ayaalkotamy@productswebapp.7iclf.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'ProductsWebApp';
    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to mongodb');

            const db= client.db(dbName);

            const response = await db.collection('product').insertMany(products);
            res.json(response);
        }
        catch(error){
            debug(error.stack);
        }
    }())

})
module.exports = adminRouter;