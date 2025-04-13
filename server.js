const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
cors = require('cors');
dbConfig = require('./database/db');



mongoose.Promise = 'globle'.Promise;
mongoose.connect(dbConfig.db, {
    //useUnifiedTopology: true,
    //useNewUrlParser: true
}).then(() => {
    console.log('Database successfully connected');
},
    error => {
        console.log('Database could not be connected' + error);
    }
)


//setup express.js
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(__dirname));

//Attachment for route page
const user = require('./routes/userRoute');
app.use('/', user);


const port = process.env.PORT || 4004;
const server = app.listen(port, () => {
    console.log('connected to port' + port);
});


//error
app.use((req, res, next) => {
    //error goes via next() method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});