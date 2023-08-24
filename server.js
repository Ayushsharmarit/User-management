const express = require('express');
const app = express();
const {db} =  require('./config/config')

db() // calling db connection method

app.use(express.json()); // for parsing the body request data
// Routes
app.use('/user', require('./routes/userRoute'));
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));