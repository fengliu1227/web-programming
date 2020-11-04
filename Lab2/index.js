// Mean Tests
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");
//1
console.log("\ntest case 1 : function mean");
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }

 //2
 console.log("\ntest case 2 : function medianSquared");
 try {
    // Should Pass
    const meanOne = arrayUtils.medianSquared([1, 2, 4]);
    console.log('medianSquared passed successfully');
 } catch (e) {
    console.error('medianSquared failed test case');
 }
 try {
    // Should Fail
    const meanTwo = arrayUtils.medianSquared(["guitar", 1, 3, "apple"]);
    console.error('medianSquared did not error');
 } catch (e) {
    console.log('medianSquared failed successfully');
 }

 //3
 console.log("\ntest case 3 : function maxElement");
 try {
   // Should Pass
   const meanOne = arrayUtils.maxElement([5, 6, 7]);
   console.log('maxElement passed successfully');
} catch (e) {
   console.error('maxElement failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.maxElement([1,2,"nope"]);
   console.error('maxElement did not error');
} catch (e) {
   console.log('maxElement failed successfully');
}

//4
console.log("\ntest case 4 : function fill");
 try {
   // Should Pass
   const meanOne = arrayUtils.fill(6);
   console.log('fill passed successfully');
} catch (e) {
   console.error('fill failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.fill("test");
   console.error('fill did not error');
} catch (e) {
   console.log('fill failed successfully');
}

//5
console.log("\ntest case 5 : function countRepeating");
try {
   // Should Pass
   const meanOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
   console.log('countRepeating passed successfully');
} catch (e) {
   console.error('countRepeating failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.countRepeating([],[]);
   console.error('countRepeating did not error');
} catch (e) {
   console.log('countRepeating failed successfully');
}

//6
console.log("\ntest case 6 : function isEqual");
try {
   // Should Pass
   const meanOne = arrayUtils.isEqual(['a','b','x','y'],['a','x','b','y']); 
   console.log('isEqual passed successfully');
} catch (e) {
   console.error('isEqual failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.isEqual([1, 2], [1, 2, 3],[]);
   console.error('isEqual did not error');
} catch (e) {
   console.log('isEqual failed successfully');
}

//7
console.log("\ntest case 7 : function camelCase");
try {
   // Should Pass
   const camelCase1 = stringUtils.camelCase('my function rocks'); 
   console.log('camelCase passed successfully');
} catch (e) {
   console.error('camelCase failed test case');
}
try {
   // Should Fail
   const camelCase2 = stringUtils.camelCase(["Hello", "World"]);
   console.error('camelCase did not error');
} catch (e) {
   console.log('camelCase failed successfully');
}

//8
console.log("\ntest case 8 : function replaceChar");
try {
   // Should Pass
   const meanOne = stringUtils.replaceChar("Daddy"); 
   console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
   // Should Fail
   const meanTwo = stringUtils.replaceChar(123);
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully');
}

//9
console.log("\ntest case 9 : function mashUp");
try {
   // Should Pass
   const meanOne = stringUtils.mashUp("Patrick", "Hill"); 
   console.log('mashUp passed successfully');
} catch (e) {
   console.error('mashUp failed test case');
}
try {
   // Should Fail
   const meanTwo = stringUtils.mashUp ("h","e");
   console.error('mashUp did not error');
} catch (e) {
   console.log('mashUp failed successfully');
}

//10
console.log("\ntest case 10 : function makeArrays");
try {
   // Should Pass
   const first = { x: 2, y: 3};
   const second = { a: 70, x: 4, z: 5 };
   const third = { x: 0, y: 9, q: 10 };
   const firstSecondThird = objUtils.makeArrays([first, second, third]);
   console.log('makeArrays passed successfully');
} catch (e) {
   console.error('makeArrays failed test case');
}
try {
   // Should Fail
   const firstSecondThird = objUtils.makeArrays([1,2,3]);
   console.error('makeArrays did not error');
} catch (e) {
   console.log('makeArrays failed successfully');
}

//11
console.log("\ntest case 11 : function isDeepEqual");
try {
   // Should Pass
   const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
   const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
   const meanOne = objUtils.isDeepEqual(forth, fifth); 
   console.log('isDeepEqual passed successfully');
} catch (e) {
   console.error('isDeepEqual failed test case');
}
try {
   // Should Fail
   const meanTwo = arrayUtils.isDeepEqual(forth, fifth,{});
   console.error('isDeepEqual did not error');
} catch (e) {
   console.log('isDeepEqual failed successfully');
}

//12
console.log("\ntest case 12 : function computeObject");
try {
   // Should Pass
   const first = { x: 2, y: 3};
   const second = { a: 70, x: 4, z: 5 };
   const third = { x: 0, y: 9, q: 10 };
   const firstSecondThird = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
   console.log('computeObject passed successfully');
} catch (e) {
   console.error('computeObject failed test case');
}
try {
   // Should Fail
   const firstSecondThird = objUtils.computeObject({ a: 3, b: 7, c: 5 }, {});
   console.error('computeObject did not error');
} catch (e) {
   console.log('computeObject failed successfully');
}