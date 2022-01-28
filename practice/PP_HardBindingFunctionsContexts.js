//1, What method can we use to bind a function permanently to a particular execution context?

/* The bind method. which returns a new function forever binded to the given context. */

//2,What will the following code log to the console?

let obj2 = {
  message: 'JavaScript',
};

function foo2() {
  console.log(this.message);
}

foo2.bind(obj2);

/* It won`t log anything. Bind does not invoke the function, it just returns a new one with a binded contxt. */

//3. What will the following code output?


let obj3 = {
  a: 2,
  b: 3,
};

function foo3() {
  return this.a + this.b;
}

let bar3 = foo3.bind(obj3);

console.log(foo3());
console.log(bar3());

/* On line 12 NaN will be logged to the console as the implkicit execution context will be the global object and within the global object there is no properties a or b.
On line 34, 5 will be logged to the console: on line 10, a the foo function binded to the obj context has been stored in the bar variable. Therefore, when we invoke bar on line 34, the context will be the obj object and tehrefore the output will be 5. */

//4. What will the code below log to the console?


let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo4() {
  console.log(this.message);
}

let bar4 = foo4.bind(positivity);

negativity.logMessage = bar4;
negativity.logMessage();

/* On line 54 we assign to bar4 the function foo4 binded to positivity as execution context. On line 56 we are adding a logMessage property to negativity object and set it to bar4. On line 57, when we invoke logMessage as a method of negativity, as it has been binded to positivity, it will log Javascirpt make senses and not the negativity message.  */

//5. What will the code below output?

let obj5 = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo5() {
  console.log(this.a);
}

let bar5 = foo5.bind(obj5);

bar5.call(otherObj);

/* Although we are invoking the function foo5 with the call method and settng otherObj as execution context, on line 74 bar references the function binded to the obj5 context, therefore on line 76 the output will be àmazebulous!' */