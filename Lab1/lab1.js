const questionOne = function questionOne(arr) {
    // Implement question 1 here
    var obj ={};
    if(arr == null){
        return obj;
    }
    for(var i = 0; i < arr.length; ++i){
        var key = arr[i];
        if(key < 2){ //exclude the numbers less than 2
            obj[key] = false;
        }
        else if(key % 1 != 0){ //exclude all decimals, and leave integers
            obj[key] = false;
        }
        else if(key <= 3){ // i = 2, 3
            obj[key] = true;
        }
        else if(key % 2 == 0){ //exclude the evens except 2
            obj[key] = false;
        }
        else{
            obj[key] = true;
            var sqrt = Math.sqrt(key);
            sqrt = parseInt(sqrt);
            for(j = 3; j <= sqrt; ++j){
                if(key % j == 0){
                    obj[key] = false;
                }
                else{
                    obj[key] = true;
                }
            }
        }
    }
    return obj;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if(arr == null){
        return 0;
    }
    var step1 = 0; //step1
    for(i = 0; i < arr.length; ++i){
        step1 += Math.pow(arr[i],2);
    }

    var step2 = Math.pow(step1,6); // step2

    var step3 = Math.sqrt(step2); // step3
    return step3;

    //quicker
    // for(i = 0; i < arr.length; ++i){
    //     step1 += Math.pow(arr[i],2);
    // }
    //  var step2 = Math.pow(step1,3);
    
}

const questionThree = function questionThree(text) {
    var obj = {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
    if(text == null){
        return obj;
    }
    for(i = 0; i < text.length; ++i){
        if(text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122 || text.charCodeAt(i) >=65 && text.charCodeAt(i) <= 90){
            if(text.charAt(i) == 'a' || text.charAt(i) == 'e' ||
               text.charAt(i) == 'i' || text.charAt(i) == 'o' ||
               text.charAt(i) == 'u' || text.charAt(i) == 'A' ||
               text.charAt(i) == 'E' || text.charAt(i) == 'I' ||
               text.charAt(i) == 'O' || text.charAt(i) == 'U'){
                obj["vowels"]++; 
            }
            else{
                obj["consonants"]++;
            }
        }
        else if(text.charCodeAt(i) == 32){
                obj["spaces"]++;
        }
        else if(text.charCodeAt(i) >= 48 && text.charCodeAt(i) <= 57){
            obj["numbers"]++;
        }
        else if(text.charCodeAt(i) >= 33 && text.charCodeAt(i) <= 34 || 
                text.charCodeAt(i) == 39 || text.charCodeAt(i) == 63 || 
                text.charCodeAt(i) >= 44 && text.charCodeAt(i) <= 46 ||
                text.charCodeAt(i) >= 58 && text.charCodeAt(i) <= 59){
                    obj["punctuation"]++;
        }
        else{
            obj["specialCharacters"]++;
        }
    }
    return obj;
}

const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    var monInterst = num2 * 0.01 / 12;
    var month = num3 * 12;
    var den = (Math.pow(1 + monInterst, month) - 1)/ (monInterst*  Math.pow((1 + monInterst) ,(month)));
    var payment = num1 /den;
    payment = payment.toFixed(2);
    return payment;
}
module.exports = {
    firstName: "Feng",//"YOUR FIRST NAME", 
    lastName: "Liu",//"YOUR LAST NAME", 
    studentId: "10446406",//"YOUR STUDENT ID",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};