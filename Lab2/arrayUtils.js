module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}
function mean(array){
    var para = arguments;
    if(para.length != 1 || array.length < 1 || Object.prototype.toString.call(array) != "[object Array]" || isNaN(array[0])){
        throw 'error: Parameter is not an array with all number type elements!';
    }
    let sum = 0.0;
    array.forEach(function(val,index,array){
        if(isNaN(val)){
            throw 'error: Parameter is not an array with all number type elements!';
        }
        sum += val;
    });
    let res = sum/array.length;
    return res;
}

function medianSquared(array){
    var para = arguments;
    if(para.length != 1 || array.length < 1 || Object.prototype.toString.call(array) != "[object Array]" || isNaN(array[0])){
        throw 'error: Parameter is not an array with all number type elements!';
    }
    var temp = new Array(array.length);
    array.forEach(function(val,index,array){
        if(isNaN(val)){
            throw 'error: Parameter is not an array with all number type elements!';
        }
        temp[index] = Math.pow(val, 2);
    });
    bubbleSorting(temp);
    if(temp.length % 2 == 0){
        var res = (temp[temp.length / 2] + temp[temp.length / 2 - 1]) / 2;
    }else{
        var res = temp[parseInt(temp.length / 2)];
    }
    return res;
}

function maxElement(array){
    var para = arguments;
    if(para.length != 1 || array.length < 1 || Object.prototype.toString.call(array) != "[object Array]" || isNaN(array[0])){
        throw 'error: Parameter is not an array with all number type elements!';
    }
    var max = array[0];
    var index = 0;
    var count = 0;
    var obj  = {};
    array.forEach(element => {
        if(isNaN(element)){
            throw 'error: Parameter is not an array with all number type elements!';
        }
        if(element > max){
            max = element;
            index =  count;
        }
        ++count;
    });
    obj[max] = index;
    return obj;
}

function fill(end, value){
    var para = arguments;
    if(para.length < 1 || isNaN(para[0]) || para[0] < 0 || para.length > 2){
        throw 'error: function needs an integer(or an integer and a any type parameter)!';
    }
    if(para.length == 1){
        var res = new Array(para[0]);
        for(let i = 0; i < para[0]; ++i){
            res[i] = i;
        }
    }else{
        var res = new Array(para[0]);
        for(let i = 0; i < para[0]; ++i){
            res[i] = para[1];
        }
    }
    return res;
}

function countRepeating(array){
    var para = arguments;
    if(para.length != 1 || Object.prototype.toString.call(array) != '[object Array]' || arguments.length != 1){
        throw 'error: Parameter is not an array!';
    }
    var obj1 = {};
    var obj = {};
    array.forEach(function(val,index,array) {
        if(obj1.hasOwnProperty(val.toString())){
            obj[val] = ++obj1[val.toString()];
        }else{
            obj1[val.toString()] = 1;
        }
    });

    return obj;
}

function isEqual(arrayOne, arrayTwo){
    var para = arguments;
    if(para.length < 1 || para.length > 2 
    || Object.prototype.toString.call(arrayOne) != "[object Array]" 
    || Object.prototype.toString.call(arrayTwo) != "[object Array]"){
        throw 'error: Parameters are not two arrays !';
    }
    if(arrayOne.length != arrayTwo.length){
        return false;
    }
    var size = arrayOne.length;
    var length1 = new Array(size);
    var length2 = new Array(size);
    var tmpArrOne = [].concat.apply([],arrayOne);
    var tmpArrTwo = [].concat.apply([],arrayTwo);
    var indexOne = 0;
    var indexTwo = 0;
    // for(let i = 0; i < size; ++i){
    //     length1[i] = arrayOne[i].length;
    //     length2[i] = arrayTwo[i].length;
    //     if(length1[i] != length2[i]){
    //         return false;
    //     }else if(length1[i].length > 1 && length2[i].length >1){
    //         arrayOne[i].sort();
    //         arrayTwo[i].sort();
    //     }
    // }

    // return arrayOne.sort().toString() == arrayTwo.sort().toString();
    return tmpArrOne.sort().toString() == tmpArrTwo.sort().toString();
}
function bubbleSorting(array){
    for(let i = 1; i < array.length; ++i){
        for(let j = 0; j < array.length - 1; ++j){
            if(array[j] > array[j + 1]){
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

function quickSorting(array){
    for(let i = 0; i < array.length - 1; ++i){
        let target = i;
        for(let j = i + 1; j < array.length; ++j){
            if(array[j] < array[target]){
                target = j;
            }
            if(target != i){
                let temp = a[target];
                a[target] = a[i];
                a[i] = temp;
            }
        }
    }
}