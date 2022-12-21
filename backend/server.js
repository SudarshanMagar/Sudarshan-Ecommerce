const app = require("./app");
const connectDB = require("./config/databaseConfig");
const dotenv = require("dotenv");
// const { connect } = require("http2");
dotenv.config({path:"backend/config/.env"});


connectDB();
app.listen(process.env.PORT, ()=>{
    console.log(`Server started in port ${process.env.PORT}`);
  console.log("Hello World");
});


