///////////////////////////////////////
// Lecture: Hoisting

// Functions /////////

// In creation phase - function DECLARATIONS get stored into variables and get hoisted to the top

// calculateAge(1979);

// function calculateAge(year) {
//   console.log(2018 - year);
// }

// // In creation phase - function EXPRESSIONS are not hoisted!!

// // retirement(1989) // retirement is not defined (yet!)

// const retirement = function(year) {
//   console.log(65 - (2018 - year));
// };

// // Variables ////////////

// // console.log(age); // undefined
// // var variable, variable name declaration gets hoisted, value assignment does not get hoisted

// // console.log(otherAge); // otherAge is not defined

// // console.log(youngAge); // youngAge is not defined

// // let/const variable, nothing gets hoisted.

// var age = 29;
// // let otherAge = 30;
// // const youngAge = 6;

// console.log(age); // 29

// function foo() {
//   var age = 65;
//   console.log(age); // 65
// }
// foo();
// console.log(age); // 29

///////////////////////////////////////
// Lecture: Scoping

// Scoping - Where can we access a certain variable
// Each function creates a scope (function scoped)
// Lexical Scoping - Where something is written in the code

// First scoping example - functions can look up, not down.

/*
var a = 'Hello!';
first();

function first() {
  var b = 'Hi!';
  second();

  function second() {
    var c = 'Hey!';
    console.log(a + b + c);
  }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

// Regular function call - This points to the window (default)

// Method Call - function on an object - This points to the object calling the method.

// dog.bark() ==> this === dog

// Value of 'this' is not assigned until function is called

///////////////////
// Examples///////
/////////////////

// console.log(this) // Window

// function calculateAge(year) {
//   console.log(2016 - year);
//   console.log(this); // Window - not a method
// }
// calculateAge(1989);

const john = {
  name: 'John',
  year: 1989,
  logThis: function() {
    console.log(this); // john object - method on an object
    function innerFunction() {
      console.log(this); // Window - not a method on the john object
    }
    innerFunction();
  },
};

john.logThis();

const mike = {
  name: 'Mike',
  yearOfBirth: 1985
}

mike.logThis = john.logThis // method borrowing

mike.logThis() // Logs mike object because context of 'this' becomes part of mike object
