const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const { result } = require('lodash');

const app = express();

//connect to mongodb
const dbURI ='mongodb+srv://netninja:test1234@nodemongodb.mfgxqkz.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true , useUnifiedTopology:true})
.then((results)=>app.listen(3000))
.catch((err)=>console.log(err));

// listening for request to the port 3000


app.use(morgan('dev'));
app.use(express.static('public'));


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

app.get('/blogs',(req,res) => {
    Blog.find().sort({createdAt:-1})
    .then((result) => {
        res.render('index',{title:'All Blogs',blogs: result})
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'create new Blog'});
});



// //Redirect 

// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// });


//404 Page

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});


