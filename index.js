'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');

var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: "views/layouts/",
    partialsDir: 'views/partials'
});

app.engine('handlebars', hbs.engine);
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

var db
    //database
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/aerodoc', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })


})



app.get('/', (req, res) => {
    res.render('home', { layout: false });
})
