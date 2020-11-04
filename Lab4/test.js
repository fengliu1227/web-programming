const movies = require("./data/movies");
const connection = require('./config/mongoConnection');


const main = async () => {
    const billAndTed = await movies.create("11111111","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020},"23123");
    
    //2.Log the newly created movie. (Just that movie, not all movies)
    console.log(billAndTed);
    }
    main();