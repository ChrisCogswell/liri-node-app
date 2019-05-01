require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require("moment");

var spotify = new Spotify(keys.spotify);
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

            axios.get(queryUrl)
                 .then(function(response) {
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

    var nodeArgs = process.argv;

    var artistName = "";

   for (var i = 3; i < nodeArgs.length; i++){
       if (i > 3 && i < nodeArgs.length){
           artistName = artistName + "+" + nodeArgs[i];
       }
       else {
           artistName += nodeArgs[i];
       }
   }   

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

     axios.get(queryUrl)
          .then(function (response) {
            for (var i = 0; i < 4; i++) {
                
                console.log("---------------------------------------------");
                console.log("Artist name: " + artistName);
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue city: " + response.data[i].venue.city);
                console.log("Concert date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("---------------------------------------------");
            }
        });
 }
    
      

// <----------------- Spotify song search ------------------->


function spotifyThis(){

    var nodeArgs = process.argv;

    var songName = "";

   for (var i = 3; i < nodeArgs.length; i++){
       if (i > 3 && i < nodeArgs.length){
           songName = songName + " " + nodeArgs[i];
       }
       else {
           songName += nodeArgs[i];
       }
   }   
   spotify
   .search({ type: 'artist,track', query: songName })
   .then(function(response) {
     console.log("-----------------------------------------");
     console.log("Artist: " + response.tracks.items[0].artists[0].name);
     console.log("Song name: " + response.tracks.items[0].name);
     console.log("Album: " + response.tracks.items[0].album.name);
     console.log("Preview link: " + response.tracks.items[0].external_urls.spotify);
     console.log("-----------------------------------------");

   })
   .catch(function(err) {
     console.log(err);
   });
   
}


function doWhat(){
    fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
        }
        let dataArray = data.split(",");
        console.log(dataArray[0]);
        // if (dataArray[0] === "spotify-this"){
            
        //   spotifyThis() + dataArray[1];
        // }
        console.log(dataArray[1]);
});
}