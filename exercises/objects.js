/* 1. Buggy Code 1

The code below is expected to output the following when run:


> let helloVictor = createGreeter('Victor');
> helloVictor.greet('morning');
= Good Morning Victor

However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

 */
function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet: function(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

let helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

/*The problem is that it didn't use this keyword to access the properties of the object returned by the createGreeter function. */

/* 2. Buggy Code 2

A grocery store uses a JavaScript function to calculate discounts on various items. They are testing out various percentage discounts but are getting unexpected results. Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function. Then, modify the code so that it produces the correct results.
 */

console.log('\nExercise 2: ');

let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let total = this.price - discount;
    
    return total;
  },
};

console.log(item.discount(20))   // should return 40
console.log(item.discount(50))   // should return 25
console.log(item.discount(25))   // should return 37.5

/* 3. Testing Object Equality

In JavaScript, comparing two objects either with == or === checks for object identity. In other words, the comparison evaluates as true if it's the same object on either side of == or ===. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

Futher Exploration

A limitation of this function is that it doesn't look for deep equality. In other words, if one of the values is an object in both objects, this will return false unless that object is identical on both objects.
*/
console.log('\nExercise 3: ');

function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keyMatch(a, b) && valueMatch(a,b));
}

function keyMatch(a,b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valueMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => {
    if (typeof a[key] === 'object') {
      return keyMatch(a[key], b[key]);
    }
    return a[key] === b[key]
  });
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false 
console.log(objectsEqual({a: 'foo', c: 1, obj: {hello: 'goodbye'}}, {a: 'foo', c: 1, obj: {hello: 'goodbye'}}));  // true 

/* 4. Student

Create an object factory for a student object. The student object should have the following methods and it should produce the expected results demonstrated in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.


 */
console.log('\nExercise 4: ');

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],//name, code, note

    info() {
      console.log(`${this.name} is a ${this.year} student`);
    },

    addCourse(course) {
      //addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
      this.courses.push(course);
    },

    listCourses() {
      //listCourses: Returns a list of the courses student has enrolled in.
      return this.courses;
    },

    addNote(code, content) {
      //addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, the note is appended to the existing one.

      let idxCourse = this.courses.indexOf(this.courses.filter(course => course.code === code)[0]);
      let currentCourse = this.courses[idxCourse];

      if (currentCourse.note) {
        currentCourse.note += `; ${content}`;
      } else {
        currentCourse.note = content;
      }      
    },

    updateNote(code, content) {
      //updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
      let idxCourse = this.courses.indexOf(this.courses.filter(course => course.code === code)[0]);
      this.courses[idxCourse].note = content;
    },

    viewNotes() {
      //viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.
      //iterate over the courses array.
      this.courses.forEach(course => {
        if(course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
      //for each element of the array log course name and course notes
    }
  }
}

let foo4 = createStudent('Foo', '1st');
foo4.info();
// "Foo is a 1st year student"
console.log(foo4.listCourses());
// [];
foo4.addCourse({ name: 'Math', code: 101 });
foo4.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo4.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo4.addNote(101, 'Fun course');
foo4.addNote(101, 'Remember to study for algebra');
foo4.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo4.addNote(102, 'Difficult subject');
foo4.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo4.updateNote(101, 'Fun course');
foo4.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"

/* 5. School

Create a school object. The school object uses the student object from the previous exercise. 
It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the school object. Implement the following methods for the school object:

addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.


To test your code, use the three student objects listed below. Using the three student objects, produce the following values from the getReportCard and courseReport methods respectively.
foo;
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}
bar;
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

qux;
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}



*/
const school = {
  students: [],
  
  addStudent(name, year) {
    //Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".

    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log(`Invalid Year`);
    }
  },

  enrollStudent(student, courseName, courseCode) {
    //Enrolls a student in a course.
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade(student, courseCode, grade) {
    //Adds the grade of a student for a course.
    let courseToGrade = student.listCourses().filter(course => course.code === courseCode)[0];
    if (courseToGrade) {
      courseToGrade.grade = grade;
    }
  },

  getReportCard(student) {
    //Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
    console.log(`\nReport Card of ${student.name}:`);
    student.listCourses().forEach(course => {
        console.log(`${course.name}: ${course.grade ? course.grade : 'In progress'}`);
    });
  },

  courseReport(courseName) {
    //Logs the grades of all students for a given course name. Only student with grades are part of the course report.
    function getCourse(student, courseName) {
      return student.listCourses().filter(course => course.name === courseName)[0];
    }

    let courseStudents = this.students.map(student => {
      let course = getCourse(student, courseName) || {grade: undefined};
      return {name: student.name, grade: course.grade };
    }).filter(student => student.grade); //aquí map trasnforma el array de objetos  para que solo figure nombre y nota del alumno

    if (courseStudents.length > 0) {
      console.log(`\n=${courseName} grades=`);

      let average = courseStudents.reduce((total, student) => {
        console.log(`${student.name}: ${String(student.grade)}`);
        return total + student.grade;}, 0) / courseStudents.length; //aqui dentro de la funcion reduce pasamos como argumento el objeto student para luego poder mostrar nombre: nota y luego sumar student.grade. para calcular la media.

      console.log('----');
      console.log(`Course Average: ${String(average)}`);
    }    
  }
}

console.log('\n Exercise 5: ');

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 101, 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress
school.getReportCard(bar);
school.getReportCard(qux);

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
//undefined