const express = require("express");

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        name:"TableHaver",
        id:1,
        email:"got@table.haha",
        phone:"1234"
    }
]

const waitlist = [
    {
        name:"slowpoke",
        id:2,
        email:"no@table.sadface",
        phone:"12223"
    }
]

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.send('Home page');
})

app.get('/reserve', (req,res)=>{
    res.send('reserve page');
})

app.get("/api/tables", (req,res)=>{
    res.json(tables);
})

app.get("/api/waitlist", (req,res)=>{
    res.json(waitlist);
})

app.post("/reserve",(req,res)=>{
    if(tables.length<5){
        tables.push(req.body);
        const responseObj = {
            hasTable: true,
            userData: req.body
        }
        res.json(responseObj);
    } else {
        waitlist.push(req.body)
        const responseObj = {
            hasTable: false,
            userData: req.body
        }
        res.json(responseObj);
    }
})



app.listen(PORT, function() {
    console.log('App listening on PORT' + PORT);
})