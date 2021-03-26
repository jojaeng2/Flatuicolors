const { json } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const conn = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'hong971220!',
    database : 'color'
});

app.locals.pretty = true;
app.use(express.static('home/picture'));
app.use(express.static('./public'));
app.use(express.static('./zoom'));
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get(["/board","/board/:id"],(req,res)=>{
    const sql = 'SELECT id,title,name FROM board';
    const id = req.params.id;
    conn.query(sql,(err,titles,fields)=>{
        if(id){
            const sql = 'SELECT * FROM board WHERE id=?';
            conn.query(sql,[id],(err,row,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            res.render('board',{titles:[],description:row[0]});
            })
        }else {
            if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            res.render('board',{titles:titles});
        }
    })
})

app.get('/board/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM board WHERE id=?';
    conn.query(sql,[id],(err,row,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        res.render('')
    })
})

app.get('/add',(req,res)=>{
    res.render('add');
})

app.post('/add',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const name = req.body.name;
    const sql = "INSERT INTO board (title,description,name,created) VALUES(?,?,?,NOW())";
    conn.query(sql,[title,description,name],(err,result,fields)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.redirect('/board/'+result.insertId);
        }
    })
})

app.listen(process.env.PORT || 8080)