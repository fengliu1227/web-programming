const axios = require("axios");
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data 
}
async function getPersonById(id){
    if(id == null || typeof(id) != 'number') throw "Error: the input is not a vaild number";
    let data  = await getPeople();
    for(let i of data){
        if(i.id == id) return i;
    }
    throw "Error: The input id is not within bounds";
}

async function howManyPerState(stateAbbrv){
    if(stateAbbrv == null || typeof(stateAbbrv) != 'string') throw "Error: The input doesn't exist";
    let data  = await getPeople();
    let count = 0;
    let a = true;
    for(let i of data){
        a = false;
        if(i.address.state == stateAbbrv){
            ++count;
        }
    }
    if(a){
        throw "Error: there are no people in " + stateAbbrv;
    }
    else{
        return count;
    }
}

async function personByAge(index){
    if(index == null || typeof(index) != 'number') throw 'Error: The input index is not a vaild number';
    let data  = await getPeople();
    data.sort((a,b)=>{
        let date1 = a.date_of_birth;
        let date2 = b.date_of_birth;
        date1 = date1.split('/');
        date2 = date2.split('/');
        
        if(date1[2] != date2[2]){
            return date1[2] - date2[2];
        }
        if(date1[0] != date2[0]){
            return date1[0] - date2[0];
        }
        return date1[1] - date2[1];
    });
    if(data[index] == null) throw 'Error: the index is not within bounds';
    let birth = data[index].date_of_birth.split('/');
    let date = new Date();
    let age = date.getFullYear()- birth[2];
    if(date.getMonth() + 1 < birth[0]){
        --age;
    }
    if(date.getMonth() + 1 == birth[0] && date.getDate() < birth[1]){
        --age;
    }
    let res = {};
    res['first_name'] = data[index].first_name;
    res['last_name'] = data[index].last_name;
    res['date_of_birth'] = data[index].date_of_birth;
    res['age'] = age;
    return res;
}


async function peopleMetrics(){
    let totalLetters = 0;
    let totalVowels = 0;
    let totalConsonants = 0;
    let longestName = "";
    let shortestName = "";
    let mostRepeatingCity = "";
    let averageAge = 0;
    let maxCount = 0;
    let index = 0;
    let data  = await getPeople();
    let map = new Map();
    for(let i of data){
        ++index;
        totalLetters += i.first_name.length + i.last_name.length;
        let curName = i.first_name + " " + i.last_name;
        var m = curName.match(/[aeiou]/gi);
        if(m !== null){
            totalVowels += m.length;
        }
        if(longestName.length < curName.length){
            longestName = curName.length;
        }
        if(shortestName.length > curName.length){
            shortestName = curName;
        }
        if(map.has(i.address.city)){
            map.set(i.address.city, map.get(i.address.city) + 1);
        }else{
            map.set(i.address.city, 1);
        }
        if(maxCount < map.get(i.address.city)){
            maxCount = map.get(i.address.city);
            mostRepeatingCity = i.address.city;
        }
        let birth = i.date_of_birth.split('/');
        let date = new Date();
        let age = date.getFullYear()- birth[2];
        if(date.getMonth() + 1 < birth[0]){
            --age;
        }
        if(date.getMonth() + 1 == birth[0] && date.getDate() < birth[1]){
            --age;
        }
        averageAge += age;
    }
    totalConsonants = totalLetters - totalVowels;
    averageAge = averageAge * 1.0 / data.length * 1.0;
    let res = {};
    res['totalLetters'] = totalLetters;
    res['totalVowels'] = totalVowels;
    res['totalConsonants'] = totalConsonants;
    res['longestName'] = longestName;
    res['shortestName'] = shortestName;
    res['mostRepeatingCity'] = mostRepeatingCity;
    res['averageAge'] = averageAge;
    return res;
}

module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}
