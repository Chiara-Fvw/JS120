function UserCreator(name) {
  this.name = name;
}

UserCreator.prototype.sayName = function() {
  console.log(`I'm ${this.name}`);
}

function PaidUserCreator(paidName, balance) {
  UserCreator.call(this, paidName);
  this.balance = balance;
}
 
console.log(PaidUserCreator.prototype.__proto__ === Object.prototype); //true
console.log(PaidUserCreator.prototype.__proto__ === UserCreator.prototype); //false
PaidUserCreator.prototype = Object.create(UserCreator.prototype); //Here we generate a new object that points to user creator prototype object.
console.log(PaidUserCreator.prototype.constructor); //[Function: UserCreator]
PaidUserCreator.prototype.constructor = PaidUserCreator; //here we are setting the constructor of the prototype as paidUserCreator instead of UserCreator (which is the one that has the portoytpe object of userCreator)

// console.log(PaidUserCreator.prototype.__proto__ === Object.prototype); //false
// console.log(PaidUserCreator.prototype.__proto__ === UserCreator.prototype); //true

// console.log(PaidUserCreator.prototype === UserCreator.prototype); //false, this is not the same obj, it would be bad
//The wrong way to make the connection would have been: 
//PaidUserCreator.prototype = UserCreator.prototype;

//A different thing we could do, but perfonmance:
// PaidUserCreator.prototype.__proto__ = UserCreator.prototype;

PaidUserCreator.prototype.increase = function() {
  this.balance += 1; 
}

const user1 = new UserCreator("Dean");
// console.log(user1.__proto__ === UserCreator.prototype); //true
// user1.increase(); //Type error the property increase can not be found.

const paidUser1 = new PaidUserCreator("Ryan", 3);
// console.log(paidUser1.__proto__ === PaidUserCreator.prototype); //true

//paidUser1.increase();
//console.log(paidUser1.balance);
//paidUser1.sayName();