//check if have the same length
//check if all keys are the same --> iterate both keys arrays and compare the keys.
//if yes, check that each value assigned to the same key is the same.


function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for(let idx = 0; idx < keys1.length; idx++) {
    if (keys1[idx] !== keys2[idx]) return false;
    if (typeof obj1[keys1[idx]] === 'object') {
      if(!objectsEqual(obj1[keys1[idx]], obj2[keys2[idx]])) return false;
    } else {
      if (obj1[keys1[idx]] !== obj2[keys2[idx]]) return false;
    }
  }

  return true;
}


console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: {a: 1, b: 2}}, {a: 'foo', b: {a: 1, b: 2}}));  // true
console.log(objectsEqual({a: 'foo', b: {a: 1, b: 2}}, {a: 'foo', b: {a: 1, c: 2}}));  // false


