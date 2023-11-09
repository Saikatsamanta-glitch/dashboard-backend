const mongoose = require('mongoose');

// connecting database 
mongoose.connect('mongodb://127.0.0.1:27017/course_table')
.then(()=>{
        console.log("Connected to database");
})
.catch((err)=>{
        console.log("Disconnected",err);
})