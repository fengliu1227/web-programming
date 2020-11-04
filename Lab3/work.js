const axios = require("axios");
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data;
}
async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function listEmployees(){
    var para = arguments;
    if(para.length != 0){
        throw 'error: No need for any parameter'
    }
    let work = await getWork();
    let people = await getPeople();
    let arr = [];
    for(let i of work){
        let company = {
            company_name : i.company_name,
            employees : []
        };
        for(let id of i.employees){
            for(let j of people){
                if(j.id == id){
                    var person_employee = {
                        first_name : j.first_name,
                        last_name : j.last_name
                    };
                }
            }
            company.employees.push(person_employee);
        }
        arr.push(company);
    }
    return arr;
}

async function fourOneOne(phoneNumber){
    let regx = /\b[0-9]\d{2}\-[0-9]\d{2}\-[0-9]\d{3}\b/g;  
    if(phoneNumber == null){
        throw 'Error: the input is not a vaild phone number';
    }
    if(typeof(phoneNumber) != 'string'){
        throw 'Error: The phone number is not in proper format';
    }
    if(!regx.test(phoneNumber)){
        throw 'Error: The phone number is not in proper format';
    }
    let data = await getWork();
    let company = {};
    for(let i of data){
        if(phoneNumber == i.company_phone) {
            company.company_name = i.company_name;
            company.company_address = i.company_address;
            return company;
        }
    }
    throw 'Error: there is no such company';
}
async function whereDoTheyWork(ssn){
    let regx = /\b[0-9]\d{2}\-[0-9]\d{1}\-[0-9]\d{3}\b/g;  
    if(ssn == null){
        throw 'Error: the input is not a vaild SSN';
    }
    if(typeof(ssn) != 'string'){
        throw 'Error: the input is not a vaild SSN';
    }
    if(!regx.test(ssn)){
        throw 'Error: The SSN is not in proper format';
    }
    let work = await getWork();
    let people = await getPeople();
    let person = {};
    let personExist = false;
    for(let i of people){
        if(ssn == i.ssn){
            person = i;
            personExist = true;
            break;
        }
    }
    if(!personExist){
        throw 'Error: cannot find anyone with that SSN';
    }
    for(let j of work){
        for(let id of j.employees){
            if(id == person.id){
                return person.first_name + " " + person.last_name + " works at" + j.company_name;
            } 
        }
    }
}
module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}