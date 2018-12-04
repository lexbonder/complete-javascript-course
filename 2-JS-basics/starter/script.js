/*****************
 * Block comments
 */
// Inline comments //

/*
const firstName = 'John';
console.log(firstName); // 'John'

const lastName = 'Smith';
const age = 28;
const adult = true;

console.log(adult); // true

let job;

console.log(job); // undefined

job = 'Teacher';

console.log(job); // 'Teacher'

const _3years = 3; // starting with an Underscore is ok
const johnMark = 'John and Mark'; // starting with a letter is ok

// Cannot start with numbers or reserved words
*/

/************************************
 * Variable Mutation and Type Coersion
 */

/*
let firstName = 'John';
let age = 29;

// Type Coersion
console.log(firstName + ' ' + age);

let job, isMarried;
job = 'Teacher';
isMarried = false;

console.log(
  `${firstName} is a ${age} year old ${job}. Is he married? ${isMarried}`
);

// Variable Mutation
age = 'Twenty Nine';
job = 'Driver';

alert(
  `${firstName} is a ${age} year old ${job}. Is he married? ${isMarried}`
);

let lastName = prompt('What is his last name?')

console.log(firstName + ' ' + lastName);

*/

/************************************
 * Basic Operators
 */
/*
// Math Operators
let now, ageJohn, ageMark, yearJohn, yearMark;
now = 2018;
ageJohn = 29;
ageMark = 33;
yearJohn = now - ageJohn;
yearMark = now - ageMark;

console.log(yearJohn);
console.log(now + 2);
console.log(now * 2);
console.log(now / 10);

// Logical Operators
let johnOlder = ageJohn > ageMark; // false
// let johnOlder = ageJohn < ageMark; // true

// typeof Operator
console.log(typeof 2) // number
console.log(typeof false) // boolean
console.log(typeof 'word') // string
let x;
console.log(typeof x) // undefined
*/

/************************************
 * Operator Precedence
 */

/*
let now = 2018;
let yearAlex = 1989;
let fullAge = 18;

let isFullAge = now - yearAlex >= fullAge; // true
// Operator Precedence Table: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

let x, y;
x = y = (3 + 5) * 4 - 6; // 8 * 4 - 6 // 32 - 6 // 26 // (assigns 26 to y) // (assigns y(26) to x)

// More Operators

x *= 2 // x = x * 2 (also works with +, -, /)
x ++ // x = x + 1 (also works with --)
*/

/************************************
* Code Challenge

* BMI = mass / height^2

1. Store Mark's and John's mass and height in variables.
2. Calculate both of their BMIs
3. Create a boolean variable containing information of whether Mark has a Higher BMI than John.
4. Printo to the console containing variable from step 3 (Is Mark's BMI Higher than John's? true)
*/
/*
let heightMark, heightJohn, massMark, massJohn, bmiMark, bmiJohn;

massMark = 90
heightMark = 1.5
bmiMark = massMark / heightMark ** 2;

massJohn = 92
heightJohn = 1.8
bmiJohn = massJohn / heightJohn ** 2;

console.log(`Is Mark's BMI Higher than John's? ${bmiMark > bmiJohn}`)
*/

/************************************
 * Ternary Operator and Switch Statements
 */
/*
// Ternary
let firstName = 'John';
let age = 16;

let drink = age >= 21 ? 'beer' : 'juice';

console.log(firstName + ' drinks ' + drink);

// Switch
let job = 'teacher';

switch (job) {
  case 'teacher':
  case 'instructor': // Can add multiple cases to one result!!!!
    console.log(`${firstName} teaches kids to code`);
    break;
  case 'driver':
    console.log(`${firstName} drives an uber`);
    break;
  case 'designer':
    console.log(`${firstName} makes websites`);
    break;
  default:
    console.log(`${firstName} does random stuff.`);
}

switch (true) { // setting switch(true) is a way to auto fire a switch statement
  case age < 13:
    console.log(`${firstName} is a child`);
    break;
  case age >= 13 && age < 20:
    console.log(`${firstName} is a teen`);
    break;
  default:
    console.log(`${firstName} is an adult`);
}
*/

/************************************
 * Truthy and Falsy Values
 */

// Falsy values: undefined, null, 0, '', NaN

// Type coersion loosely equal (==)

// 2 == '2' // true
// 2 === '2' // false

/************************************
* Code Challenge

* John's last 3 games scored 89, 120, 103
* Mike's last 3 games scored 116, 94, 123
* Mary's last 3 games scored 130, 86, 90

1. calculate average for each team
2. print winning team and their average
3. change scores add edge case for ties
4. add 3rd team, same exercise
*/
/*
let johnAvg = (89 + 120 + 103) / 3;
let mikeAvg = (116 + 94 + 123) / 3;
let johnAvg = (130 + 86 + 110) / 3;

switch (true) {
  case johnAvg > mikeAvg && johnAvg > maryAvg:
    console.log(`John's team has the highest avg, ${johnAvg}.`);
    break;
  case mikeAvg > johnAvg && mikeAvg > maryAvg:
    console.log(`Mike's team has the highest avg, ${mikeAvg}.`);
    break;
  case maryAvg > johnAvg && maryAvg > mikeAvg:
    console.log(`Marh's team has the highest avg, ${maryAvg}.`);
    break;
  case johnAvg === mikeAvg && johnAvg > maryAvg:
    console.log(
      `John's and Mike's teams tied with the highest average of ${johnAvg}`
    );
    break;
  case johnAvg === maryAvg && johnAvg > mikeAvg:
    console.log(
      `John's and Mary's teams tied with the highest average of ${johnAvg}`
    );
    break;
  case mikeAvg === maryAvg && mikeAvg > johnAvg:
    console.log(
      `Mike's and Mary's teams tied with the highest average of ${mikeAvg}`
    );
    break;
  default:
    console.log(
      `Would you believe it? Everyone tied with an avg of ${johnAvg}`
    );
};
*/

/***********************
 * Function Statements and Expressions
 */

// Function Declaration
// function whatDoYouDo() {}

/*
// Function Expression
const whatDoYouDo = function(job, firstName) {
  switch (job) {
    case 'teacher':
      return `${firstName} teaches`;
    case 'driver':
      return `${firstName} drives`;
    case 'designer':
      return `${firstName} designs`;
    default:
      return `${firstName} does whatver`;
  }
};

console.log(whatDoYouDo('teacher', 'John'))

// Expressions always produce an immediate value/result

// Statements produce actions which may lead to a value eventually (when things return undefined)
*/

/***********************
 * Arrays
 */
/*
// Initialize Array
const names = ['John', 'Mark', 'Jane'];
const years = new Array(1990, 1969, 1948);

// Mutate Array
names[1] = 'Ben';
names[names.length] = 'Mary'; // Same as names.push('Mary')

// Array Methods
names.push('Tim');
names.unshift('Harry');
names.pop();
names.shift();

console.log(names.indexOf('Mary'));

console.log(names);
*/

/************
* Code Challenge

Bills 124, 48, 268
Tip calculator
  if bill < $50, tip 20%
  if bill < $200, tip 15%
  if bill > $200, tip 10%

1. make array of bills
2. get array of tips
3. get array of total payments
*/
/*
const bills = [124, 48, 268];

const getTipAmount = (bill) => {
  if (bill < 50) {
    return bill * .2;
  } else if (bill >= 50 && bill < 200) {
    return bill * .15;
  } else {
    return bill * .1;
  }
}

//const tips = [getTipAmount(bills[0]), ...]
//const totals = [bills[0] + tips[0], ...]

const tips = bills.map(bill => getTipAmount(bill));
const totals = bills.map((bill, index) => {
  return bill + tips[index];
})

console.log(bills)
console.log(tips)
console.log(totals)
*/

/************
 * Objects and properties
 */

/*
const john = {
  firstName: 'John',
  lastName: 'Smith',
  birthYear: 1989,
  family: ['Jane', 'Mark', 'Bob', 'Emily'],
  job: 'Teacher',
  isMarried: false,
};

// Dot notation
console.log(john.firstName);
// Bracket notation
console.log(john['firstName']);
let x = 'birthYear';
console.log(john[x]);

// Mutation
john.job = 'Driver';
john[isMarried] = true;

// Creation
const jane = new Object();
jane.name = 'Jane';
jane.birthYear = 1989;
jane['lastName'] = 'Darwin';
*/

/************
 * Coding Challenge
 */

/******************
* How I would do this with DRY method.

class Person {
  constructor(fullName, height, mass) {
    this.fullName = fullName;
    this.height = height;
    this.mass = mass;
  }

  calcBMI() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  };
}

const james = new Person('James Earl Jones', 1.1, 95)
james.calcBMI()
console.log(james);
*/
/*
const john = {
  fullName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
const mark = {
  mass: 78,
  height: 1.69,
  calcBMI: function() {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

if (john.calcBMI() > mark.calcBMI()) {
  console.log(`John has the higher BMI of ${john.bmi}`);
} else if (mark.calcBMI() > john.calcBMI()) {
  console.log(`Mark has the higher BMI of ${mark.bmi}`);
} else {
  console.log(`Mark and John have the same BMI ${john.bmi}`);
}
*/

/*****************************
 * Loops and Iteration
 */
/*
// For Loop
for (let i = 1; i <= 20; i += 2) {
  console.log(i);
}

const john = ['John', 'Smith', 1990, 'designer', false];

for (let i = 0; i < john.length; i++) {
  console.log(john[i]);
}

// While Loop
let i = 0;
while (i < john.length) {
  console.log(john[i]);
  i++;
}

// continue and break statements
const john = ['John', 'Smith', 1990, 'designer', false];

for (let i = 0; i < john.length; i++) {
  if (typeof john[i] !== 'string') continue; // skips the one step in the loop
  console.log(john[i]);
}

for (let i = 0; i < john.length; i++) {
  if (typeof john[i] !== 'string') break; // exits the loop
  console.log(john[i]);
}

// Looping Backwards
for (let i = john.length - 1; i >= 0; i--) {
  console.log(john[i]);
}
*/

/*****************************
 * Code Challenge
 */
/*
const john = {
  bills: [124, 48, 268, 180, 42],
  calcTip: function() {
    this.tips = [];
    this.totals = [];

    for (let i = 0; i < this.bills.length; i++) {
      let bill = this.bills[i];
      let percentage;

      if (bill < 50) {
        percentage = 0.2;
      } else if (bill >= 50 && bill < 200) {
        percentage = 0.15;
      } else {
        percentage = 0.1;
      }

      let tip = bill * percentage;
      this.tips[i] = tip;
      this.totals[i] = bill + tip;
    }
  },
};

john.calcTip();
console.log(john);

const mark = {
  bills: [77, 375, 110, 45],
  calcTip: function() {
    this.tips = [];
    this.totals = [];

    for (let i = 0; i < this.bills.length; i++) {
      let bill = this.bills[i];
      let percentage;

      if (bill < 100) {
        percentage = 0.2;
      } else if (bill >= 100 && bill < 300) {
        percentage = 0.1;
      } else {
        percentage = 0.25;
      }

      let tip = bill * percentage;
      this.tips[i] = tip;
      this.totals[i] = bill + tip;
    }
  },
};

mark.calcTip();
console.log(mark);

function calcAvg(tips) {
  let sum = 0;
  for (let i = 0; i < tips.length; i++) {
    sum += tips[i];
  }
  return sum / tips.length;
}

john.tipAvg = calcAvg(john.tips);
mark.tipAvg = calcAvg(mark.tips);

if (mark.tipAvg > john.tipAvg) {
  console.log(`Mark's family tips better`);
} else if (john.tipAvg > mark.tipAvg) {
  console.log(`John's family tips better`);
} else {
  ('Both families tip the same');
}
*/
