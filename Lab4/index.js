const movies = require("./data/movies");
const connection = require('./config/mongoConnection');
const { findDogByName } = require("./data/movies");

const main = async () => {
    //1.Create a movie of your choice.
    const billAndTed = await movies.create("11111","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020},"12123");
    
    //2.Log the newly created movie. (Just that movie, not all movies)
    console.log(billAndTed);

    console.log(await findDogByName("11111"));

    // //3.Create another movie of your choice.
    // const theDarkKnight = await movies.create("The Dark Knight","When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","R","2hr 32min","Action",["Christian Bale","Heath Ledger"],{director: "Christopher Nolan", yearReleased: 2008});
    
    // //4.Query all movies, and log them all
    // console.log(movies.getAll());
    
    // //5.Create a 3rd movie of your choice.
    // const HiddenFigures = await movies.create("Hidden Figures","The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.","PG","2hr 7min","Drama",["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],{director: "Theodore Melfi", yearReleased: 2016});
    
    // //6.Log the newly created 3rd movie. (Just that movie, not all movies)
    // console.log(HiddenFigures);
    
    // // 7.Rename the first movie's title
    // const updatedMovies = await movies.rename(
    //   billAndTed._id.toString(),
    //   "It is a changed title"
    // );
    // //8.Log the first movie with the updated title. 
    // console.log(await movies.get(updatedMovies._id.toString()));

    // //9.Remove the second movie you created.
    // await movies.remove(theDarkKnight._id.toString());
    
    // //10.Query all movies, and log them all
    // console.log(await movies.getAll());

    // //11.Try to create a movie with bad input parameters to make sure it throws errors.
    // try{
    //   const badCreate = await movies.create("Test1","It is a test for bad type for creating a movie","Test", "1hr","super academic",["Feng Liu"],{director: "Feng Liu", yearReleased: 2026});
    // }catch(e){
    //   console.log(e);
    // }
    // //12.Try to remove a movie that does not exist to make sure it throws errors.
    // try{
    //   await movies.remove(12345678976543);
    // }catch(e){
    //   console.log(e);
    // }
    // //13.Try to rename a movie that does not exist to make sure it throws errors.
    // try{
    //   await movies.rename(12345678, "Test failed");
    // }catch(e){
    //   console.log(e);
    // }
    // //14.Try to rename a movie passing in invalid data for the parameter to make sure it throws errors.
    // try{
    //   await movies.rename(123456, 123456);
    // }catch(e){
    //   console.log(e);
    // }
    // //15.Try getting a movie by ID that does not exist to make sure it throws errors.
    // try{
    //   console.log(await movies.get(12345678));
    // }catch(e){
    //   console.log(e);
    // }
    const db = await connection();
  await db.serverConfig.close();
};

main().catch((error) => {
  console.log(error);
});