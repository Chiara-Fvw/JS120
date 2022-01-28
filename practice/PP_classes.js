//1. What do we mean when we say that classes are first-class values?

/* Clasees can be passed as arguments to other fuctions, returned by functions or can be saved in a variable. */

//2. Consider the following class declaration:

class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}
//What does the static modifier do? How would we call the method manufacturer?

// The static modifier, when used with a method declaration, marks the method as static. That is, the method is defined directly on the class, not on the objects the class creates. We use it like this:

Television.manufacturer();

// The model method, on the other hand, is an instance method and must be called by an instance object:

let tv = new Television();
tv.model();