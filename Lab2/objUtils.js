module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}
function makeArrays([objects]){
    var para = arguments;
    if(para.length != 1 || Object.prototype.toString.call(para[0]) != "[object Array]" || para[0].length < 2){
        console.log(1);
        throw 'error: parameter is not an array of objects!';
    }
    var result = new Array();
    var index = 1;
    var count = 0;
    for(let i = 0; i < para[0].length; ++i){
        var bool = Object.prototype.toString.call(para[0][i] === "[object Object]");
        if(!bool){
            throw 'error: parameter is not an array of objects!';
        }
        for(let j in para[0][i]){
            if(index != i){
                count++;
            }
            index = i;
            var temp = [j,para[0][i][j]];
            result.push(temp);
            continue;
        }
    }
    if(count != para[0].length){
        throw 'error: parameter is not an array of objects!';
    }
    return result;
}
function isDeepEqual(obj1, obj2){
    var para = arguments;
    var bool = true;
    if(bool){
        if(para.length != 2
            || typeof(obj1) != 'object'
            || typeof(obj2) != 'object'){
                throw 'error: Parameters are not two objects !';
            }
    }
    bool = false;
    var name1 = Object.getOwnPropertyNames(obj1);
    var name2 = Object.getOwnPropertyNames(obj2);
    if(name1.length != name2.length){
        return false;
    }
    for(let i = 0; i < name1.length; ++i){
        var name = name1[i];
        if(Object.prototype.toString.call(obj1[name]) == "[object Object]"){
            if(isDeepEqual(obj1[name], obj2[name])){
                continue;
            }else{
                return false;
            }
        }
        else if(obj1[name] != obj2[name]){
            return false;
        }
    }
    return true;
}

function computeObject(object, func){
    var para = arguments;
    if(para.length != 2
        || typeof(object) != "object" 
        || typeof(func) != "function"){   
           throw 'error: Parameters is a two object !';
    }
    for(let x in object){
        object[x] = func(object[x]);
    }
    return object;
}
