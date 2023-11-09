const express = require('express');
const app = express();
const port = 5000 || process.env.PORT;
const bodyParser = require('body-parser')
const cors = require('cors');
const users = require('./models/users')
// connection to database
require('./database/conn')
// global middleware
app.use(bodyParser())
app.use(cors())

app.get('/user',async(req,res)=>{
        const response = await users.find();
        res.json(response)
})
// batch route
app.use('/batch',require('./Controllers/accessBatch'))
// student login
app.use('/',require('./Controllers/accessUser'))
// announcement
app.use('/announcement',require('./Controllers/accessAnnouncement'))
// schedule
app.use('/schedule',require('./Controllers/accessSchedule'))

app.listen(port, ()=>{
        console.log(`Connected to port ${port} 🔥`);
}) 