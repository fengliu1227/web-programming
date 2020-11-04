const axios = require("axios");

let exportedMethods = {
    async getTvBySearch(keyword){
        if(!keyword){
            throw 'No input!!!';
        }
        if(typeof(keyword)!= 'string'){
            throw 'keyword should be a string!!!';
        }
        let {data} = await axios.get("http://api.tvmaze.com/search/shows?q="+keyword);
        let newData = [];
        let index = 0;
        for(let x of data){
            if(index == 20){
                break;
            }
            newData[index++] = x;
        }
        return newData;
    },
    async getTvById(id){
        if(!id){
            throw 'No input!!!';
        }
        if(typeof(id) != 'string'){
            throw 'Id should be a string!!!';
        }

        let tv = await axios.get("http://api.tvmaze.com/shows/"+id);
        return tv.data;
    }
};

module.exports = exportedMethods;