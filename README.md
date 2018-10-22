# LiriBot

## Purpose

Liri bot is a node terminal application created for the purpose of doing some simple music related API searches. 

It can search:
- OMDB database, http://www.omdbapi.com/
- Bands in town database, http://www.artists.bandsintown.com/bandsintown-api
- Spotify API, https://developer.spotify.com/documentation/web-api/

### Installation

For full functionality you must have node installed, and after navigating to the folder path with the terminal run
``npm install``

Additionally, you must provide a Spotify api key and OMDB api key in the ``.env`` file to have the ability to run all commands.

### Commands

Run commands using the node terminal, preface commands with node.

To see full list of commands and their descriptions in the terminal run ``liri help``.

Available commands are
```
concert-this : Search bands in town API for concert venues and location
spotify-this : Search spotify API for information about this track
movie-this : Search OMDB API for various information about movie
do-what-it-says : Use spotify API on title located in random.txt
```

### Dependencies

Liri bot uses the following node packages to provide its functionality
- dotenv
- keys
- fs
- inquirer
- request
- node-spotify-api
