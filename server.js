const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
 var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to handlebars, Say gas pedal'
  });
});
app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/portfolio', (req, res)=>{
  res.render('portfolio.hbs');
});

app.get('/bad', (req,res)=>{
  res.send({errorMessage: 'Bad request'});
});




app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
