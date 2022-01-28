let carPrototype = {
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  },
};

let car1 = (Object.create(carPrototype))
//car1.init('toyota', 'corolla', 1984);

console.log(car1.init);

//**************************** ---- Practice Problem  -----  *******+


//Consider the following code:

function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};



//What happens in each of the following cases? Try to answer without running the code.

//Case 1


let hello = new Hello();
hello.hi(); //logs 'hello' to the console

//Case 2


let hello2 = new Hello();
//hello2.bye(); //can't find the function


//Case 3


let hello3 = new Hello();
hello3.greet(); //undefined. there is no message, no argument passed to the function

//Case 4

let hello4 = new Hello();
hello4.greet('Goodbye'); //logs Goodbye to the console.

//Case 5

Hello.hi(); //cant find the function