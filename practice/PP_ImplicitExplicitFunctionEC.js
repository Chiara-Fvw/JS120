//1. What will the following code output? Try to determine the results without running the code.

function func() {
  return this;
}

let context = func();

console.log(context);

/* It will return the global object, as the function's implicit context is the global object. As we are calling the function on line 7 as a standalone function, its context will be the global object. Therefore, when we are logging the variable in which has been stored the return value of the func function, the result is global object. */


//2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.


let obj = {
  func: function() {
    return this;
  },
};

let context2 = obj.func();

console.log(context2);

/* It will log obj. We are storing the result of calling a mehtod. As method execution context is implicitly set to its obj, the result will be the obj.
The differences between ex.1 and 2 is how we invoke the function: as a standalone funciton or as method. */

//3. What will the following code output?


message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage();

/* On line 33 we are storing `message`as a property of the global object.
on line 36, we are accessing the global object by using `this`. When we invoke the deliverMessage function on line 39, the context is the global object, therefore 'Hello from the global scope' is printed. 
ON line 41, we save message as a `foo`property. ON line 45, however, we create a new property for `foo`named deliverMessage that references the function omonima.
The function on line 47 is invoked as a method. As in this case the execution context is the object, the message this time will be 'hello from the funciton scope!'.  */

//4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

/* the method call and method apply. */

//5.Take a look at the following code snippet. Use call to invoke the add method but with foo as execution context. What will this return?


let foo5 = {
  a: 1,
  b: 2,
};

let bar5 = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(bar5.add.call(foo5));


/* It should return 3 as we are explicitly biding the context to `foo`. Therefore a will be 1 and b, 2. */