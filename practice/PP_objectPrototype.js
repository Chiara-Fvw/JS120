//1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

/* It should log 2 to the console. `qux` is the prototype of `baz`and therefore when we are accessing the property `foo` of the `baz`object js is not finding it so it goes up to its prototypal chain until it gets 1. Afterwards it access the property foo from the qux object and sum both 1 resulting in 2.*/

// *******************************************************************************************************************

//2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);

/* The output will be 3. on line 15 the property `foo` became an own property of the `baz` object, as it has been reassigned in this object. 
(**Property assignment doesn't use the prototype chain; instead, it creates a new property in the baz object named foo.**)
From then, there will be 2 different `foo` properties in the proptotypal chain of this object: qux.foo which is 1 and baz.foo which is 2. 1 + 2 is 3. */

// *******************************************************************************************************************


// 3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);

/* The result is 4 because as we are reassigning the `foo` property wher it is owned, on the prototype, the change is reflected on the inherter */

// *******************************************************************************************************************

//4. Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:
// recrusive solution

function assignProperty(object, property, value) {
  if (property in object) {
    if (object.hasOwnProperty(property)) {
      object[property] = value;
    } else {
      assignProperty(Object.getPrototypeOf(object), property, value);
    }
  };
}

//iterative solution
/* function assignProperty(obj, property, value) {
  while (obj !== null) {
    if (obj.hasOwnProperty(property)) {
      obj[property] = value;
      break;
    }

    obj = Object.getPrototypeOf(obj);
  }
} */

/* let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

console.log(Object.getPrototypeOf(Object.getPrototypeOf(fooA))); */

// *******************************************************************************************************************

//5. Consider the following two loops:

/* for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}


Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
}); */

//If foo is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

// It will differ because the loop for/in shows all enumerable properties of an object and its prototype, while Object.keys just display the object's owns properties. Therefore, in the following case the result will differ:

// let foo = {a: 1};
// let baz = Object.create(foo);
// baz.b = 2;
// baz.c = 3;

//6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

/* Explicitly setting its prototype to null.
By using Object.getPrototypeOf() */