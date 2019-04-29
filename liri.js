require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
// var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: "e148499be3944bda99b5c26ae9f5279c",
//     secret: "f75187e63b0e4f7b897a22c5eca2cbca"
//   });
// console.log(spotify);

let action = process.argv[2];

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


//<------------------ OMDB Search --------------------->

function movieThis() {

   var nodeArgs = process.argv;

   var movieTitle = "";

   for (var i = 3; i < nodeArgs.length; i++){
       if (i > 3 && i < nodeArgs.length){
           movieTitle = movieTitle + "+" + nodeArgs[i];
       }
       else {
           movieTitle += nodeArgs[i];
       }
   }   

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

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

//<------------------ Bands in Town Search --------------------->           

function concertThis(){

    var artistName = process.argv[3];

     axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                
                console.log("---------------------------------------------");
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue city: " + response.data[i].venue.city);
                console.log("Concert date: " + response.data[i].datetime);
                console.log("---------------------------------------------");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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