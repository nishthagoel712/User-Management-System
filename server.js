const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const path = require("path");

const connectDB = require('./server/database/connection');

dotenv.config({path : 'config.env'})

const app = express()
const PORT = process.env.PORT||8080

//log requests on the console
app.use(morgan('tiny'))

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

// app.get('/',(req,res)=>{
//     //res.send('Crud Application')
//     res.render('index');
// })

// app.get('/add-user',(req,res)=>{
//     res.render('add_user');
// })

// app.get('/update-user',(req,res)=>{
//     res.render('update_user');
// })


//load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{ console.log(`Server is running on http://localhost:${PORT}`)})