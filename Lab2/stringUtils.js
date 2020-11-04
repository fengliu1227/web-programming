module.exports = {
    camelCase,
    replaceChar,
    mashUp
}
function camelCase(string){
    var para = arguments;
    if(para.length != 1 || string.length < 1 || typeof(string) != "string"){
        throw 'error: parameter is not a string!';
    }
    var result = new String();
    var bool = false;
    for(let i = 0; i < string.length; ++i){
        if(string.charAt(i) == ' '){
            bool = true;
            continue;
        }
        if(i == 0){
            result += string.charAt(i).toLowerCase();
            continue;
        }
        if(bool){
            result += string.charAt(i).toUpperCase();
            bool = false;
            continue;
        }
        result += string.charAt(i).toLowerCase();
    }
    return result;
}
function replaceChar(string){
    var para = arguments;
    if(para.length != 1 || string.length < 1 || Object.prototype.toString.call(string) != "[object String]"){
        throw 'error: parameter is not a string!';
    }
    if(string.length == 1){
        return string;
    }
    var target = string.charAt(0).toLowerCase();
    var result = string;
    var bool= true;
    for(let i = 1; i < string.length; ++i){
        if(string.charAt(i).toLowerCase() == target.toLowerCase()){
            if(bool){
                result = result.substr(0,i) + "*" + result.substr(i + 1, string.length);
                bool = false;
            }else{
                result = result.substr(0,i) + "$" + result.substr(i + 1, string.length);
                bool = true;
            }
        }
    }
    return result;
}
function mashUp(string1, string2){
    var para = arguments;
    if(para.length != 2 || string1.length < 2 || string2.length < 2 ||
       Object.prototype.toString.call(string1) != "[object String]" ||
       Object.prototype.toString.call(string2) != "[object String]"){
            throw 'error: parameters are not two strings!';
    }
    var result = string2.substr(0,2) + string1.substr(2,string1.length) + " " + string1.substr(0,2) + string2.substr(2,string2.length);
    return result;
}

try {
    // Should Pass
    var res = camelCase('my function rocks');
    console.log(res);
 } catch (e) {
    console.error('mean failed test case');
 }