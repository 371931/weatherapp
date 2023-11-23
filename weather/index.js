import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY || "e3f8b30901cc4313685f4ce1b04ef330";

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
            let condition = result.weather[0].main.toLowerCase();
            let link = weather(condition);
            res.render("index.ejs",{datas : result, links:link});
        }catch(error){
            console.log(error.response.data);
            res.render("index.ejs",{error : "nothing"})
        }
    }
});

app.listen(port,()=>{
    console.log(`runnning sucessfully on http://localhost:3000/`);
});

function weather(condition){
    let link;
    switch (condition){
        case "clear":
            link = "https://static.vecteezy.com/system/resources/previews/017/675/035/original/cute-cartoon-happy-sun-with-face-isolated-on-white-background-summer-shadowed-clip-art-sunshine-icon-in-kid-s-style-sunny-weather-symbol-vector.jpg";
            break;
            
        case "clouds":
            link = "https://static.vecteezy.com/system/resources/previews/005/111/694/original/weather-illustration-on-a-transparent-background-premium-quality-symbols-line-flat-color-icon-for-concept-and-graphic-design-vector.jpg";
            break;

        case "drizzle":
            link = "https://i.pinimg.com/originals/de/4f/61/de4f618c20951e5c725511c9e2c69649.png";
            break;

        case "mist":
            link = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
            break;

        case "rain":
            link = "https://cdn-icons-png.flaticon.com/512/4150/4150897.png";
            break;

        case "snow":
            link = "https://cdn-icons-png.flaticon.com/512/6221/6221304.png";
            break;
        
        default:
            link = "https://cdn-icons-png.flaticon.com/512/6221/6221304.png";
            break;
    }
    return link;
}