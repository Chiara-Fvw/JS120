/* 1. Rectangles

Create a class Rectangle.
The constructor should take 2 arguments which represent width and length respectively.
Implement the class so that the output from the example below is correct.

**Formula for rectangle area is: width * length.
*/
console.log('Exercise 1: ');

class Rectangle {
  constructor(width, length) {
    this.widht = width;
    this.length = length;
  }
  getWidth() {
    return this.widht;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.widht * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

/* 2. Rectangles and Squares

Given the class from the previous problem, 
Write a class called Square that inherits from Rectangle, and is used like this:

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25 
*/
console.log('\nExercise 2: ');

class Rectangle2 {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle{
  constructor(size) {
    super(size, size);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25 

/* 3. Fake Cat

Without calling the Cat constructor, create an object that looks and acts like a Cat instance that doesn't have a defined name.

*/
console.log('\nExercise 3: ');

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);


console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww. 

/* 4. Complete the Program - Cats!

Consider the following program.
Update this code so that when you run it, you see the following output:
  My cat Pudding is 7 years old and has black and white fur.
  My cat Butterscotch is 10 years old and has tan and white fur. 
*/

console.log('\nExercise 4: ');

class Pet4 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat4 extends Pet4 {
  constructor(name, age, fur) {
    super(name, age);
    this.fur = fur;
  }

  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.fur} fur.`
  }
}

let pudding4 = new Cat4('Pudding', 7, 'black and white');
let butterscotch4 = new Cat4('Butterscotch', 10, 'tan and white');

console.log(pudding4.info());
console.log(butterscotch4.info());

/* Further Exploration

An alternative approach to this problem would be to modify the Pet class to accept a colors parameter. If we did this, we wouldn't need to supply a constructor method for Cat.

Why would we be able to omit the constructor method? Because all arguments will be expected on the supertype class.

Would it be a good idea to modify Pet in this way? Why or why not? 
It depends of the type of pets. All pets should have a color, therefore all pets may end up needing a color. However, in case there is a pet that does not need color, would be unnecessary.

How might you deal with some of the problems, if any, that might arise from modifying Pet? 
using a default argument
*/

/* 5. Animals

Given a class Animal create two classes Cat and Dog that inherit from it.

The Cat constructor should take 3 arguments, name, age and status. Cats should always have a leg count of 4 and a species of cat. Also, the introduce method should be identical to the original except, after the phrase there should be a single space and the words Meow meow!. For example:

The Dog constructor should take 4 arguments, name, age and status and master. Dogs should always have a leg count of 4 and a species of dog. Dogs have the same introduce method as any other animal, but they have their own method called greetMaster(), which accepts no arguments and returns Hello (master's name)! Woof, woof!. (Make sure you replace (master's name) with the name of the dog's master.)


 */
console.log('\nExercise 5: ');

class Animal5 {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat5 extends Animal5{
  constructor(name, age, status, legs = 4, species = 'cat') {
    super(name, age, legs, species, status);
  }

  introduce() {
    return `${super.introduce()} Meow meow!`;
  }
}

class Dog5 extends Animal5 {
  constructor(name, age, legs = 4, species = 'dog', status, master) {
    super(name, age, legs, species, status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

let cat5 = new Cat5("Pepe", 2, "happy");
console.log(cat5.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

/* 6.Refactoring Vehicles

Consider the following classes. 
Refactor these classes so they all use a common superclass, and inherit behavior as needed.

 */
console.log('\nExercise 6: ');

class Vehicle {
  consturctor(make, model) {
    this.make = make;
    this.model = model;
  }

  info(){
    return `${this.make} ${this.model}`
  }
}
class Car6 extends Vehicle{
  getWheels() {
    return 4;
  }
}

class Motorcycle6 extends Vehicle{
  getWheels() {
    return 2;
  }
}

class Truck6 extends Vehicle{
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}

/* Further Exploration

Would it make sense to define a wheels method in Vehicle even though all of the remaining classes would be overriding it? Why or why not? If you think it does make sense, what method body would you write?

It would not make sense, unless you add a wheels parameter in the constructor and make the getWheels take the wheels of the current instance.*/

/* 7. What Will This Do?

What will the following code log?
*/

console.log('\nExercise 7: ');

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); //ByeBye
console.log(thing.dupData()); //HelloHello

/* 8.Shouter

Rewrite these two object types to use the class keyword, instead of direct prototype manipulation. Person exposes method greeting which when called logs the provided greeting text. Shouter is a subtype of Person and is a bit loud so whatever he says is uppercased.

*/

console.log('\nExercise 8: ');

class Person8 {
  greeting(text) {
    console.log(text);
  }
}

class Shouter8 extends Person8 {

  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}


let person = new Person8();
let shouter = new Shouter8();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND. 

/* 9. Moving

You have the following classes.
You need to modify the code so that this works. You are only allowed to write one new method to do this 
*/

console.log('\nExercise 9: ');

const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
}

class Person9 {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "strolls";
  }
}

class Cat9 {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "saunters";
  }
}

class Cheetah9 {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

Object.assign(Person9.prototype, walkMixin);
Object.assign(Cat9.prototype, walkMixin);
Object.assign(Cheetah9.prototype, walkMixin);


let mike = new Person9("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat9("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah9("Flash");
console.log(flash.walk());
// "Flash runs forward"

/* 10. Pet Shelter

Consider the following code:
Write the classes and methods that will be necessary to make this code run, and log the following output:

P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.

The order of the output does not matter, so long as all of the information is presented. 
*/

console.log('\nExercise 10: ');

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.adopted = false;
  }

  getPetDescription() {
    return `a ${this.type} named ${this.name}`;
  }

  adoption() {
    this.adopted = true;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  printPets() {
    this.pets.forEach(pet => console.log(pet.getPetDescription()));
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.adoptions = {};
  }
  
  adopt(owner, pet) {
    owner.pets.push(pet);
    pet.adoption();
    if (!this.adoptions[owner.name]) {
      this.adoptions[owner.name] = owner;
    }
  }

  printAdoptions() {
    for(let name in this.adoptions) {
      console.log(`${name} has adopted the following pets:`);
      this.adoptions[name].printPets();
      console.log("");
    }
  }    
  
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');
let asta         = new Pet('dog', 'Asta');
let laddie       = new Pet('dog', 'Laddie');
let fluffy       = new Pet('cat', 'Fluffy');
let kat          = new Pet('cat', 'Kat');
let ben          = new Pet('cat', 'Ben');
let chatterbox   = new Pet('parakeet', 'Chatterbox');
let bluebell     = new Pet('parakeet', 'Bluebell');
let nana         = new Pet('dog', 'Nana');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');
let chiara = new Owner('C Fiorentini');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`The animal shelter has ${8} unadopted pets.`)

/* Further Exploration

Add your own name and pets to this project.

Suppose the shelter has a number of not-yet-adopted pets, and wants to manage them through this same system. Thus, you should be able to add the following output to the example output shown above:

The Animal Shelter has the following unadopted pets:
a dog named Asta
a dog named Laddie
a cat named Fluffy
a cat named Kat
a cat named Ben
a parakeet named Chatterbox
a parakeet named Bluebell
   ...

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.
The Animal shelter has 7 unadopted pets.
Can you make these updates to your solution? Did you need to change your class system at all? Were you able to make all of your changes without modifying the existing interface? */


/* console.log(`The Animal Shelter has the following unadopted pets: `);
    for (let idx = 0; idx < this.pets.length; idx++) {
      let petObject = this.pets[idx];
      if(petObject.adopted === false) {
        console.log(petObject.getPetDescription());
      }
    } */