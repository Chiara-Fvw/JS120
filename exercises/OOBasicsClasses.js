//1. Name the Constructor

//Update the following code so that, instead of logging the values, each statement logs the name of the constructor to which it belongs.
console.log('Exercise 1');

console.log(("Hello".constructor.name));
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

/* Expected output:

String
Array
Object
*/

/* 2. Create the Class

Create an empty class named Cat.
 */

class Cat2 {

};

/* 3. Create an Instance

Using the code from the previous exercise, create an instance of Cat and assign it to a variable named kitty.

Code:*/

class Cat3 {

}
 

let kitty3 = new Cat3();

/* 4. What are you?

Using the code from the previous exercise, add a constructor method that logs to the console I'm a cat! when a new Cat object is initialized.
Expected output:  I'm a cat! 

*/

console.log('\nExercise 4:');
class Cat4 {
  constructor() {
    console.log('I am a cat!');
  }
}

let kitty4 = new Cat4();

/* 5. Hello, Sophie! (part 1)

Using the code from the previous exercise, add a parameter to constructor that provides a name for the Cat object. Assign this parameter to a property called name and use it to log a greeting with the provided name. (You can remove the code that displays I'm a cat!.)

Expected output: Hello! My name is Sophie!
 */

console.log('\nExercise 5:');
class Cat5 {
  constructor(name) {
    this.name = name;
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty5 = new Cat5('Sophie');

/* 6. Hello, Sophie! (part 2)

Using the code from the previous exercise, move the greeting from the constructor method to an instance method named greet that logs a greeting to the console when invoked.

Expected output: Hello! My name is Sophie! 
*/
console.log('\nExercise 6:');
class Cat6 {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty6 = new Cat6('Sophie');
kitty6.greet();

/* 7. Default Person

Create a class Person. Person should accept one argument for "name" when instantiated.

If no arguments are given, person object should instantiate with a "name" of "John Doe".
*/

console.log('\nExercise 7:');

class Person {
  constructor(name = 'Jhon Doe') {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe 

/* 8. Hello, Chloe!

Using the following code, add an instance method named rename that renames kitty when invoked.

Expected output:
  Sophie
  Chloe 
*/

console.log('\nExercise 8:');

class Cat8 {
  constructor(name) {
    this.name = name;
  }

  rename(newName) {
    this.name = newName;
  }
}

let kitty8 = new Cat8('Sophie');
console.log(kitty8.name); // Sophie
kitty8.rename('Chloe');
console.log(kitty8.name); // Chloe

/* 9. Generic Greeting (part 1)

Modify the following code so that Hello! I'm a cat! is logged when Cat.genericGreeting is invoked.

Expected output: Hello! I'm a cat!
 */
console.log('\nExercise 9:');

class Cat9 {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

Cat9.genericGreeting();

/* 10 Generic Greeting (part 2)

Using the following code, add two methods: static method genericGreeting and instance method personalGreeting. The first method should log a greeting that's generic to the class. The second method should be an instance method and log a greeting that's custom to the object.

Expected output:
Hello! I'm a cat!
Hello! My name is Sophie!
 */
console.log('\nExercise 10:');

class Cat10 {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I'm a Cat!");
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}`);
  }
}

let kitty10 = new Cat10("Sophie");
Cat10.genericGreeting();
kitty10.personalGreeting();