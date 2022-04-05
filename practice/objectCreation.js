//********* Factory Function *********

function createObject(a, b, c) {
  return {
    a: a,
    b: b,
    c: c,

    methodA() {

    },

    methodB() {

    }

  }
}

//********* Object prototypes *********

let objA = {
  foo: 1,
  bar: 2,
};

let objB = Object.create(objA);

//********* OLOO *********

let dogPrototype = {
  wash: function() {
    this.smelly = false;
  },

  croquetting: function() {
   this.smelly = true;
  },

  init(name, breed, color, smelly) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.smelly = smelly;
    return this; //Since init now returns a reference to the dog object it was called on, we can chain create and init and assign the result to the car1 variable:
  },
}

// let nana = Object.create(dogPrototype);
// nana.init('Nana', 'Schnautzer', 'Black');
               // |
               // V  

let nana = Object.create(dogPrototype).init('Nana', 'Schnautzer', 'Black', false);

nana.wash();

console.log(nana.smelly);
nana.croquetting();
console.log(nana.smelly);

//********* CONSTRUCTORS *********

function Create(a, b) {
  this.a = a,
  this.b = b,
  this.c = function() {
    return this.a + this.b;
  }
}

let creation = new Create("a", "b");
let creation2 = new Create(1, 2);
//new creates a completely new object
//console.log(creation);

//`new` sets the prototype of the new object to the object that is referenced by the constructro's `prototype` property.
console.log(Object.getPrototypeOf(creation) === Create.prototype); 

//It sets the value of this for use inside the function to point to the new object:
console.log(creation.c());
console.log(creation2.c());

//********* Class syntax *********

class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }
}

let rec = new Rectangle(10, 5);




