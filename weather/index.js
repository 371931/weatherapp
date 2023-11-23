import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("",async(req,res)=>{
    res.render("index.ejs");
});

app.post("/location",async(req,res)=>{
    let obj = req.body;
    let location = obj.location;
    if (location === '' ) {
        return res.redirect('/');  
    }else{
        try{
            let response = await axios.get("http://api.openweathermap.org/data/2.5/weather",{
                params:{
                    q: location,
                    units: "metric",
                    appid: apiKey
                }});
            let result = response.data;
            res.render("index.ejs",{datas : result});
        }catch(error){
            console.log(error.response.data);
            res.render("index.ejs",{error : "nothing"})
        }
    }
});

app.listen(port,()=>{
    console.log(`runnning sucessfully`);
});