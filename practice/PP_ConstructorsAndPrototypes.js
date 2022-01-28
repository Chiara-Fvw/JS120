//1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

/* NaN and NaN. This code would log NaN to the console because when area is called as method on RECTANGLE on line 15, the method has not the arguments to operate (width or heigh), as they has not been passed to the function area or permeter. */

//2. How would you fix the problem in the code from problem 1?

let RECTANGLE2 = {
  
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle2(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect2 = new Rectangle2(2, 3);

console.log(rect2.area);
console.log(rect2.perimeter);

//3. Write a constructor function called Circle that takes a radius as an argument. 
//You should be able to call an area method on any objects created by the constructor to get the circle's area. 
//Test your implementation with the following code:

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.pow(this.radius, 2) * Math.PI;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false

//4. What will the following code log to the console and why?

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());

/* This code will return true: On line 75 we create a new ninja object by calling the constructor function with the new keyword. The prototype object of ninja has been setted to the constructors function prototype and the execution context of this has been setted to be new created object ninja.
On line 77 we add the swingSword method to the function prototype of constructor Ninja. This method will be available for all instances of Ninja. On line 78 `this` also has been binded to execute within the new object ninja. That is why on line 81 we can call the method swingSword on the object ninja. As it is not found as own property, js goes up to the inheritance chain until finds it. And as it has been binded to the new object, it will return true. */

//5. What will the following code output and why? Try to answer without running the code.

function Ninja2() {
  this.swung = true;
}

let ninja2 = new Ninja2();

Ninja2.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

//console.log(ninja2.swingSword());

/*  Despite the similarities to the code in the previous question, this code doesn't work the same way. That's because we're reassigning Ninja.prototype to an entirely new object instead of mutating the original prototype object. The prototype for the ninja object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the swingSword method in the prototype chain of ninja.*/

//6. Implement the method described in the comments below:

function Ninja6() {
  this.swung = false;
}

Ninja6.prototype.swing = function() {
  this.swung = true;
  return this;
}
// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja6();
let ninjaB = new Ninja6();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
/* This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, ninjaA and ninjaB). */

//7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

let ninjaA7;

{
  const Ninja7 = function() {
    this.swung = false;
  };

  ninjaA7 = new Ninja7();
}

let ninjaB7 = new ninjaA7.constructor();
// create a `ninjaB` object here; don't change anything else

ninjaA7.constructor === ninjaB7.constructor // => true

/* Does your answer use Object.create instead?

let ninjaB = Object.create(ninjaA);
This code works as well, but there is a flaw: it puts the swung property in the prototype object instead of in the ninjaB object where it belongs. Thus, ninjaA and ninjaB are somewhat different objects:


ninjaA:
  swung: false
  constructor: Ninja
  prototype: {}

ninjaB:
  constructor: Ninja
  prototype: {
    swung: false
  } */


//8. Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:


function User(first, last) {
    if (!(this instanceof User)) {
      return new User(first, last);
    }
  
    this.name = first + ' ' + last;
  }
  
  let name = 'Jane Doe';
  let user1 = new User('John', 'Doe');
  let user2 = User('John', 'Doe');
  
  console.log(name);         // => Jane Doe
  console.log(user1.name);   // => John Doe
  console.log(user2.name);   // => John Doe

  console.log(name instanceof User);
  console.log(user1 instanceof User);
  console.log(user2 instanceof User);
  