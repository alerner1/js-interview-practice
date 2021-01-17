/*
  Closure Section

    What is a closure?

      * Gives you access to the parent function's scope from the inner function, even after the parent function has closed. (They get stored in the backpack.)

      * Essentially, it allows you to create a function that has private variables and/or methods.

      * Parent functions also have closures, but if they're declared in the global context it doesn't really matter. That's why this mostly comes up with nested functions.

    Why use a closure?

      * DATA PRIVACY. 

      * Bind 'this' in a method to a specific object, allowing it to be called elsewhere (like in an event handler).
*/

console.log('CLOSURES')

let a = 3;

function addTwo(x) {
  let ret = x + 2;
  return ret;
}

let b = addTwo(a);

console.log(b);

let val1 = 2;

function multiplyThis(n) {
  let ret = n * val1;
  return ret;
}

let multiplied = multiplyThis(6);

console.log('example of scope:', multiplied);

let val = 7;

function createAdder() {
  function addNumbers(a, b) {
    let ret = a + b;
    return ret;
  }
  return addNumbers;
}

let adder = createAdder();
let sum = adder(val, 8);

console.log('example of a function returning a function: ', sum);

function createCounter() {
  let counter = 0;

  // this function definition, like all function definitions, comes with a little backpack
  // it contains all the variables that were in scope when the function was created
  // including counter
  const myFunction = function() {
    counter = counter + 1;
    return counter;
  }
  return myFunction;
}

// stores myFunction in increment, then deletes the local execution context
// but the counter already came in the little backpack so it's still there in increment
const increment = createCounter();

// checks the backpack for the counter variable before looking in local or global contexts
const c1 = increment();
const c2 = increment();
const c3 = increment();

console.log('example increment', c1, c2, c3);

let c = 4;

// returns a function n => n + x
const addX = x => n => n + x;

// outer params go first because it's like you're executing one function call addX(c) and then taking the return value which is itself a function and executing it with the next set of params
console.log('outer params go first', addX(c)(5));

// is set equal to n => n + x where x = 3 bc x is in scope when called and is included in closure backpack
const addThree = addX(3);

let d = addThree(c);

console.log('example partial application', d);

// this is actually a super helpful demonstration of a use case (FINALLY)
function createUserWarningData(user) {
  const data = {
    name: user,
    numberOfWarnings: 0,
  };

  function addWarning() {
    data.numberOfWarnings = data.numberOfWarnings + 1;
  }

  function getUserData() {
    console.log(data);
    return data;
  }

  return {
    getUserData: getUserData,
    addWarning: addWarning,
  };
}

const user1 = createUserWarningData("Thomas");
const user2 = createUserWarningData("Alex");

//USER 1
user1.getUserData(); // Returning data user object
user1.addWarning(); // Add one warning to specific user
user1.getUserData(); // Returning data user object

//USER2
user2.getUserData(); // Returning data user object
user2.addWarning(); // Add one warning to specific user
user2.addWarning(); // Add one warning to specific user
user2.getUserData(); // Returning data user object