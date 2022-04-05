// What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

/* When we reference the `foo`property of the `baz` object js can not find the property inside it therefore start looking up the prototype chain. It finds the `foo` property inside the qux object where it has a value of 1. then we reference the property diretly from the qux object and got the same value. Therreforue the output of line 5 will be 2. */

//2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.


// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);

/* `qux.foo` will return the value 1 as `foo` is a property of `qux`. However this time we assign a foo property directly within the `baz` object on line 14. therefore when js searches the foo property within the baz object it finds it with a value of 2 and stops searching returning 2. In this case 3 will be logged to the console. */

//3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);

/* Here 4 will be logged to the console: as baz.foo is referencing the property foo from qux, when we reassign that property on line 24, the change is reflected even down in the prototype chain. Line 26 when we reference baz.foo, baz doesnot have that property js searches down to the prototype chain and find the property in qux. as this property has been resassing now both refernece value 2 and 2 + 2 s 4. */

//4. As we saw in problem 2, the following code creates a new property in the baz object instead of assigning the property in the prototype object.


// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

//Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:

/* 
1. check if we are at the end of prot.chain.
2. if not:
  . search for own property:
    - yes: reassing
    - no: keep searching
   */

// function assignProperty(obj, prop, newVal) {
//   while (true) {
//     if (Object.getPrototypeOf(obj) === null) break;

//     if (obj.hasOwnProperty(prop)) {
//       obj[prop] = newVal;
//       break;
//     } else {
//       obj = Object.getPrototypeOf(obj);
//     }
//   }
// }


// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false


// //5. Consider the following two loops:

// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// //**

// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });

//If foo is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

/* Those loops won't log the same results. the loop for/in will iterate all the enumerable properties of an object, included those from other objects in the prototypal chain. The `Object.key()` static method will only select the own properties of the object pass to it as an argument. The following example will illustrate the above: */

/* let person = {
  name: 'Mary',
}

let foo = Object.create(person);
foo.age = 2;


for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

//**

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
}); */

//6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?
/* let obj = {};
Object.setPrototypeOf(obj, null);

let obj2 = Object.create(null); */

//***Practice Problems: Implicit and Explicit Function Execution Contexts**

//1. What will the following code output? Try to determine the results without running the code.

// function func() {
//   return this;
// }

// let context = func();

// console.log(context);

/* The global object will be logged: on line 124 we are invoking the function as a standalone fucniton, that means that the implicit context is the global object. */

//2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.

/* let obj = {
  func: function() {
    return this;
  },
};

let context = obj.func();

console.log(context); */

/* On line 138 we are invoking the method using obj. as the calling object. Therefore the implicit execution context for this call is the calling object, on line 140 what will be logged is obj. */

//3. What will the following code output?

// message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let foo = {
//   message: 'Hello from the function scope!',
// };

// foo.deliverMessage = deliverMessage;

// foo.deliverMessage();

/* On line 152 we invoke deliverMessage as a standalone function therefore its execution context is implicitly set to the global object. As the global object has a varialbe named message (assigned on line 146) the output will be 'Hello from the global object'. On line 160 we are invoking the deliverMessage method using foo as calling object. deliverMessage has been assigned to property deliverMessage in foo object on line 158. Therefore hello from the function scope will be logged to the console.  */

//4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

//call and apply.

//5.Take a look at the following code snippet. Use call to invoke the add method but with foo as execution context. What will this return?

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = {
//    a: 'abc',
//    b: 'def',
//    add: function() {
//      return this.a + this.b;
//    },
// };

// console.log(bar.add.call(foo));

/* Practice Problems: Hard Binding Functions with Contexts */

//1. What method can we use to bind a function permanently to a particular execution context?

//bind method

//2. What will the following code log to the console?

// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);
/* On line 201 we are binding the function foo to be executed with the execution context of obj. However bind does not invoke the function, it just return a new function permanently binded to the context passed to it as an argument. */

//3. What will the following code output?

// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(foo());
// console.log(bar())

/* NaN and 5. `foo()`invokes the function as a standalone function therefore the execution context is implicitly set to the global object. As the global object has no prperties a and b, the value is undefined, therfore the operaton undefied + undefined returns NaN. Differently, on line 215 we are saving a new function `foo`binded to the obj context. when we invoke bar() on line 218 we are invoking a function binded to the obj context.  */

//4. What will the code below log to the console?

// let positivity = {
//   message: 'JavaScript makes sense!',
// };

// let negativity = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positivity);

// negativity.logMessage = bar;
// negativity.logMessage();

/* `JavaScript makes sense!` Since bar is bound to positivity as the return value of the bind invocation on line 236, positivity's property message is logged by the function call on the last line, despite the fact that the function is invoked as a method on the negativity object.*/

//5. What will the code below output?

// let obj = {
//   a: 'Amazebulous!',
// };
// let otherObj = {
//   a: "That's not a real word!",
// };

// function foo() {
//   console.log(this.a);
// }

// let bar = foo.bind(obj);

// bar.call(otherObj);

/* Amazebulous! bind returns a new function foo forever bound to the obj context. Therefore eventhough we try to explicitly set the execution context to `otherObj` on line 258, bar will always execute with the obj. context.  */

/* Practice Problems: Dealing with Context Loss */
//1. The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription);

/* When passing a method as an argument it loses its context. Therefore `this` evaluates to undefined resulting undefined undefined is a undefined. */

//2. Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func, ctx) {
//   let returnVal = func.call(ctx);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

//3. Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//       return this.firstName + ' ' + this.lastName + ' is a '
//                                   + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// getTurkDescription = turk.getDescription.bind(turk);
// logReturnVal(getTurkDescription);

//4. consider the following code.
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

//Will this code produce the following output? Why or why not?

// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

/* On line 329 this.seriesTitle evaluates to undefined as the callback function loses its context. THe result is undefined: arena */

//5. Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     let self = this;
//     this.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

//6. The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();

//7. Use an arrow function to achieve the same result:
// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(title => {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

//8. Consider the following code: What will the value of foo.a be after this code runs?

// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

/* On line 394 this.a evaluates to undefined as the function increment gets invoked as a function its context is the global. Therefore the value of foo.a will still be 0. */

//9. Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.

// let foo = {
//   a: 0,
//   incrementA: function() {
//     function increment() {
//       this.a += 1;
//     }

//     increment.call(this);
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

/* Practice Problems - Constructors and Prototypes */

//1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

// let RECTANGLE = {
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

/* NaN and NaN. both rect1 properties reference a method of RECTANGLE. when we create rect1 we pass the widht and length of it to the constructor but those values are not being passed to RECTANGLE object to execute the operations. */

//2.How would you fix the problem in the code from problem 1?

// let RECTANGLE = {
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area.call(this);
//   this.perimeter = RECTANGLE.perimeter.call(this);
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

//3. Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

// function Circle(rad) {
//   this.rad = rad;
// };

// Circle.prototype.area = function() {
//   return Math.PI * Math.pow(this.rad, 2);
// };

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27
// console.log(a.hasOwnProperty('area')); // => false

// //4. What will the following code log to the console and why?
// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());

/* true will be logged to the console. Even though we define the swingSword method on the prototype after we create the ninja, all objects created by the Ninja constructor share the same prototype object. Thus, when we define swingSword, it immediately becomes available to the ninja object.
 */

//5. What will the following code output and why? Try to answer without running the code.

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

/* In this snippet we are reassigning `NInja.prototype` to an etirely new object instead of mutating the original prototype object. The protototype for ninja object doesn't change it is still the original prototype defined during the contstructor's invocation. THus js cant find the swingSword method. */

//6. Implement the method described in the comments below.

// function Ninja() {
//   this.swung = false;
// }

// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// }
// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

//7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
// let ninjaA;

// {
//   const Ninja = function() {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// // create a `ninjaB` object here; don't change anything else
// let ninjaB = new ninjaA.constructor()
// console.log(ninjaA.constructor === ninjaB.constructor) // => true

//8. Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:

// function User(first, last) {
//   if(!(this instanceof User)) {
//     return new User(first, last);
//   }
//   this.name = `${first} ${last}`;
// }

// let name = 'Jane Doe';
// let user1 = new User('John', 'Doe');
// let user2 = User('John', 'Doe');

// console.log(name);         // => Jane Doe
// console.log(user1.name);   // => John Doe
// console.log(user2.name);   // => John Doe

/*Practice Problems - Classes*/

//1.What do we mean when we say that classes are first-class values?

/* Classes are function and as functions can be used as any other values: stored to a variable or a property, passed as arguments or returned by functions */

//2.Consider the following class declaration:

class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}
//What does the static modifier do? How would we call the method manufacturer?

/* static defines a method within the constructor that can not be invoked from any instance but directly from the constructor: Television.manufacturer() */

/*Practice Problems: Object Creation with Prototypes*/

//1. Use a factory function to create pet objects. The factory should let us create and use pets like this:

// function createPet(animal, name) {
//   return {
//     animal,
//     name,
//     sleep() {
//       console.log(`I am sleeping`);
//     },

//     wake() {
//       console.log(`I am awake`);
//     }
//   }
// }

// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

//2. Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

// let PetPrototype = {
//   init(animal, name) {
//     this.animal = animal;
//     this.name = name;
//     return this;
//   },
  
//   sleep() {
//     console.log(`I am sleeping`);
//   },
        
//   wake() {
//     console.log(`I am awake`);
//   }
// };

// let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

//3. Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?

/* On problem 1 we use factory function to create objects, those objects keep a copy of all mehtods in them, while on exercise 2, the common behaviour, the methods sleep and wake, are available up in the prototype chain, meaning that there is only one copy of those methods in the prototype and each animal object delegates the mehtod to that prototype.
objects created with factory functions can have private state, while thos created by oloo pattern cant.*/

/* Practice Problems: Subtyping with Classes */

//1. Suppose we have the following classes:

class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

//What would happen if we added a play method to the Bingo class, keeping in mind that there is already a method of this name in the Game class from which the Bingo class inherits? Explain your answer. What do we call it when we define a method like this?

//The play method defined in bingo will override the play method in the prototype chain. Therefore, when invoking the method using an instance of bingo the last one will be executed and not the one defined on Game constructor.

//2. Let's practice creating a class hierarchy.

// Create a class named Greeting that has a single method named greet. The method should take a string argument, and it should print that argument to the console.

// Now, create two more classes that inherit from Greeting: one named Hello, and the other Goodbye. The Hello class should have a hi method that takes no arguments and logs "Hello". The Goodbye class should have a bye method that logs "Goodbye". Use the greet method from the Greeting class when implementing Hello and Goodbye; don't call console.log from either Hello or Goodbye.

class Greeting {
  greet(str) {
    console.log(str);
  }
};

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}
class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hello = new Hello();
let bue = new Goodbye();

hello.hi();
bue.bye();