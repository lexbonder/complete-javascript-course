// Let and Const

// ES5 variables will end with 5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';

// console.log(name5); // 'Jane Miller'

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
// name6 = 'Jane Miller'; // can't do this

// console.log(name6); // Error, cannot reassign const variable;

// ES5
function driversLicense5(passedTest) {
  if (passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }
  // console.log(`${firstName}, born in ${yearOfBirth}. Allowed to drive a car`);
}

driversLicense5(true);

// ES6

function driversLicense6(passedTest) {
  let firstName;
  const yearOfBirth = 1990;
  if (passedTest) {
    firstName = 'John';
  }
  // console.log(`${firstName}, born in ${yearOfBirth}. Allowed to drive a car`);
}

driversLicense6(true);

let i = 23;

for (let i = 0; i < 5; i++) {
  // console.log(i);
}

// console.log(i);

///////////////////////////////////
// Blocks and IIFEs

// ES6 Block used with let and const keeps data privacy
{
  const a = 1;
  let b = 2;
  var c = 3;
}

// console.log(a); // Undefined
// console.log(b); // Undefined
// console.log(c); // 3 (not block scoped)

///////////////////////////////////
// Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
  return 2019 - year;
}

// ES5
// console.log(firstName + ' ' + lastName + ' was born in ' + yearOfBirth + '. He is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
// console.log(`${firstName} ${lastName} was born in ${yearOfBirth}. He is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;

// console.log(n.startsWith('J'));
// console.log(n.endsWith('h'));
// console.log(n.includes('hn Sm'));
// console.log(`${firstName} `.repeat(5));

///////////////////////////////////
// Arrow Functions

const years = [1990, 1989, 1979, 1994];

// ES5
const ages5 = years.map(function(year) {
  return 2019 - year;
});
// console.log(ages5);

// ES6 (arrow and implicit return)
let ages6 = years.map(year => 2019 - year);
// console.log(ages6);

ages6 = years.map((year, i) => `Age ${i + 1}: ${2019 - year}`);

ages6 = years.map((year, i) => {
  const now = new Date().getFullYear();
  const age = now - year;

  return `Age ${i + 1}: ${age}`;
});
// console.log(ages6);

//////////////////////////////////////////////
// Arrow Functions - Lexical 'this' variable

// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector('.green').addEventListener('click', function() {
      console.log(
        'You done clicked the ' +
          self.color +
          ' box in position ' +
          self.position
      );
    });
  },
};

// box5.clickMe();

// ES6
const box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    // Arrow here sets context of this to window,.
    document.querySelector('.green').addEventListener('click', () => {
      console.log(
        'You done clicked the ' +
          this.color +
          ' box in position ' +
          this.position
      );
    });
  },
};

// box6.clickMe();

function Person(name) {
  this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(friend) {
    return this.name + ' is friends with ' + friend;
  }.bind(this));

  // console.log(arr);
};

var friends5 = ['Bob', 'Jane', 'Mark'];

// new Person('John').myFriends5(friends5);

// ES6

Person.prototype.myFriends6 = function(friends) {
  const arr6 = friends.map(friend => `${this.name} is friends with ${friend}`);
  console.log(arr6);
};

const friends6 = ['Bob', 'Jane', 'Mark'];

new Person('Mike').myFriends6(friends6);
