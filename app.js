import express from "express";
import https from "https";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res) =>{
    const query = req.body.cityName;
    const apiKey = "add0edfb4edb59a988d14fadd0867b5b";
    const unit = req.body.tempMetric;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) =>{
            const weatherData = JSON.parse(data);
            const location = weatherData.name;
            const temperature = weatherData.main.temp;
            const WeatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>" +`The temperature in ${location} is ${temperature} degrees Celsius. ` + "</h1>");
            res.write("<p>" + `The weather is currently ${WeatherDescription}` + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});


app.listen(3000, () => console.log("Server is running on port 3000."));