require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

let action = process.argv[2]

switch (action) {
    case "movie-this":
    movieThis();
    break;
}




function movieThis() {
var movieTitle = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  }
);
}