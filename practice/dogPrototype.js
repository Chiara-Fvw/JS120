function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');   // Here we are creating the bark property inside the constructor protype object which will be setted by the constructor as the prototype object from which inherit the objects created by the constructors.
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let nana = new Dog('Nana', 'Miniature Schnautzer', 7);

dexter.bark = function() {
  console.log('WOOF!');
}
maxi.bark();
nana.bark();

console.log(maxi.hasOwnProperty('bark'));
console.log(nana.bark === maxi.bark);

console.log(Dog.prototype); //object prototype for all 'creatons' of the constructor
console.log(Dog.prototype.constructor);
console.log(dexter.bark());
console.log(maxi.bark());
console.log(dexter);
console.log(nana);