let chiara = {
  daughter: 'Arianna',
  son: 'Ander',
  pet: 'Nana',
  husband: 'Eneko',
}

// console.log('son' in chiara);                                        //true
// console.log(chiara.hasOwnProperty('daughter'));                      //true
// console.log(Object.keys(chiara).includes('pet'));                    //true
// console.log(Object.getOwnPropertyNames(chiara).includes('pet'));     //true
// console.log(Object.getPrototypeOf(chiara) === Object.prototype);     //true

let house = Object.create(chiara);
house['I am a'] = 'house';
// console.log(Object.getPrototypeOf(house)); //chiara

let plants = {};                      //I declare and initialize plants to an empty object 
Object.setPrototypeOf(plants, house); //I use setPrototypeOf to set the prototype obj

// console.log(plants.son);
// console.log(Object.getPrototypeOf(plants));

/* Objects hold a reference to their prototype throught the `[[Prototype]]`property. When the prototype is changed, changes are reflected in the inheriting objects as well */

let objectPrototype = {
  iAm: 'the prototype',
};

let other = Object.create(objectPrototype);

objectPrototype.one = 'one';
// console.log(other.one);
objectPrototype.one = 'two';
// console.log(other.one);


for (let prop in plants) {
  // console.log(prop);
}

// console.log(Object.keys(plants));

/* When two objects in the same prototypal chain has a property with the same name, the  object that is closer to the calling object takes precedence:*/

let a = {
  foo: 1,
};

let b = Object.create(a);
b.foo = 34;

let c = {};
Object.setPrototypeOf(c, b);

// console.log(c.foo);

/*When assigning a property on a JavaScript object, it always treats the property as an "own" property, even if the prototype chain already has a property with that name. Here foo became an own property of `c` */

c.foo = 88;
// console.log(c.foo);
// console.log(b.foo);

// console.log(chiara.constructor.prototype === Object.prototype);
for (let prop in chiara.constructor.prototype) {
  // console.log(prop);
}



// How do you create an object that doesn't have a prototype? 
let objNoProt = {};
Object.setPrototypeOf(objNoProt, null);

//

let objNoProt2 = Object.create(null);
// How can you determine whether an object has a prototype?
if (Object.getPrototypeOf(objNoProt));

//----


let foo84 = {
  bar: function() {
    // console.log(this);
  }
};

foo84.bar(); // `foo` is the implicit execution context for `bar`
// { bar: [Function: bar] }
let baz = foo84.bar;
baz(); // Object [global] {...}

/*  In this code we assign the foo.bar method to the variable baz. Since we are calling baz as a standalone funciton, its execution context is the global object. */


// _____________________________

/* This codes line 9 will output the obj object because online 7 the function has been invoked as method with obj as calling object. Therefore this references the callling object. On the previous excercise, a regular function call was assigned to the variable context while in ex 2 is a method call what is assigned to the context variable. */

let foo1 = {
  a: 1,
  b: 2,
};

let bar1 = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

// console.log(bar.add.call(foo));



let greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function(name) {
    let currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  }
};

let spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buena noches, '
};

let spanishGreeter = greetings.greeting.bind(spanishWords);

// spanishGreeter('Jose');
// spanishGreeter('Juan');

function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function() {
    repeatThreeTimes(function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    }.bind(this));
  },
};

// john.greetings();

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined

let obj170 = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    },this);
  },
};

// obj170.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  // console.log(returnVal);
}

let descriptionOfTurk = turk.getDescription.bind(turk)
logReturnVal(descriptionOfTurk);

//-----

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

// TESgames.listGames();

//NO. The code will output undefined: arena .... 
// on line 210 within the callback function body, this loses its context and executes using implicitly the global object as the execution context. Therefore the output is undefined: title.

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
// console.log(foo.a);

//The value `foo.a`will still be 0. The execution context of the function increment is the global object. As there is no property `a` on it, this.a resolves to undefined and the property a of foo it is not incremented.

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype)
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

//maxi.bark(); // 'Woof!'

console.log(Object.getPrototypeOf(maxi) === Dog.myPrototype); 
console.log(maxi.constructor === Object);

// the above true / the below false if setProtperty activated. VICEVERSA if it is not.
console.log(Object.getPrototypeOf(maxi) === Dog.prototype);
console.log(maxi.constructor === Dog );
