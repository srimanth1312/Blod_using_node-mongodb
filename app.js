const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const blogRoutes=require('./routes/blogRoutes');
// const Blog=require('./models/blog');
//express app
const app =express();

//connect to mongodb
const dbURI='mongodb+srv://srimanth:srimanth123@cluster0.2ype49k.mongodb.net/node?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(3000))
 .catch((err)=> console.log(err));

//regester view engine
app.set('view engine','ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
  });

app.get('/about',(req,res)=>{
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html',{root: __dirname});
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root: __dirname});
    res.status(404).render('404', { title: '404' });
});