/* Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description
    */

/* 1. Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:
"Me Talk Pretty one day was written by David Sedaris."
 

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    readBook() {
      this.read = true;
    },

    getDescription: function() {
      return `${this.title} one day was written by ${this.author}.` + 
             `I ${this.read ? 'have' : 'I haven\'t'} read it.`;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse', true);

console.log(book1.getDescription()); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
console.log(book1.getDescription()); // Mythos was written by David Fry. I have read it.
*/

/*the following code creates a new property in the baz object instead of assigning the property in the prototype object.

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

Write a function that **searches the prototype chain of an object** for a given property and assigns it a new value. 
If the property does not exist in any of the prototype objects, the function should do nothing. 
The following code should work as shown:*/

/* function assignProperty(obj, prop, val) {
  while (obj !== null) {
    if (obj.hasOwnProperty(prop)) {
      obj[prop] = val;
      break;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false 
 */
//Recursive Solution

/*
function assignProperty(obj, property, value) {
  if (obj === null) { // property not found
    return;
  } else if (obj.hasOwnProperty(property)) {
    obj[property] = value;
  } else {
    assignProperty(Object.getPrototypeOf(obj), property, value);
  }
}
*/

let foo = {1: 1, 2: 2}

//cannot tell the origin
//copies all the elements and it is redundant and inefficient


