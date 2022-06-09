const passport = require('passport');
const { Strategy } = require('passport-local');
 const { MongoClient } = require('mongodb');
 const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      (username, password, done) => {

        // const user ={username, password, 'name':'ayaaa'}
        // done(null, user);

        //const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.cjz8n.mongodb.net/?retryWrites=true&w=majority' 
        // const url = 'mongodb+srv://dbUser:dbUser@nodeexpresswebapp.l3pw3.mongodb.net/?retryWrites=true&w=majority';
        // const dbName = 'NodeExpressWebApp';
       const url = 'mongodb+srv://ayaalkotamy:ayaalkotamy@productswebapp.7iclf.mongodb.net/?retryWrites=true&w=majority';
       const dbName = 'ProductsWebApp';
       
       (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const user = await db.collection('user').findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        }());
      }
    )
  );
};
