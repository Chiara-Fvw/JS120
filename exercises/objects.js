/* 1. Buggy Code 1

The code below is expected to output the following when run:


> let helloVictor = createGreeter('Victor');
> helloVictor.greet('morning');
= Good Morning Victor

However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

 */
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

/*The problem is that it didn't use this keyword to access the properties of the object returned by the createGreeter function. */

/* 2. Buggy Code 2

A grocery store uses a JavaScript function to calculate discounts on various items. They are testing out various percentage discounts but are getting unexpected results. Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function. Then, modify the code so that it produces the correct results.
 */

console.log('\nExercise 2: ');

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let total = this.price - discount;
    
    return total;
  },
};

console.log(item.discount(20))   // should return 40
console.log(item.discount(50))   // should return 25
console.log(item.discount(25))   // should return 37.5

/* 3. Testing Object Equality

In JavaScript, comparing two objects either with == or === checks for object identity. In other words, the comparison evaluates as true if it's the same object on either side of == or ===. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

Futher Exploration

A limitation of this function is that it doesn't look for deep equality. In other words, if one of the values is an object in both objects, this will return false unless that object is identical on both objects.
*/
console.log('\nExercise 3: ');

function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keyMatch(a, b) && valueMatch(a,b));
}

function keyMatch(a,b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valueMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => {
    if (typeof a[key] === 'object') {
      return keyMatch(a[key], b[key]);
    }
    return a[key] === b[key]
  });
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false 
console.log(objectsEqual({a: 'foo', c: 1, obj: {hello: 'goodbye'}}, {a: 'foo', c: 1, obj: {hello: 'goodbye'}}));  // true 

