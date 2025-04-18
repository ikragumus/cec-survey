const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://gumusikra:qafSe6-vyqbac-wijzox@devdb.bypyj.mongodb.net/?ssl=true&replicaSet=atlas-8lf4r1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DevdB'); 

      console.log('Connected to MongoDB');

      mongoose.connection.on('disconnected', () => {
          console.log('Disconnected from MongoDB');
          reconnectToMongoDB();
      });

      mongoose.connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
          reconnectToMongoDB();
      });
  } catch (err) {
      console.error('MongoDB connection error:', err);

      setTimeout(reconnectToMongoDB, 500);
  }
};

const reconnectToMongoDB = () => {
  console.log('Attempting to reconnect to MongoDB...');
  
  connectToMongoDB().catch((err) =>
      console.error('Reconnect failed. Will retry:', err)
  ); 
};


module.exports=connectToMongoDB






