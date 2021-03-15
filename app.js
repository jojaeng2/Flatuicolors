const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static('public'));
app.set('views','./views');
app.set('view engine','pug');

app.get('/template',(req,res)=>{
    res.render('temp',{title:"title"});
})

app.post('/form_receiver',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    
    res.send(title+','+description);
})

app.get('/dynamic',(req,res)=>{
    var lis = '';
    for(var i = 0;i < 5;i++){
        lis = lis + '<li>coding</li>'
    }
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            hello, Dynamic
            <ul>
                ${lis}
            </ul>
        </body>
    </html>`;
    res.send(output);
})

app.listen(3000,()=>{
    console.log('Example app listening on port 3000!');
})