const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

  async create(title, plot, rating, runtime, genre, cast, info,time){
    var para = arguments;
    // if(para.length != 7) throw 'You must provide seven parameters'
    if(!title || !plot || !rating || !runtime || !genre || !cast || !info){          
        throw 'All fields need to have valid values';
      }
    if(typeof(title) != 'string') throw 'title should be a string'
    if(typeof(plot) != 'string') throw 'plot should be a string'
    if(typeof(rating) != 'string') throw 'rating should be a string'
    if(typeof(runtime) != 'string') throw 'runtime should be a string'
    if(typeof(genre) != 'string') throw 'genre should be a string'
    if(!cast || !Array.isArray(cast)) throw 'You must provide an array of cast';
    if(cast.length === 0) throw 'You must provide at least one cast.';
    if(!info || typeof(info) != 'object') throw 'info should be an object';
    if(!info.director || typeof(info.director) != 'string') throw 'You must provide the director';
    if(typeof(info.yearReleased) != 'number') throw 'You must provide the year the movie released';
    if(info.yearReleased.toString().length != 4) throw 'the year the movie released must be 4 digit number';
    let date = new Date();
    if(info.yearReleased > date.getFullYear() + 5 || info.yearReleased < 1930){
        throw 'the year the movie released should between 1930 and' + ' ' +date.getFullYear().toString();
    }
    const moviesCollection = await movies();


    let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        runtime:runtime,
        genre: genre,
        cast: cast,
        info: info,
        time : time
    };
    const insertInfo = await moviesCollection.insertOne(newMovie);
    if(insertInfo.insertedCount == 0) throw 'Could not add the movie';

    const newId = insertInfo.insertedId;

    const movie = await this.get(newId.toString());
    return movie;
  },

  async getAll() {
    const moviesCollection = await movies();

    const moviesList = await moviesCollection.find({}).toArray();

    return moviesList;
  },

  async get(id) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof(id) != 'string') throw 'You must provide an id in the type of string';
    let parsedId = ObjectId(id);

    const moviesCollection = await movies();
    const whichMovie = await moviesCollection.findOne({ _id: parsedId });
    if (whichMovie === null) throw 'No movie with that id';

    return whichMovie;
  },

  async remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof(id) != 'string') throw 'You must provide an id in the type of string';
    let parsedId = ObjectId(id);
    const moviesCollection = await movies();
    const deletionInfo = await moviesCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete movie with id of ${parsedId}`;
    }
    return { deleted: true };
  },

  async rename(id, newTitle) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof(id) != 'string') throw 'You must provide an id in the type of string';
    let parsedId = ObjectId(id);
    if (!newTitle) throw 'You must provide a new title for this movie';
    if(typeof(newTitle) != 'string') throw 'You must provide an new title in the type of string';
    const moviesCollection = await movies();
    const updatedMovie = {
      title: newTitle
    };

    const updatedInfo = await moviesCollection.updateOne(
      { _id: parsedId },
      { $set: updatedMovie }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not rename the movie successfully';
    }

    return await this.get(id);
  },

  async findDogByName(name){
    const moviesCollection = await movies();

    const moviesList = await moviesCollection.find({}).toArray();
    let res = {};
    for(let a of moviesList){
      if(name == a.title){
        res = a;
      }
    }
    return res;
  }
};