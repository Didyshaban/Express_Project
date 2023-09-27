const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect to mongodb
const dbURI ='mongodb+srv://netninja:test1234@nodemongodb.mfgxqkz.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true , useUnifiedTopology:true})
.then((results)=>app.listen(3000))
.catch((err)=>console.log(err));



//middleware

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.redirect('/blogs');
    
});

app.get('/about',(req,res)=>{
    // res.send('<p>Welcome to about page</p>')
    // res.sendFile('./Views/about.html',{root: __dirname});
    res.render('about',{title:'About'});
});

//blogs routes

app.use('/blogs',blogRoutes);
// //Redirect 

// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// });


//404 Page

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});


