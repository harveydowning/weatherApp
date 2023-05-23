const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    const city = req.body.cityName
    const apiKey = "Place key here"
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData.main.temp)

            var imageUrl = ("https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png")
            res.send("The temperature in " + city + " is " + weatherData.main.temp + "<img src=" + imageUrl + " ></img>")



        })
    })
})




app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})