//1. The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.
console.log('\n ------- E. 1 ------------ \n');

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

/* The output will be 'undefined undefined is undefined'. The reason is that when passing a function as an argument, it looses its context. On line 15 we are invoking `getDescription` that has been passed to logReturnVal as an argument. There is how the context gets lost.  
PRETTY RESPONSE: When we pass turk.getDescription to logReturnVal as an argument, we remove the method from its context. As a result, when we execute it as func, this points to the global object rather than turk. Since global doesn't have properties defined for firstName, lastName, or occupation, the output isn't what we expect.*/

//2. Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.
console.log('\n ------- E. 2 ------------ \n');
let turk2 = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal2(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal2(turk2.getDescription, turk2);

//3. Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?
console.log('\n ------- E. 3 ------------ \n');
let turk3 = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}
let getTurkDescription = turk3.getDescription.bind(turk3);
logReturnVal(getTurkDescription);

//4. Consider the following code:
console.log('\n ------- E. 4 ------------ \n');
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

//Will this code produce the following output? Why or why not?

// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

/* The output won't be desired as on line 68, we are using a the function as a callback function therefore it looses its context.
When invoking the function on each element of the given array, forEach passes the title argument but 'this' loses the context.
(Since functions lose their surrounding context when used as arguments to another function, the context of line 68 is not the TESgames object. Instead, it is the global object. Thus, this.seriesTitle resolves to undefined rather than "The Elder Scrolls".)
 */

//5. Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.
console.log('\n ------- E. 5 ------------ \n');
const TESgames5 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames5.listGames();

//6. The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:
console.log('\n ------- E. 6 ------------ \n');
const TESgames6 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames6.listGames();

//7. Use an arrow function to achieve the same result:
console.log('\n ------- E. 7 ------------ \n');
const TESgames7 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => { 
      console.log(this.seriesTitle + ': ' + title)
    });
  }
};

TESgames7.listGames();

//8. Consider the following code:
console.log('\n ------- E. 8 ------------ \n');
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);
//What will the value of foo.a be after this code runs?


/* 0. When invoking the function increment on line 140, the execution context of the function is the global object. therfore the increment function is not incrementing the a property of foo object. 
*/

//9. Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.
console.log('\n ------- E. 9 ------------ \n');
let foo9 = {
  a: 0,
  incrementA: function() {
    
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo9.incrementA();
foo9.incrementA();
foo9.incrementA();
console.log(foo9.a);

/*  We can use apply or call to invoke increment on line 8 with explicit context. We pass this as the context argument since inside incrementA but outside of increment, this references the containing object, namely foo.*/