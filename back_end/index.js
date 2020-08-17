var express = require('express');
var app = express();
var session = require('express-session');
var sql = require("mssql");
var fs = require('fs');
let multer = require("multer");
var bodyParser = require('body-parser');
// var LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'mssql',
    database: 'book',
    username: 'hoanganh1',
    host: 'localhost',
    port: '1433',
    password: 'hoanganh23',
    logging: true,
})
app.use(session({
    secret: "mysecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000 * 60*60*24
    }
}))

const passport = require('passport');
// const { profile } = require('console');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(passport.initialize())
app.use(passport.session())
// app.use(passport.initialize());

passport.use(
    new GoogleStrategy(
      {
        clientID: '716399266209-fjfedph6jgq5l415flu51ophhv9qqgfr.apps.googleusercontent.com',
        clientSecret: '-bmFlcZxcqyi15pQbsIKLrIR',
        callbackURL: '/auth/google/callback'
      },(token, refreshToken,profile,done)=>{
        // console.log('a',profile)
        let body=profile;
        sequelize.query("SELECT * FROM khachhang", { type: sequelize.QueryTypes.SELECT})
        .then(users => {
        // console.log(users)
        const db=users;
        const userabc= db.find(user => user.username === body.emails[0].value);
        console.log(userabc)
        if (userabc && userabc.password === body.id ) {
            console.log('thanh cong')
            app.get('/testgg',(req,res)=>{
                req.session.username=userabc.username
                res.send(userabc.username)
            })
            // localStorage.getItem('usename',userabc.username)
            return done(null,userabc)
            } else {
                var sql1 = `insert into khachhang values('${body.emails[0].value}','${body.id}','${body.displayName}')`
                sequelize.query(sql1);
                app.get('/testgg',(req,res)=>{
                    req.session.username=userabc.username
                    res.send(userabc.username)
                })
                const newUser={
                    id:10000000,
                    username:body.emails[0].value,
                    fullname:body.displayName,
                    password:body.id
                }
                return done(null,newUser)
            }
        })
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser((id,done)=>{
    sequelize.query("SELECT * FROM khachhang", { type: sequelize.QueryTypes.SELECT})
        .then(users => {
                const value=users.find(user1=>user1.id===id)
                if (value){ 
                    done(null,value)
                } else done(null,false)
        })
})
app.get('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']
    })
  );
app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect:'http://localhost:3000/',
    failureRedirect: '/'
}));
app.post('/login1', (req, res)=> {
    body=req.body;
    
    sequelize.query("SELECT * FROM khachhang", { type: sequelize.QueryTypes.SELECT})
    .then(users => {
    console.log(users)
    const db=users;
    const userabc= db.find(user => user.username == body.username);
    console.log(userabc)
    if (userabc && userabc.password == body.password ) {
        req.session.username = req.body.username;
        req.session.name=userabc.name;
        return res.send("thanh cong")
        } else { 
            req.session.username = undefined ;
            req.session.name = undefined ;
            res.send("that bai")
                }
    })
});
app.get('/hot',(req,res)=>{
    sequelize.query('select * from hot',{ type: sequelize.QueryTypes.SELECT})
    .then(values=>{
        res.send(values)
    })
})
app.get('/logout',(req,res)=>{
    req.session.username=undefined;
    req.session.name=undefined;
    res.send("dang xuat")
})
app.post('/add',(req,res)=>{
    const body=req.body
    console.log(body,req.session.username)
    sequelize.query(`select id from khachhang where username = '${req.session.username}'`,{ type: sequelize.QueryTypes.SELECT})
    .then(id=>{
        sequelize.query(`select name from pokemon where id=${id[0].id}`,{ type: sequelize.QueryTypes.SELECT})
        .then(data=>{
           if (data.findIndex(value=>value.name===body.name)===-1){
            sequelize.query(`insert into pokemon values (${id[0].id},'${body.name}')`)
           }
        })
    })
})
app.get('/profile',(req,res)=>{
    sequelize.query(`select id from khachhang where username = '${req.session.username}'`,{ type: sequelize.QueryTypes.SELECT})
    .then(id=>{
        // console.log(id)
        sequelize.query(`select name from pokemon where id=${id[0].id}`,{ type: sequelize.QueryTypes.SELECT})
        .then(data=>res.send(data))
    })
    
})
app.get('/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (req.session.username) return res.send(req.session.username) 
        else res.send('chua dang nhap');
})
app.listen(process.env.port || 4000, function () {
    console.log('Server is running..on Port 4000');
});