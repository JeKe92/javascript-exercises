/* 
    Sources:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    https://javascript.plainenglish.io/seven-ways-to-check-existence-of-an-element-in-javascript-array-with-performance-benchmarks-a7f9312c8904
    
    
    An array is a object in Javascript similar to a list
    The ways to create it is like below:
*/
let cities= new Array(10), //Empty array for 10 elements
    latinCities = ['Bogotá', 'Quito', 'Buenos Aires', 'Rio de Janeiro', 'Lima'];
console.log('Here we can see an array of latin cities:', latinCities);

/* 
    There are many operations that we can do with an array
    in order to get its information or mutate its information.

    1. Get an specific element from an array:
        We would like to get only the value Buenos Aires
        from out latin cities, so the way to access to any
        specific value in the array is by using [] and set
        inside the position within the array. It starts in position 0.
*/
console.log('This is the city in the third position:', latinCities[2]);
console.log('This is the city in the last position:', latinCities[latinCities.length - 1]); //.length alloes to get the size of any array

/* 
    2. Loop over an array
        We can use any loop form in javascript to loop over any array.
        There are some methods more performant than others. In this case,
        we are going to compare for, while, for...of, forEach and for...in
        in a array of 1 million positions 
*/
(() => {
    let bigArray = new Array(1_000_000).fill(0).map((val, i)=> i + 1);
    console.log('Length of our big array:', bigArray.length);

    //For
    let acum = 0;
    (() => {
        console.time('Acumulator with a for');
        for (let i = 0; i < bigArray.length; i++) {
            acum += bigArray[i];
        }
        console.timeEnd('Acumulator with a for');
    })();

    //While
    acum = 0;
    (() => {
        console.time('Acumulator with a while');
        let i = 0;
        while (i < bigArray.length) {
            acum += bigArray[i];
            i++;
        }
        console.timeEnd('Acumulator with a while');
    })();

    //ForOf
    acum = 0;
    (() => {
        console.time('Acumulator with a for of');
        for (const el of bigArray) {
            acum += el; 
        }
        console.timeEnd('Acumulator with a for of');
    })();

    //ForIn
    acum = 0;
    (() => {
        console.time('Acumulator with a for in');
        for (const el in bigArray) {
            acum += el; 
        }
        console.timeEnd('Acumulator with a for in');
    })();

    //forEach
    acum = 0;
    (() => {
        console.time('Acumulator with a forEach');
        bigArray.forEach(el=>{
            acum += el;
        });
        console.timeEnd('Acumulator with a forEach');
    })();
})();
/*
    As we see below most of time the more basic or primitive form
    use to be more performant than others:
        Acumulator with a while: 8.292ms
        Acumulator with a for: 11.418ms
        Acumulator with a forEach: 12.916ms
        Acumulator with a for of: 14.925ms
        Acumulator with a for in: 155.88ms
*/

/* 
    3.  CRUD elements in array 
*/

// Add element at the end of an array
latinCities.push('Santiago');
console.log('Push item:', latinCities);

// Remove element at the end of an array
latinCities.pop();
console.log('Pop item', latinCities);

// Remove element at the beginning of an array
latinCities.shift();
console.log('Shift item:', latinCities);

// Add element at the beginning of an array
latinCities.unshift('Medellín');
console.log('Unshift item', latinCities);

// Find the index of an item array
(() => {
    const buenosAiresIndex = latinCities.indexOf('Buenos Aires');
    console.log('Buenos Aires is in index:', buenosAiresIndex);
})();

// Verify if a value is included within the array
(() => {
    const buenosAiresExists = latinCities.includes('Buenos Aires');
    console.log('Does Buenos Aires exist?', buenosAiresExists);
})();

// Remove an item by index position
latinCities.splice(2, 1); // (position to be removed, how many after the position will be removed)
console.log('Array with item at position 2 removed:', latinCities);

// Copy an array
(() => {
    const newLatinCities = latinCities.slice();
    console.log('New Latin Cities:', newLatinCities);
    // Copy and add a new city at the beginning and at the end by usign spread operator
    const newLatinCities2 = ['La Paz', ...latinCities, 'Asunción'];
    console.log('New Latin Cities with ...:', newLatinCities2);
})();

// Getting several values using destructuring to store each one in a constant
(()=>{
    const [firstCity, secondCity, ,fourthCity] = latinCities;
    console.log('First, second and fourth city:',`${firstCity}, ${secondCity} and ${fourthCity}`);
})();

/* 
    4.  Most used ECMA Script funtions for arrays 
*/

// fill: Changes all values of an array for an static value, 0 as default. fill(value, start, end).
console.log('Fill with 0 from 2nd pos to 4th:',[1, 2, 3, 4].fill(0, 2, 4));

// filter: Creates a new array with every element that fit the condition
(() => {
const citiesWithMoreThanOneWord = latinCities.filter(city => city.includes(' '));
console.log('Cities with more than one word in its name:', citiesWithMoreThanOneWord);
})();

// find & findIndex: Find Returns the value and findIndex the index of the first element that satisfies the condition 
(() => {
const longCityName = latinCities.find(city => city.length > 10);
const longCityNameIndex = latinCities.findIndex(city => city.length > 10);
console.log('First city with more than 6 caracters:', `${longCityName} is at position ${longCityNameIndex}`);
})();

// from: Creates a copy from an array, can recieve a callback to modify the result
console.log('New array from [1, 2, 3]:', Array.from([1, 2, 3], x => x + x));

// join: Returns a string by concatenating all elements in an array separated for string in parameter
console.log('Joined elements by comma-space:', latinCities.join(', '));

// lastIndexOf: Returns the last index of the given value
latinCities.push('Medellín');
console.log('Last index of Medellín:', latinCities.lastIndexOf('Medellín'));

// map: Creates a new array populated with the results of calling a provided function on every element in the calling array.
(() => {
    const numeratedCities = latinCities.map((city, index) => `${index + 1}. ${city}`);
    console.log(numeratedCities);
})();

// reduce: The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in a single output value
(() => {
    const array1 = [1, 2, 3, 4];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    // 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer));
    // expected output: 10

    // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15
})();

/* 
    slice: The slice() method returns a shallow copy of a portion of an array
    into a new array object selected from start to end where
    start and end represent the index of items in that array.
    The original array will not be modified.
*/
console.log('Cut from 2 index:', latinCities.slice(2));
console.log('Cut from 2 index to 4:', latinCities.slice(2, 4));

// some: If at least one element in array satisfies given testing function it returns true.
console.log('True id any city contain í in its name:', latinCities.some( city => city.includes('í')));