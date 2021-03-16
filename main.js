const { json } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');

app.locals.pretty = true;
app.use(express.static('home/picture'));
app.use(express.static('./public'));
app.use(express.static('./zoom'));

app.set('views','./views');
app.set('view engine','pug');


app.get('/',(req,res)=>{
    const home_title = fs.readdirSync('./home/title');
    res.render('homeHTML',{lis:home_title});
})

app.get('/zoom',(req,res)=>{
    const id = req.query.id;
    const colorFile = fs.readFileSync('./zoom/color.json','utf-8');
    const jsonFile = JSON.parse(colorFile);
    res.render('zoom.pug',{list:jsonFile[id]});
    console.log(jsonFile["Dutch Palette"].length);
})


app.listen(3000,()=>{
    console.log('Mainjs listening on port 3000!!')
})