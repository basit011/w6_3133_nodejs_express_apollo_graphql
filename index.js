const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema')
const resolver = require('./resolvers')

//Store sensitive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
//TODO - Replace you Connection String here
const DB_NAME = "db_comp3133_employee"
const DB_USER_NAME = "sa"
const DB_PASSWORD = 'UtHZ7JlQJby4pxeh'
const CLUSTER_ID = '7wn4nmp'
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
const mongodb_atlas_url = process.env.MONGODB_URL || DB_CONNECTION;

//TODO - Replace you Connection String here
const connectDB = async() => {
    try{
      mongoose.connect(mongodb_atlas_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(success => {
        console.log('Success Mongodb connection')
      }).catch(err => {
        console.log('Error Mongodb connection')
      });
    } catch(error) {
        console.log(`Unable to connect to DB : ${error.message}`);
      }
  }

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

//Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server
server.applyMiddleware({ app });

//Start listen 
app.listen({ port: process.env.PORT }, () => {  
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  connectDB()
});
