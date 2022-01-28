//this within a function:

function regular() {
  console.log("this refers to: " + this);
};

regular();
//this refers to: [object global]

/* Within a regular function call (e.g., foo()), JavaScript sets the binding for this to the global object.  */

//method execution context:

let objectX = {
  methodX: function() {
    console.log(this);
  }
};

objectX.methodX(); // `objectX` is the implicit execution context for `methodX`
// { methodX: [Function: methodX] }

/*  ----   ¡¡¡¡OJO!!!! ------- */

let baz = objectX.methodX;
baz(); // Object [global] {...}

/* What deremines the execution context is the way how you call a function. In this case, although we reference the methodx of the objextx with variable baz, whe then call baz as a standalone function, therefore the context now is the global object and NOT the objectX */

/* ------- !!!!!!!!!!!!!!!! ----------------- */


//CONSTRUCTOR

function Pet(name, type, age) {
  this.name = name;
  this.type = type;
  this.age = age;
};

Pet.prototype.speak = function(){     //prototype object
    console.log(`I'm ${this.name}, a cute ${this.type} aged ${this.age}!`);
  }
//this.name and this.type are pointing to the new created object (nana and shifu) as execution context.

let shifu = new Pet('Shifu', 'fish', 2);
let nana = new Pet('Nana', 'dog', 9);

nana.speak();
shifu.speak();
//**  nana and shifu haven't the speak method as their own property, they inherit it from its prototype object. However, when a new object is created by using the new keyword with the constructor funciton, 'this' is binded to the new created object and therefore even if the method is in the prototype, this references the object. Here we are invoking speak as a method of the object. But it is not a method from nana, it comes from the prototype.

console.log(Object.getPrototypeOf(nana) === nana.__proto__); //true
console.log(Object.getPrototypeOf(nana) === Pet.prototype); //true
console.log(Pet === nana.constructor);              //true


shifu.speak = function() {
  console.log('glu, glu... glu glu glu, glu... !');
}

shifu.speak(); 

Object.getPrototypeOf(shifu).speak(); //I'm undefined, a cute undefined aged undefined! I gues this happens because I have called speak as a method of the protototype itselfs. The 'this' has not been binded to the new object in the prototype and therefore the execution context is the protototype which has no properties about the pet.




// Other example

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

let bmw = new Car('BMW', 'X1', '2010');
console.log(bmw);

//By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
console.log(Object.getPrototypeOf(bmw) === Car.prototype); //true


//Note that constructors don't inherit from the constructor's prototype object. Instead, the objects that the constructor creates inherit from it.
console.log(Object.getPrototypeOf(Car)); //[Function] --> the function prototype.
console.log(Car.prototype);              //Car {}    --> the object prototype of the function.
console.log(Car.prototype === bmw.__proto__); //true
console.log(Car.prototype === Object.getPrototypeOf(bmw)); //true
console.log(bmw.__proto__ === Object.getPrototypeOf(bmw)); //true

console.log(Car.constructor); //[Function: Function]
console.log(bmw.constructor === Car); //true
console.log(bmw.constructor); //[Function: Car]

console.log('    ');
console.log('test to: ');

