let father = {
  eyes: 'blue',
  familyName: 'fathersons',

  eat() {
    console.log('lactose intollerant');
  }
}

let son = Object.create(father);

function dog(name, breed) {
  this.name = name;
  this. breed = breed;

  this.bark = function() {
    console.log('wof');
  };
}

let puppy = new dog('nana', 'schnautzer');
puppy.bark();
son.eat();

// console.log(puppy.hasOwnProperty('name'));
// console.log(son.hasOwnProperty(`familyName`));
// console.log(puppy.hasOwnProperty('bark'));
// console.log(son.hasOwnProperty(`eat`));


console.log(puppy instanceof dog);
// console.log(son instanceof father);
console.log(Object.getPrototypeOf(puppy) === dog.prototype);
console.log(Object.getPrototypeOf(son) === father);