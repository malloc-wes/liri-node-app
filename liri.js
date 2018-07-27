var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require("fs");

var getTweets = function () {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: "andra_sew" };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for (var i = 0; i < tweets.legnth; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}

var getArtistNames = function (artist) {
    return artist.name;
}

var getSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data);
        /*var songs = data.tracks.items;
        for (var i = 0; i < songs.legnth; i++) {
            console.log(i);
            console.log("artist(s): " + songs[i].artists.map(getArtistNames));
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + song[i].preview_url);
            console.log("--------------------");
        }*/
    });
}
var getMovie = function (movieName) {

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=550c4bb&", function (error, response, body) {
        if(!error && response.statusCode == 200){

        var jsonData = JSON.parse(body);

        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        }
    });

}

var fileText = function(){

fs.readFile('random.txt', 'utf8', function(err, data){
    if(err) throw err;

    var textArr = data.split(",");

    if(textArr.legnth == 2){
        pick(textArr[0], textArr[1]);
        }
        else if (textArr.legnth == 1){
            pick(textArr[0]);
        }
});
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'show-tweets':
            getTweets();
            break;
        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
        case 'file-text':
            fileText();
            break;
        default:
            console.log("Liri doesn't understand");
    }
}

var runApp = function (firstArg, secondArg) {
    pick(firstArg, secondArg);
};

runApp(process.argv[2], process.argv[3]);