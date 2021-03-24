let mongoose = require('mongoose');


const server = process.env.DB_CONNECTION; // REPLACE WITH YOUR DB SERVER
const database = process.env.DB_NAME;      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     console.log(`mongodb://${server}/${database}`);
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}





module.exports = new Database()