require('dotenv').config();
const keys = require('./keys');
const fs = require('fs');
const request = require('request');

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

const OMDBKey = keys.omdb;

const command = process.argv[2];
let commandparams = process.argv.slice(3).join();

const concertThis = function(artist) {
    request.get({
        url: `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`
    }, function(error, response, body) {
        if(error)
        {
            return console.log(error)
        }

        let Information = JSON.parse(body);

        for(let i = 0; i < Information.length; i++)
        {
            console.log("Venue:", Information[i].venue.name);
            console.log(`Location: ${Information[i].venue.city}, ${Information[i].venue.region} ${Information[i].venue.country}`);
            console.log(`Date: ${Information[i].datetime.slice(0, 10)}\n`);
        }
    })

    logCommand(artist);
}

const spotifySong = function(song) {
    if(!song)
    {
        song = "What's My Age Again";
    }

    spotify.search({ type: 'track', query: song, limit: 1 })
    .then(function(response) {
        let trackinfo = response.tracks.items[0];

        //console.log(trackinfo);
        console.log(trackinfo.name);
        console.log("Artists :");
        for(let i = 0; i < trackinfo.artists.length; i++)
        {
            console.log(`-${trackinfo.artists[i].name}`);
        }
        console.log(`Preview URL: ${trackinfo.preview_url? trackinfo.preview_url : "None"}`);
        console.log(`Album: ${trackinfo.album.name}`);
    })
    .catch(function(err) {
        console.log(err);
    });
    
    logCommand(song);
}

const movieThis = function(movie) {
    if(!movie)
    {
        movie = "Mr. Nobody";
    }

    request.get({
        url: `http://www.omdbapi.com/?apikey=${OMDBKey}&t=${movie}`,
    }, function(error, reponse, body) {
        if(error)
        {
            return console.log(error);
        }

        console.log(body);

        let Information = JSON.parse(body);

        console.log(`Title: ${Information.Title}`);
        console.log(`Release Year: ${Information.Year}`);
        console.log(`IMDB Rating: ${Information.imdbRating}/10`);
        for(let i = 0; i < Information.Ratings.length; i++)
        {
            if(Information.Ratings[i].Source === 'Rotten Tomatoes')
            {
                console.log(`Rotten Tomatoes Rating: ${Information.Ratings[i].Value}`);
                break;
            }
        }
        //rotten tomatoes
        console.log(`Country: ${Information.Country}`);
        console.log(`Language: ${Information.Language}`);
        console.log('Actors: ', Information.Actors);
        console.log(`Plot: `, Information.Plot);
    })

    logCommand(movie);
}

const logCommand = function(params) {
    fs.appendFile('log.txt', `Run: ${command} Input: ${params? params : "None"}\n`, function(error) {
        if(error)
        {
            return console.log(error);
        }
    });
}

const doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if(err)
        {
            console.log(err);
        }

        if(data) {
            spotifySong(data);
        }
    })
}

const doCommand = function(command) {
    switch(command)
    {
        case "concert-this":
            concertThis(commandparams);
            break;
        case "spotify-this":
        case "spotify-song":
            spotifySong(commandparams);
            break;
        case "movie-this":
            movieThis(commandparams);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log(`Command "${command}" not recognized as a valid command`)
    }
};
doCommand(command);
