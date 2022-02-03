/* 1.Ancestors

Implement an ancestors method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:
 */

// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

Object.prototype.ancestors = function() {
  let chain = [];
  let currentProto = Object.getPrototypeOf(this);

  while (!chain.includes('Object.prototype')) {
    if (currentProto === Object.prototype) {
      chain.push('Objetct.prototype');
      return chain;
    } else {
      chain.push(currentProto.name);
      currentProto = Object.getPrototypeOf(currentProto);
    }
  }
  
  return chain;
}

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']

/* Soultion:
Object.prototype.ancestors = function ancestors() {
  let ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
};
Discussion

The problem lends itself well to a recursive solution. The resulting array is incrementally built by recursively calling on the Object.prototype.ancestors method. The base case is when ancestor does not have a name property anymore because it means that ancestor is Object.prototype already. When this is the case, there are no more prototype objects to add. The key for this solution is recognizing that the value of this is the calling object and that we have to add the ancestors method on Object.prototype so that all objects have access to it. */

/* 2. Classical Object Creation

Implement the following diagram using the pseudo-classical approach. Subclasses should inherit all of the superclass's methods. Reuse the constructors of the superclass when implementing a subclass.
*/

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return `Hello! I'm ${this.firstName} ${this.lastName}`;
};

Person.prototype.communicate = function() {
  console.log('Communicate...');
};

Person.prototype.eat = function() {
  console.log('Eat...');
};

Person.prototype.sleep = function() {
  console.log('Sleep...');
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function() {
  console.log('Diagnose...');
}

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function() {
  console.log('Teaching...');
}

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log('Studying...');
}

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}
GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function() {
  console.log('Researching...');
}

console.log(`\n Exercise 2: `);

let person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'

/* 3. Circular Queue

A circular queue is a collection of objects stored in a buffer that is treated as though it is connected end-to-end in a circle. When an object is added to this circular queue, it is added to the position that immediately follows the most recently added object, while removing an object always removes the object that has been in the queue the longest.

This works as long as there are empty spots in the buffer. If the buffer becomes full, adding a new object to the queue requires getting rid of an existing object; with a circular queue, the object that has been in the queue the longest is discarded and replaced by the new object.

Assuming we have a circular queue with room for 3 objects, the circular queue looks and acts like this:

P1	P2	P3	Comments
All positions are initially empty
1			Add 1 to the queue
1	2		Add 2 to the queue
2		Remove oldest item from the queue (1)
2	3	Add 3 to the queue
4	2	3	Add 4 to the queue, queue is now full
4		3	Remove oldest item from the queue (2)
4	5	3	Add 5 to the queue, queue is full again
4	5	6	Add 6 to the queue, replaces oldest element (3)
7	5	6	Add 7 to the queue, replaces oldest element (4)
7		6	Remove oldest item from the queue (5)
7			Remove oldest item from the queue (6)
Remove oldest item from the queue (7)
Remove non-existent item from the queue (nil)


Your task is to write a CircularQueue class that implements a circular queue for arbitrary objects. The class should obtain the buffer size with an argument provided to the constructor, and should provide the following methods:

enqueue to add an object to the queue
dequeue to remove (and return) the oldest object in the queue. It should return null if the queue is empty.
You may assume that none of the values stored in the queue are null (however, null may be used to designate empty spots in the buffer).

Examples:


The above code should log true 15 times.

 */
class CircularQueue {
  constructor(slots) {
    this.slots = slots;
    this.queue = [];
  }

  check() {
    console.log(`This queue hast ${this.queue.length} slots.`);
  }

  enqueue(elm) {
    //   enqueue to add an object to the queue
    if (this.queue.length < this.slots) {
      this.queue.push(elm);
    } else {
      this.queue.shift();
      this.queue.push(elm);
    }
  }

  dequeue() {
    // dequeue to remove (and return) the oldest object in the queue. It should return null if the queue is empty.
    if (this.queue.length === 0) {
      return null;
    } else {
      return this.queue.shift();
    }
  }


// You may assume that none of the values stored in the queue are null (however, null may be used to designate empty spots in the buffer).
};

console.log(`\nExercise 3: `);

let queue = new CircularQueue(3);
//queue.check();
console.log(queue.dequeue() === null); //true

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1); //true

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);