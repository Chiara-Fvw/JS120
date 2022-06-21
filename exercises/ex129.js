function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    

    info() {
      //logs the name and year of hte student
      console.log(`${this.name} is a ${this.year} student`);
    },
    addCourse(course) {
      //Enrolls student in a course. A course is an object literal that has properties for its name and code.
      this.courses.push(course);
    },
    listCourses() {
      //Returns a list of the courses student has enrolled in.
      return this.courses;
    },
    addNote(courseCode, note) {
      //Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, the note is appended to the existing one. Iterate all the objects and check if there is one with property 
      let current = this.courses.filter(course => course.code === courseCode)[0];

      if (current.note) {
        current.note += '; ' + note;
      } else {
        current.note = note;
      }
    },

    updateNote(courseCode, note) {
      //Updates a note for a course. Updating a note replaces the existing note with the new note.
      this.courses.filter(course => course.code === courseCode)[0].note = note;
    },

    viewNotes() {
      //Logs the notes for all the courses. Courses without notes are not displayed.
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      })
    },
  }
  
}

let school = {
  students: [],

  addStudent(name, year) {
    //Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log("Invalid Year");
      return false;
    }
    let student = createStudent(name, year);
    this.students.push(student);
    return student;
  },

  enrollStudent(student, course) {
    //Enrolls a student in a course.  
    student.addCourse(course);
  },
  
  addGrade(student, courseCode, grade) {
    //Adds the grade of a student for a course.
    let course = student.listCourses().filter(course => course.code === courseCode)[0];

    if (course) {
      course.grade = grade;
    }
  },
  
  getReportCard(student) {
    //Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
    student.listCourses().forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    })
  },

  courseReport(courseName) {
    //Logs the grades of all students for a given course name. Only student with grades are part of the course report.
    //iterate all students and check if they have the course:
    //if yes log to console.

    let grades = [];
    this.students.forEach(student => {
      let studentCourse = student.courses.filter(course => course.name === courseName)[0];
      if (studentCourse && studentCourse.grade) {
        grades.push([student.name, studentCourse.grade]);
      }
    }) 
    if (grades.length > 0) {
      let average = grades.map(entry => entry[1]).reduce((num, cur) => num + cur, 0) / grades.length;
      console.log(`= ${courseName} =`);
      grades.forEach(entry => console.log(`${entry[0]}: ${entry[1]}`));
      console.log('---');
      console.log(`Course average: ${average} \n`);
    } 
    
  },
}

let foo = school.addStudent('Foo', '3rd');
let bar = school.addStudent('bar', '1st');
let qux = school.addStudent('qux', '2nd');

school.enrollStudent(foo, { name: 'Math', code: 101 });
school.enrollStudent(foo, { name: 'Advanced Math', code: 102 });
school.enrollStudent(foo, { name: 'Physics', code: 202, })
school.enrollStudent(bar, { name: 'Math', code: 101, });
school.enrollStudent(qux, { name: 'Math', code: 101,});
school.enrollStudent(qux, { name: 'Advanced Math', code: 102,});

school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);
school.addGrade(bar, 101, 91);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);

school.getReportCard(qux);
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');