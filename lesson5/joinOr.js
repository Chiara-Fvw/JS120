//Make method to be called upon an array that takes an array of numbers and joins it into a string. If no separator is give, it will separate elements by comma (,). If the separator is given it uses the given.
//to separete last from second to last use 'or' or a given final separator.
//take the length of the array:
  /* if it is 1, return only the number.
    if it is 2: return first joint 2 second
    if it is bigger than 2: separate the first part from the second (last number) and join the first part with joint1 and then add join 2 and the las part.
    */


let obj = {
  joinOr(validChoices, joint1 = ', ', joint2 = 'or') {
    if (validChoices.length === 1) {
      return validChoices[0];
    } else if (validChoices.length === 2) {
      return validChoices[0] + ' ' + joint2 + ' ' + validChoices[1];
    } else if (validChoices.length > 2) {
      let firstPart = validChoices.slice(0, validChoices.length - 1);
      let secondPart = validChoices[validChoices.length - 1];

      return `${firstPart.join(joint1)} ${joint2} ${secondPart}`;
    }
  }
}

console.log(obj.joinOr([1]))
console.log(obj.joinOr([1, 2]))                   //# => "1 or 2"
console.log(obj.joinOr([1, 2, 3]))                //# => "1, 2, or 3"
console.log(obj.joinOr([1, 2, 3], '; '))          //# => "1; 2; or 3"
console.log(obj.joinOr([1, 2, 3], ', ', 'and'))   //# => "1, 2, and 3"

