const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const {v4:uuidv4} = require('uuid');

const router = require('./router');

dotenv.config('./config/cofig.env');

const app = express();

const PORT = process.env.PORT || 3000

// To parse incopming requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Load static assest
app.use('/static',express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
    secret:uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req,res)=>{
    res.render('base',{title:"Login System"});
});


app.listen(PORT, console.log(`Server is running in port: ${PORT}`));