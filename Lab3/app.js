const people = require("./people");
const work = require("./work");

async function main(){
    // getPersonById
    console.log("\ntest function: getPersonById");
    try{
        const getPersonByIdOne = await people.getPersonById(9);
        console.log (getPersonByIdOne);
    }catch(e){
        console.log (e);
    }
    try{
        const getPersonByIdTwo = await people.getPersonById(1001);
        console.log (getPersonByIdTwo);
    }catch(e){
        console.log (e);
    }

    //howManyPerState
    console.log("\ntest function: howManyPerState");
    try{
        const howManyPerStateOne = await people.howManyPerState("NJ");
        console.log (howManyPerStateOne);
    }catch(e){
        console.log (e);
    }
    try{
        const howManyPerStateTwo = await people.howManyPerState(9);
        console.log (howManyPerStateTwo);
    }catch(e){
        console.log (e);
    }

    //personByAge
    console.log("\ntest function: personByAge");
    try{
        const personByAgeOne = await people.personByAge(1);
        console.log (personByAgeOne);
    }catch(e){
        console.log (e);
    }
    try{
        const personByAgeTwo = await people.personByAge(-9);
        console.log (personByAgeTwo);
    }catch(e){
        console.log (e);
    } 

    //peopleMetrics
    console.log("\ntest function: peopleMetrics");
    try{
        const peopleMetricsOne = await people.peopleMetrics();
        console.log (peopleMetricsOne);
    }catch(e){
        console.log (e);
    }

    //listEmployees
    console.log("\ntest function: listEmployees");
    try{
        const listEmployeesOne = await work.listEmployees();
        console.log (listEmployeesOne);
    }catch(e){
        console.log (e);
    }  
     
    //fourOneOne
    console.log("\ntest function: fourOneOne");
    try{
        const fourOneOneOne = await work.fourOneOne('240-144-7553');
        console.log (fourOneOneOne);
    }catch(e){
        console.log (e);
    }
    try{
        const fourOneOneTwo = await work.fourOneOne('212-208-8374');
        console.log (fourOneOneTwo);
    }catch(e){
        console.log (e);
    } 
     //whereDoTheyWork
     console.log("\ntest function: whereDoTheyWork");
     try{
         const whereDoTheyWorkOne = await work.whereDoTheyWork('761-29-5614');
         console.log (whereDoTheyWorkOne);
     }catch(e){
         console.log (e);
     }
     try{
         const whereDoTheyWorkTwo = await work.whereDoTheyWork("000-00-0000");
         console.log (whereDoTheyWorkTwo);
     }catch(e){
         console.log (e);
     }      
}
main();