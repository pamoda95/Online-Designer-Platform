const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');



//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected' ,  () =>{
    console.log(`connected to  database  : ${config.database}`);
});

//Database error
mongoose.connection.on('error' ,  (err) =>{
    console.log('Database Error'+err);
});

// Connect To Database
//mongoose.Promise = require('bluebird');
//mongoose.connect(config.database, { useMongoClient: true, promiseLibrary: require('bluebird') })
 //   .then(() => console.log(`Connected to database ${config.database}`))
 //   .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');
const canvasRoutes =require('./routes/canvasRoutes');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json({limit: '50mb'}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.use('/canvasRoutes', canvasRoutes);



// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port '+port);
});



