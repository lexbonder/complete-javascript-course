// // Let and Const

// // ES5 variables will end with 5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';

// // console.log(name5); // 'Jane Miller'

// // ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// // name6 = 'Jane Miller'; // can't do this

// // console.log(name6); // Error, cannot reassign const variable;

// // ES5
// function driversLicense5(passedTest) {
//   if (passedTest) {
//     var firstName = 'John';
//     var yearOfBirth = 1990;
//   }
//   // console.log(`${firstName}, born in ${yearOfBirth}. Allowed to drive a car`);
// }

// driversLicense5(true);

// // ES6

// function driversLicense6(passedTest) {
//   let firstName;
//   const yearOfBirth = 1990;
//   if (passedTest) {
//     firstName = 'John';
//   }
//   // console.log(`${firstName}, born in ${yearOfBirth}. Allowed to drive a car`);
// }

// driversLicense6(true);

// let i = 23;

// for (let i = 0; i < 5; i++) {
//   // console.log(i);
// }

// // console.log(i);

// ///////////////////////////////////
// // Blocks and IIFEs

// // ES6 Block used with let and const keeps data privacy
// {
//   const a = 1;
//   let b = 2;
//   var c = 3;
// }

// // console.log(a); // Undefined
// // console.log(b); // Undefined
// // console.log(c); // 3 (not block scoped)

// ///////////////////////////////////
// // Strings

// let firstName = 'John';
// let lastName = 'Smith';
// const yearOfBirth = 1990;

// function calcAge(year) {
//   return 2019 - year;
// }

// // ES5
// // console.log(firstName + ' ' + lastName + ' was born in ' + yearOfBirth + '. He is ' + calcAge(yearOfBirth) + ' years old.');

// // ES6
// // console.log(`${firstName} ${lastName} was born in ${yearOfBirth}. He is ${calcAge(yearOfBirth)} years old.`);

// const n = `${firstName} ${lastName}`;

// // console.log(n.startsWith('J'));
// // console.log(n.endsWith('h'));
// // console.log(n.includes('hn Sm'));
// // console.log(`${firstName} `.repeat(5));

// ///////////////////////////////////
// // Arrow Functions

// const years = [1990, 1989, 1979, 1994];

// // ES5
// const ages5 = years.map(function(year) {
//   return 2019 - year;
// });
// // console.log(ages5);

// // ES6 (arrow and implicit return)
// let ages6 = years.map(year => 2019 - year);
// // console.log(ages6);

// ages6 = years.map((year, i) => `Age ${i + 1}: ${2019 - year}`);

// ages6 = years.map((year, i) => {
//   const now = new Date().getFullYear();
//   const age = now - year;

//   return `Age ${i + 1}: ${age}`;
// });
// // console.log(ages6);

// //////////////////////////////////////////////
// // Arrow Functions - Lexical 'this' variable

// // ES5
// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', function() {
//       // console.log(
//         // 'You done clicked the ' +
//           // self.color +
//           // ' box in position ' +
//           // self.position
//       // );
//     });
//   },
// };

// // box5.clickMe();

// // ES6
// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     // Arrow here sets context of this to window,.
//     document.querySelector('.green').addEventListener('click', () => {
//       // console.log(
//         // 'You done clicked the ' +
//           // this.color +
//           // ' box in position ' +
//           // this.position
//       // );
//     });
//   },
// };

// // box6.clickMe();

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(function(friend) {
//     return this.name + ' is friends with ' + friend;
//   }.bind(this));

//   // console.log(arr);
// };

// var friends5 = ['Bob', 'Jane', 'Mark'];

// // new Person('John').myFriends5(friends5);

// // ES6

// Person.prototype.myFriends6 = function(friends) {
//   const arr6 = friends.map(friend => `${this.name} is friends with ${friend}`);
//   // console.log(arr6);
// };

// const friends6 = ['Bob', 'Jane', 'Mark'];

// new Person('Mike').myFriends6(friends6);

// //////////////////////////////////////////////
// // Destructuring

// // ES5

// // var john = ['John', 26];
// // var name = john[0];
// // var age = john[1];

// // ES6

// const [name, age] = ['John', 26];
// // console.log(name); // 'John'
// // console.log(age); // 26

// const obj = {
//   firstName: 'John',
//   lastName: 'Smith'
// }

// const {firstName2, lastName2} = obj; // variable names same as keys

// const {firstName: a, lastName: b} = obj; // new names for variables
// // a = 'John'
// // b = 'Smith'

// function calcAgeRetirement(year) {
//   const age = new Date().getFullYear() - year;
//   return [age, 65 - age];
// }

// const [age2, retirement] = calcAgeRetirement(1990);
// // console.log(age2); // 29
// // console.log(retirement); // 36

// ////////////////////////////////////////////
// // Arrays

// const boxes = document.querySelectorAll('.box');

// // ES5

// var boxesArray5 = Array.prototype.slice.call(boxes);
// boxesArray5.forEach(function(cur) {
//   cur.style.backgroundColor = 'dodgerblue';
// });

// // ES6 - Array.from()

// const boxesArray6 = Array.from(boxes)
// boxesArray6.forEach(curr => (curr.style.backgroundColor = 'dodgerBlue'));

// //////////////////////////////
// // Loops

// // ES5

// // for (var i = 0; i < boxesArray5.length; i++) {
// //   if (boxesArray5[i].className === 'box blue') {
// //     continue;
// //   }

// //   boxesArray5[i].textContent = 'I changed to blue!'
// // }

// // ES6 - for .. of ..

// for (curr of boxesArray6) {
//   if (curr.className.includes('blue')) continue;
//   curr.textContent = 'I changed to blue!';
// }

// ////////// Finding Elements in an array;

// // ES5
// var ages = [12, 17, 8 , 21, 14, 11];

// full5 = ages.map(age => age >= 18);
// console.log(full5);
// console.log(full5.indexOf(true));
// console.log(ages[full5.indexOf(true)]);

// // ES6 - Array.findIndex, Array.find

// console.log(ages.findIndex(curr => curr >= 18));

// const adult = ages.find(age => age >= 18);
// console.log(adult);

// /////////////////////////////
// // Spread Operator

// function addFourAges(a, b, c, d) {
//   return a + b + c + d;
// }

// const sum1 = addFourAges(1,2,3,4)

// // console.log(sum1);

// // ES5

// var ages5 = [1,2,3,4]
// var sum2 = addFourAges.apply(null, ages5);
// // apply lets you define the 'this' variable and takes an array as its arguments. so ages gets spread into the function's parameters.
// // console.log(sum2);

// // ES6

// const ages6 = [1,2,3,4]
// const sum3 = addFourAges(...ages6);
// // console.log(sum3);

// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Jill', 'Jack', 'Mike'];
// const bigFamily = [...familySmith, 'Stephen', ...familyMiller];
// console.log(bigFamily);

// const heading = document.querySelector('h1'); // Single node
// const boxes = document.querySelectorAll('.box'); // NodeList
// const elements = [heading, ...boxes];
// console.log(elements);

// elements.forEach(el => el.style.color = 'purple')

/////////////////////////////
// Rest Parameters

// ES5

// function isFullAge5() {
//   // Arguments is an array-like structure
//   var argsArray5 = Array.prototype.slice.call(arguments);
//   argsArray5.forEach(function(arg) {
//     console.log(2019 - arg >= 18);
//   });
// }

// // isFullAge5(1990, 2003, 1965, 2016, 1987);

// ES6

// function isFullAge6(...years) { // Rest parameter puts arguments into an Array
//   years.forEach(year => console.log(2019 - year >= 18));
// }

// // isFullAge6(1990, 2003, 1965, 2016, 1987);

/////////////////////

// ES5

// function isFullAge5(limit) {
//   // Arguments is an array-like structure
//   var argsArray5 = Array.prototype.slice.call(arguments, 1); // ',1' to skip limit, which beomes part of arguments array
//   argsArray5.forEach(function (arg) {
//     console.log(2019 - arg >= limit);
//   });
// }

// isFullAge5(16, 1990, 2003, 1965, 2016, 1987);

// // ES6

// function isFullAge6(limit, ...years) { // Rest parameter doesn't need extra steps for parameters
//   years.forEach(year => console.log(2019 - year >= limit));
// }

// isFullAge6(16, 1990, 2003, 1965, 2016, 1987);

// function SmithPerson5(firstName, yearOfBirth, lastName, nationality) {

//   this.firstName = firstName;
//   this.lastName = lastName || 'Smith';
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality || 'American';
// }

// var john5 = new SmithPerson5('John', 1989);
// console.log(john);
// var emily5 = new SmithPerson5('Emily', 1983, 'Diaz', 'Spanish');
// console.log(emily);

// // ES6

// function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {

//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality;
// }

///////////////////////////////////////
// Maps - New ES6, key value data structure
// - maps can use any value as keys

// const question = new Map();
// question.set('question', 'What is the official name of the lastest major JS version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct Answer');
// question.set(false, 'Wrong, Try again');

// console.log(question.get('question'));
// // console.log(question.size);

// if (question.has(4)) {
//   // question.delete(4);
//   // console.log('yuppp key 4 exists');

// }

// // question.clear()

// question.forEach((value, key) => {
//   // console.log(`this is the ${key}, the value is ${value}`)
// })

// // .entries returns an array ([key, value]) using array destructuring (found after 'let' it saves the key and value into variables)
// for (let [key, value] of question.entries()) {
//   if (typeof key === 'number') {
//     console.log(`Answer ${key}: ${value}`)
//   }
// }

// const answer = parseInt(prompt('Write the correct answer'));

// console.log(question.get(answer === question.get('correct')));

//////////////////////////////
// Classes

// // ES5

// var Person5 = function(name, year, job) {
//   this.year = year;
//   this.name = name;
//   this.job = job;
// }

// Person5.prototype.calcAge = function() {
//   var age = new Date().getFullYear() - this.year;
//   console.log(age);
// }

// var john5 = new Person5('John', 1990, 'Teacher');

// // ES6

// class Person6 {
//   constructor(name, year, job) {
//     this.name = name;
//     this.year = year;
//     this.job = job;
//   }

//   calcAge() {
//     const age = new Date().getFullYear() - this.year;
//     console.log(age);
//     console.log(this);
//   }

//   static greeting() { // method on the parent class. not passed to instances...
//     // not widely used, but possible.
//     console.log('Yo dawg');
//   }
// }

// const frank = new Person6('Frank', 1999, 'Teacher');

//////////////////////////////
// Sub-classes

// var Person5 = function(name, year, job) {
//   this.year = year;
//   this.name = name;
//   this.job = job;
// }

// Person5.prototype.calcAge = function () {
//   var age = new Date().getFullYear() - this.year;
//   console.log(age);
// }

// var Athlete5 = function (name, year, job, games, medals) {
//   Person5.call(this, name, year, job);
//   this.games = games;
//   this.medals = medals;
// }

// Athlete5.prototype = Object.create(Person5.prototype);

// Athlete5.prototype.wonMedal = function() {
//   this.medals++;
//   console.log(this.medals);
// }

// var johnAthlete5 = new Athlete5('John', 1990, 'Swimmer', 3, 10);

// johnAthlete5.calcAge()
// johnAthlete5.wonMedal()

// // ES6

// class Person6 {
//   constructor(name, year, job) {
//     this.name = name;
//     this.year = year;
//     this.job = job;
//   }

//   calcAge() {
//     const age = new Date().getFullYear() - this.year;
//     console.log(age);
//   }
// }

// class Athlete6 extends Person6{
//   constructor(name, year, job, games, medals) {
//     super(name, year, job);
//     this.games = games;
//     this.medals = medals;
//   }

//   wonMedal() {
//     this.medals++
//     console.log(this.medals);
//   }
// }

// const johnAthlete6 = new Athlete6('John', 1989, 'runner', 5, 20);

// johnAthlete6.calcAge()
// johnAthlete6.wonMedal()

/////////////////////////////////////
// Coding Challenge

class TownElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends TownElement {
  constructor(name, buildYear, area, numTrees) {
    super(name, buildYear);
    this.numTrees = numTrees;
    this.area = area;
  }

  treeDensity() {
    const density = this.numTrees / this.area;
    console.log(
      `${this.name} has a tree density of ${density} trees per sqare km.`
    );
  }
}

class Street extends TownElement {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');

    console.log(
      `${this.name}, built in ${this.buildYear}, is a ${classification.get(
        this.size
      )} street`
    );
  }
}

const parks = [
  new Park('Green Park', 1987, 0.2, 215),
  new Park('National Park', 1894, 2.9, 3541),
  new Park('Oak Park', 1953, 0.4, 949),
];

const streets = [
  new Street('Ocean Avenue', 1999, 1.1, 4),
  new Street('Evergreen Street', 2008, 2.7, 2),
  new Street('4th Street', 2015, 0.8),
  new Street('Sunset Boulevard', 1982, 2.5, 5),
];

function getSumAvg(arr) {
  const sum = arr.reduce((sum, el) => sum + el, 0);
  return [sum, sum / arr.length];
}

(function reportParks(p) {
  console.log('--- Parks Report ---');
  p.forEach(park => park.treeDensity());

  const ages = p.map(park => new Date().getFullYear() - park.buildYear);
  const [totalAge, avgAge] = getSumAvg(ages);
  console.log(`Our ${p.length} parks have an average age of ${avgAge} years`);

  const i = p.map(park => park.numTrees).findIndex(num => num >= 1000);
  console.log(`${p[i].name} has more than 1000 trees`);
})(parks);

(function reportStreets(s) {
  console.log('--- Streets Report ---');
  
  const streetLengths = s.map(street => street.length);
  const [totalLength, avgLength] = getSumAvg(streetLengths);
  console.log(
    `Our ${
      s.length
    } streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`
  );

  s.forEach(street => street.classifyStreet());
})(streets);
