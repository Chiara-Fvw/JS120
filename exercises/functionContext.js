/* 1. What is This?

Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.
 */
console.log(`Exercise 1: `);
let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

/* If you said it logs NaN, you're correct. It is tempting to say that the code will log "Rick Sanchez" to the console but that's not correct.

Anywhere outside a function, the keyword this is bound to the global object. If the keyword is used inside a function, then its value depends on how the function was invoked.

Since window.firstName and window.lastName (if you're using a browser) are not defined, the operation being performed here is undefined + undefined which results in fullName having the value NaN. */

/* 2. The Franchise

The method franchise.allMovies is supposed to return the following array:

Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/
console.log(`\nExercise 2: `);

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function (number) {
      return self.name + ' ' + number;
    });
  },
}; 

console.log(franchise.allMovies());

 /* [
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
] */

/* The current implementation will not work because this will be bound to the wrong object (window) when the anonymous function passed to map is invoked. We want to access the object franchise from within that anonymous function.

There are multiple ways to solve this problem but here we'll solve it by employing the lexical scoping of JavaScript to our advantage; specifically, the rule that a variable defined in an outer scope is available to an inner scope:*/

/* 3. The Franchise - Solution 2

In the previous exercise, we had a situation where an anonymous method passed to map had an undesirable execution context. We solved the problem by taking advantage of lexical scoping and introducing a new variable self. Solve the same problem again by passing a hard-bound anonymous function to map.

 */

console.log(`\nExercise 3: `);

let franchise2 = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};

console.log(franchise2.allMovies());
/* The two solutions provided for the same problem are both valid, usable solutions. Another solution is to use an arrow function as a callback to map method call, as with arrow functions this is lexically bound :

Copy Code
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(number => {
      return `${this.name} ${number}`;
    });
  },
}; */

/* 4. myFilter()

In this exercise, we'll update an implementation of myFilter by adding the functionality of accepting an optional thisArg just like the original Array.prototype.filter.

Here's an implementation. We also show an example of how we want to call our modified function: the 3rd argument, filter, supplies the desired context (thisArg).

Copy Code

Modify the implementation such that the expected result is returned. Don't use the thisArg argument of Array.prototype.forEach. */
console.log(`\nExercise 4: `);

function myFilter(array, func, thisArg) {
  let result = [];

  array.forEach(function(value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

console.log(myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter)); // returns [5, 6, 9]