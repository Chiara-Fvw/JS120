/* 1. Inherited Year

Using the following code, create two classes - Truck and Car - that both inherit from Vehicle.

Expected output:
2003
2015 */
console.log('Exercise 1: ');

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle{};

class Car extends Vehicle{};

let truck = new Truck(2003);
console.log(truck.year); // 2003

let car = new Car(2015);
console.log(car.year); // 2015
/* When designing an Object Oriented program, it's common to have multiple classes that perform similar actions. For example, both Truck and Car use the property year. To reduce complexity, classes with similar behaviors can inherit from a superclass. The superclass implements the common behaviors while the inheriting classes invoke them.

The extends keyword is used to denote inheritance between classes. */

/* 2. Start the Engine (part 1)

Change the following code so that creating a new Truck automatically invokes startEngine.

Expected output:
Ready to go!
2003
 */
console.log('\nExercise 2: ');
class Vehicle2 {
  constructor(year) {
    this.year = year;
  }
}

class Truck2 extends Vehicle2 {
  constructor(year) {
    super(year);
    this.startEngine();
  };
  
  startEngine() {
    console.log('Ready to go!')
  }
}

let truck2 = new Truck2(2003);
console.log(truck2.year); // 2003

/* 3. Only Pass the Year

Using the following code, allow Truck to accept a second argument upon instantiation. Name the parameter bedType and implement the modification so that Car continues to only accept one argument.

Expected output:
2003
Short */

console.log('\nExercise 3: ');

class Vehicle3 {
  constructor(year) {
    this.year = year;
  }
}

class Truck3 extends Vehicle3 {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }
}

class Car3 extends Vehicle3 {}

let truck3a = new Truck3(2003, 'Short');
console.log(truck3a.year);
console.log(truck3a.bedType);

/* 4.Start the Engine (part 2)

Given the following code, modify the Truck class so that the code shown below displays the indicated output. Your code should make use of the startEngine method in the Vehicle class.

Expected output:
  Ready to go! Drive fast, please!
  Ready to go! Drive slow, please!
 */
  console.log('\nExercise 4: ');

  class Vehicle4 {
    startEngine() {
      return 'Ready to go!';
    }
  }
  
  class Truck4 extends Vehicle4{
    
    startEngine(speed) {
      return  super.startEngine() + `Drive ${speed}, please!`
    }
  }
  
  let truck4 = new Truck4();
  console.log(truck4.startEngine('fast'));
  

  let truck4b = new Truck4();
  console.log(truck4b.startEngine('slow'));

  /* 5.Walk The Cat

Using the following code, create a mixin named walkMixin that contains a method named walk. This method should return Let's go for a walk! when invoked. Include walkMixin in Cat and invoke walk on kitty.

Expected output:
Hello! My name is Sophie!
Let's go for a walk!
 */
console.log('\nExercise 5: ');

let walkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
}

class Cat {  
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

Object.assign(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());

/* 6. Swimming

Correct the following program so it will work properly. Just make the smallest possible change to ensure that objects of Maltese and Fish class have access to the swim method.

Expected output:
  Buddy is swimming.
  Nemo is swimming. */

console.log('\nExercise 6: ');

const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
}

class Fish {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Fish.prototype, swimMixin);

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {
  constructor(name) {
    super(name);
  }
}
Object.assign(Maltese.prototype, swimMixin);

let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());
console.log(fish1.swim());

/* 7. Towable (part 1)

Using the following code, create a towMixin mixin that contains a method named tow that returns I can tow a trailer! when invoked. Include the mixin in the Truck class.

Expected output:
  I can tow a trailer! 
*/

console.log('\nExercise 7: ');

const towMixin = {
  tow() {
    return 'I can tow a trailer!';
  }
}

class Truck7 {}
Object.assign(Truck7.prototype, towMixin);

class Car7 {}

let truck7 = new Truck7();
console.log(truck7.tow());

/* 8.Towable (part 2)

Using the following code, create a class named Vehicle that, upon instantiation, assigns the passed in argument to year property. Both Truck and Car should inherit from Vehicle.


Expected output:
  2002
  I can tow a trailer!
  2015 
*/
console.log('\nExercise 8: ');

const towMixin8 = {
  tow() {
    return "I can tow a trailer!";
  }
}
class Vehicle8 {
  constructor(year) {
    this.year = year;
  }
}

class Truck8 extends Vehicle8{
  constructor(year) {
    super(year);
    Object.assign(this, towMixin);
  }
}

class Car8 extends Vehicle8{}

let truck8 = new Truck8(2002);
console.log(truck8.year);
console.log(truck8.tow());

let car8 = new Car8(2015);
console.log(car8.year);