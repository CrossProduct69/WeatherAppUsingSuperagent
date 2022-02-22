const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const superAgent=require("superagent");

const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    // console.log(req.body.place);
    let city=_.capitalize(req.body.place);
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d531d16bf015296debb02ddd3c2e6a06&units=metric";
    
    superAgent.get(url,function(err,response){
        if(!err){
            const temp=response.body.main.temp;
            
            res.render("home",{temp:temp});
        }
        else{
            res.send("<h1>Error</h1>");
        }
    });
    
    // res.render("home",{place: place});
});

app.listen(3000,function(){
    console.log("Listening to port 3000");
})


