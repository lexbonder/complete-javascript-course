// Function Constructor

/*
const Person = function(name, year, job) {
  this.name = name;
  this.year = year;
  this.job = job;
};

Person.prototype.calculateAge = function() {
  console.log(2018 - this.year);
};

Person.prototype.lastName = 'Smith';

const john = new Person('John', 1989, 'Teacher');
const jane = new Person('Jane', 1920, 'Actor');
const mark = new Person('Mark', 2002, 'Student');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

console.log(Person)

// console.info() <-- shows detailed version of whatever is console logged

*/

/*
// Object.create

const personProto = {
  calculateAge: function() {
    console.log(2018 - this.birthYear);
  }
}

const john = Object.create(personProto);
john.name = "John";
john.birthYear = 1989;
john.job = "Teacher";

const jane = Object.create(personProto, {
  name: { value: 'Jane'},
  birthYear: { value: 1988},
  job: { value: "Carpenter"}
})

////// ProtoType Chain /////////////////
// With Constructor Function
  // instance => constructor => object
// With Object.create
  // instance => object
    // Saves space?

*/

/*
// Primitives vs Objects

// Variables containing primitives hold the actual value of the data
// Variables containing objects contain reference to place in memory where object data actually is.

// Primitives
let a = 23;
let b = a;

a = 46;
console.log(a, b)

// Each variable has it's own copy of the data.

// Objects
let obj1 = {
  name: "john",
  age: 26
}

let obj2 = obj1;

obj1.age = 30;

console.log(obj1, obj2);

// Each variable points to the same piece of memory.

// Functions
let age = 27;
let obj = {
  name: 'Alex',
  city: 'Plainview'
};

function change(a, b) {
  a = 30;
  b.city = 'Denver';
}

change(age, obj)

console.log(age, obj.city);

*/

// First Class Functions;
// A function is an instance of the Object Prototype;
// A function behaves like an object;
// We can store functions in a variable;
// We can pass a function as an argument to another function;
// We can return a function from a function;

/*
// Passing Functions as Arguments:

const years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  const arrRes = [];
  for (let i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}
// Hold up, this is making Array.map(), but like, manually.

function calculateAge(el) {
  return 2018 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if ( el >= 18 && el <= 81 ) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

const ages = arrayCalc(years, calculateAge);
const adults = arrayCalc(ages, isFullAge);
const rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(adults);
console.log(rates);


/////////////////////////////////
// Functions Returning Functions

function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(`${name}, can you please explain what UX design is?`)
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log(`${name}, what subject do you teach?`)
    }
  } else {
    return function(name) {
      console.log(`Hello ${name}, what do you do at work?`)
    }
  }
}

const teacherQuestion = interviewQuestion('teacher');
console.log(teacherQuestion);
teacherQuestion('John');

const designerQuestion = interviewQuestion('designer');
console.log(designerQuestion);
designerQuestion('John');

interviewQuestion('teacher')('Mark');

*/

/*

///////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)

function game() {
  console.log(Math.random() * 10 >= 5);
}

game();

(function() {
  console.log(Math.random() * 10 >= 5);
})();

// Things in parentheses must be expressions

//////////////////////////////////////
// Closures

function retirement(retirementAge) {
  const a = ' years left until retirement';
  return function(year) {
    const age = 2018 - year;
    console.log(retirementAge - age + a);
  };
}

const retirementUS = retirement(66);
retirementUS(1989);

retirement(66)(1989);

const retirementGermany = retirement(65);
const retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

// Interview question re-written as a closure
function interviewQuestion(job) {
  let question;
  if (job === 'designer') {
    question = 'can you please explain what UX design is?';
  } else if (job === 'teacher') {
    question = 'what subject do you teach?';
  } else {
    question = 'what do you do at work?';
  }
  return function(name) {
    console.log(`${name}, ${question}`);
  };
}

interviewQuestion('teacher')('John');
interviewQuestion('designer')('Mark');

///////////////////////////////////////////
// Call, Apply, and Bind

const john = {
  name: 'John',
  age: 29,
  job: 'Teacher',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log(
        `Good ${timeOfDay}, Ladies and Gentlemen! I'm ${this.name}, I'm a ${
          this.job
        }, and I'm ${this.age} years old.`
      );
    } else {
      console.log(
        `Wutup!? How's your ${timeOfDay} going? I'm ${this.name}, I'm a ${
          this.job
        }, and I'm ${this.age} years old.`
      );
    }
  },
};

john.presentation('formal', 'morning');

const emily = {
  name: 'Emily',
  age: 35,
  job: 'designer',
};

// fn.call(this, arguments, ... ,) (method borrowing)
john.presentation.call(emily, 'friendly', 'afternoon');

// fn.apply(this, [arguments, ... , ]) (same idea, takes an array of arguments)
john.presentation.apply(emily, ['formal', 'morning']);

// bind generates a copy of the function and saves it as a variable.

// fnName = fn.bind(this, arguments, ... ,) (returns fn with preset arguments)
const johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');

const emilyFormal = john.presentation.bind(emily, 'formal');

emilyFormal('evening');

// This is currying. Creating a function based on another function with some preset paramaters.

const years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  const arrRes = [];
  for (let i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2018 - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

const ages = arrayCalc(years, calculateAge);

const fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);

*/

/*
///////////////////////////////////////
// Coding challenge
(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.ask = function() {
    console.log(this.question);

    this.answers.forEach((answer, i) => {
      console.log(`${i}: ${answer}`);
    });
  };

  Question.prototype.checkAnswer = function(answer, callback) {
    let sc;
    if (answer === 'exit') {
      console.log(`Game Over!!`);
      sc = callback(false);
      this.displayScore(sc);
      return;
    } else if (parseInt(answer, 10) === this.correct) {
      console.log('Correct!!!');
      sc = callback(true);
    } else {
      console.log('I mean... What!?!? How did you mess that up?');
      sc = callback(false);
    }
    this.displayScore(sc);
    nextQuestion();
  };

  Question.prototype.displayScore = function(score) {
    console.log(`Your Score: ${score}`);
    console.log('--------------------------------');
  }

  const qMoon = new Question(
    'How big is the moon?',
    [
      'About the size of a quarter',
      'About the size of the moon',
      'Not as big as my attention sp--',
    ],
    1
  );

  const qSky = new Question('What color is the sky?', ['Blue', 'Not blue'], 0);

  const qName = new Question(
    "What is Alex's first name?",
    ['Qwerty', 'asdfghjkl', 'Alex'],
    2
  );

  const questions = [qMoon, qSky, qName];

  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) sc++;
      return sc;
    }
  }

  const keepScore = score();

  function nextQuestion() {
    let n = Math.floor(Math.random() * questions.length);

    questions[n].ask();

    const userAnswer = prompt(
      'Enter the number corresponding to the correct answer.\n(Type exit to quit)'
    );

    questions[n].checkAnswer(userAnswer, keepScore);
  }

  nextQuestion();
})();

*/


