require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "e148499be3944bda99b5c26ae9f5279c",
    secret: "f75187e63b0e4f7b897a22c5eca2cbca"
  });
console.log(spotify);

let action = process.argv[2]

switch (action) {
    case "movie-this":
    movieThis();
    break;

    case "concert-this":
    concertThis();
    break;

    case "spotify-this":
    spotifyThis();
    break;

    case "do-what-it-says":
    doWhat();
    break;
}




function movieThis() {
var movieTitle = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Imdb Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
    console.log("Country of origin: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);
}


function concertThis(){


}


function spotifyThis(){

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}


function doWhat(){


}