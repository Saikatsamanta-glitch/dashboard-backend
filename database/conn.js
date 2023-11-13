const mongoose = require('mongoose');
// connecting database 
mongoose.connect(process.env.MONGO_DB)
.then(()=>{
        console.log("Connected to database");
})
.catch((err)=>{
        console.log("Disconnected",err);
})