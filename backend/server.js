const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); // Connect to Mongodb database


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successsfuly');
})

//Required Routs 
const exercisesRouter = require('./routes/exercises'); // evriting load from exersicises Routes when uers use /exercises
const usersRouter = require('./routes/users');  // evriting load from users Routes when uers use /users

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
})


