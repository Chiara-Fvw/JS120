// Introductions
// Questions
// Visual Diagram of object internals

// - ---------------------------------

// let Dog = (function() {
//   let species = "canis lupis";
//   let name = 'default';
//   let weight;

//   function Dog(newName, dogWeight){
//     name = newName;
//     weight = dogWeight;
//     // this.species = species;
//   }

//   Dog.prototype.printSpecies = function() { 
//     console.log(species);
//   };

//   Dog.prototype.getName = function() {
//     return name;
//   };

//   return Dog;
// })();

// console.log(``);
// let red = new Dog("red" ,20);
// console.log(red.species);
// red.printSpecies();
// console.log(red.getName());

// let brown = new Dog('brown', 30);
// console.log(brown.getName());
// console.log(red.getName());
//console.log(species);

// ---------------------------

// https://www.notion.so/JS120-Questions-about-various-concepts-theory-How-the-backpropagation-algorithm-works-7fb22644163e42e4aac0360215022c81

// 6. In JavaScript, how does encapsulation differ from encapsulation in most other OO languages?

// let human = {
//   height: '5-3',
//   gender: 'female',

//   speak() {
//     return `Hello I am ${this.height} tall, and I am a ${this.gender}`;
//   },
// };

// console.log(human.speak());

// ---------------------------------------

// 18. There are two types of polymorphism in JS. What are they? Choose one of them and explain how it works on an example.
// The two types of polymorphism in JS are: 
// - Polyymorphism through inheritance.
// - Polymorphism through duck typing.
// Polymorphism is when we are able to invoke a method  without caring about which object invoked it. 

// Duck typing is a version of polymorphism that enables the developer to invoke a method on objects that do not share an ancestor on their prototype chain. 



// const dog = {
//   speak() { console.log('bark') },
// };

// const cat = {
//   speak() { console.log('meow') },
// };

// const animals = [dog, cat];
// animals.forEach(animal => animal.speak());


// const blinds = { draw() {}, };
// const person = { draw() {}, };

/*
Polymorphism requires intention. 

Note that merely having two different objects that have a method with the same name and compatible arguments *doesn't mean that you have polymorphism*.

  Telling two similar (conceptually) objects to do the same thing.
  Multiple objects providing the same interface for similar behaviour.
*/


// Does the Animal class _have_ to have a `speak` method for this example to be 
// polymorphism through inheritance? 
class Animal {
  constructor(sound) {
    this.sound = sound;
  }

  speak() {
    console.log(`${this.sound}`);
  }
}

class Dog extends Animal {
  // constructor(sound) {
  //   super(sound);
  // }

  speak() {
    super.speak();
    console.log('bark');
  }
}

const terrior = new Dog('woof');
terrior.speak();

class Cat extends Animal {
  speak() {
    console.log('cat');
  }
}

/* Polymorphism refers to the ability of objects with different types to respond to the same method invocation. In other words, *data of different types can respond to a common interface*. It's a crucial concept in OO programming that can lead to more maintainable code.

It can be implemented through inheritance by *method overriding*. It can also be implemented through **duck typing**; by ensuring that objects of different **types** *use the same method name to perform different but related functions*, those objects can be interacted with in a uniform way. */


// class Animal {
//   move() {}
// }

// class Fish extends Animal {
//   move() {
//     console.log("swimming");
//   }
// }

// class Cat extends Animal {
//   move() {
//     console.log("walking");
//   }
// }

// Sponges and Corals don't have a separate move method - they don't move
// class Sponge extends Animal {}
// class Coral extends Animal {}

// let animals = [new Fish(), new Cat(), new Sponge(), new Coral()];
// animals.forEach(animal => animal.move());

// This is a simple example of polymorphism in which two different object types can respond to the same method call simply by overriding a method inherited from a superclass. In a sense, overriding methods like this is similar to duck-typing, a concept that we'll meet shortly.
