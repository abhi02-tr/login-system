const express = require('express');
const router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password:"root"
};

// Login user
router.post('/login', (req,res)=>{
    if(req.body.email == credential.email && req.body.passwd == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.send('Login success');
    } else {
        res.send("Invalid username.");
    }
});

// route for dashboard
router.get('/dashboard', (req, res)=>{
    if(req.session.user) {
        res.render('dashboard', {user: req.session.user});
    } else {
        res.redirect('/');
    }
});

// route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) {
            console.log(err);
            res.send("Error");
        }
        else{
            res.render('base', {title:"Exit", logout:"Logout Successfully"});
        }
        
    });
});

module.exports = router;