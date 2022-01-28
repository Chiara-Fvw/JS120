class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  static getDescription() {
    return 'A rectangle is a shape with 4 sides';
  }

  getArea() {
    return this.length * this.width;
  }
}

console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides

let obj = new Rectangle(4, 6);

console.log(obj);
console.log(obj.getArea());
console.log(Object.getPrototypeOf(obj) === Rectangle.prototype);
console.log(obj.getDescription());
