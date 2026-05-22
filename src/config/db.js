// const { Client } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();

// const client = new Client({
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     host:process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     database:process.env.DB_DATABASE,
// });

// const dbConnect = async () =>{
//     try{
//         await client.connect().then(()=>
//         console.log(`Connected to ${process.env.DB_DATABASE}`));
//     }catch (err){
//         console.log(err,"Cannot Connect to Database!");
//         process.exit(1);
//     }
// };

// module.exports = {
//     client,
//     dbConnect
// }

const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log("Database connected");
  } catch (err) {
    console.log(err, "Cannot Connect to Database!");
    process.exit(1);
  }
};

module.exports = {
  client,
  dbConnect,
};