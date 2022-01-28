/* 
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar();
  },
};

obj.foo();        // => undefined undefined 

PROBLEM: A function or method's execution context depends solely on how you invoke it, not on how and where it's defined. Here, `bar` is invoked as a standalone function on line 9. Thus, its execution context is the global object, not the `obj` object that you may have expected.
*/

let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    let self = this;

    function bar() {
      console.log(self.a + ' ' + self.b);
    }

    bar();
  },
};

obj.foo(); // => hello world