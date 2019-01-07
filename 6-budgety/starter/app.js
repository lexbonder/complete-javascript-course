// BUDGET CONTROLLER
const budgetController = (function() {
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = function(type) {
    let sum = 0;

    data.allItems[type].forEach(function(item) {
      sum += item.value;
    });

    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function(type, des, val) {
      let newItem, ID;

      if (data.allItems[type] > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function(type, id) {
      const ids = data.allItems[type].map(function(item) {
        return item.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // calculate total income & expense
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate budget (income - expense)
      data.budget = data.totals.inc - data.totals.exp;
      // calculate percentage of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(item) {
        item.calcPercentage(data.totals.inc);
      })
    },

    getPercentages: function() {
      return data.allItems.exp.map(function(item) {
        return item.getPercentage();
      })
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function() {
      console.log(data);
    },
  };
})();

// UI CONTROLLER
const UIController = (function() {
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expencesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  const formatNumber = function(num, type) {
    let numSplit, int, dec, sign;
    // 2 decimal points
    num = Math.abs(num);
    num = num.toFixed(2); // Now it's a string
    numSplit = num.split('.');
    
    // comma separating thousands
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length)
    }
    dec = numSplit[1];
    
    // + or - before number
    sign = type === 'exp' ? '-' : '+';

    return `${sign} ${int}.${dec}`
  };

  const nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  
  return {
    getInput: function() {
      const { inputType, inputDescription, inputValue } = DOMstrings;
      return {
        type: document.querySelector(inputType).value, // inc / exp
        description: document.querySelector(inputDescription).value,
        value: parseFloat(document.querySelector(inputValue).value),
      };
    },

    addListItem: function(obj, type) {
      let html, element;
      const { id, description, value } = obj;
      // Create HTML string with placeholder Text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">${formatNumber(value, type)}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else {
        element = DOMstrings.expensesContainer;
        html = `<div class="item clearfix" id="exp-${id}"><div class="item__description">${description}</div><div class="right clearfix"><div class="item__value">${formatNumber(value, type)}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }
      // insert html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', html);
    },

    deleteListItem: function(selectorID) {
      const el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    getDOMstrings: function() {
      return DOMstrings;
    },

    clearFields: function() {
      let fields;
      const { inputDescription, inputValue } = DOMstrings;
      fields = document.querySelectorAll(inputDescription + ', ' + inputValue);

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(field => {
        field.value = '';
      });

      fieldsArray[0].focus();
    },

    displayBudget: function({ budget, totalExp, totalInc, percentage }) {
      const {
        budgetLabel,
        incomeLabel,
        expensesLabel,
        percentageLabel,
      } = DOMstrings;
      const type = budget > 0 ? 'inc' : 'exp';
      document.querySelector(budgetLabel).textContent = formatNumber(budget, type);
      document.querySelector(incomeLabel).textContent = formatNumber(totalInc, 'inc');
      document.querySelector(expensesLabel).textContent = formatNumber(totalExp, 'exp');
      if (percentage > 0) {
        document.querySelector(percentageLabel).textContent = percentage + '%';
      } else {
        document.querySelector(percentageLabel).textContent = '---';
      }
    },

    displayPercentages: function(percentages) {
      const fields = document.querySelectorAll(DOMstrings.expencesPercLabel);

      nodeListForEach(fields, function(field, i) {
        if (percentages[i] > 0) {
          field.textContent = percentages[i] + '%';
        } else {
          field.textContent = '---';
        }
      })
    },

    displayMonth: function() {
      let now, year, months, month;
      now = new Date()
      year = now.getFullYear();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
      // const christmas = new Date(2018, 11, 25) // zero based (dec = 11) 
    },

    changedType: function() {
      const {inputType, inputDescription, inputValue, inputBtn} = DOMstrings;
      var fields = document.querySelectorAll(`${inputType}, ${inputDescription}, ${inputValue}`);

      nodeListForEach(fields, function(field) {
        field.classList.toggle('red-focus');
      })

      document.querySelector(inputBtn).classList.toggle('red');
    }
  };
})();

// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl) {
  const setupEventListeners = function() {
    const { inputBtn, container, inputType } = UICtrl.getDOMstrings();

    document.querySelector(inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });

    document.querySelector(container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(inputType).addEventListener('change', UICtrl.changedType)
  };

  const updateBudget = function() {
    // Calculate Budget
    budgetCtrl.calculateBudget();
    // Return Budget
    const budget = budgetCtrl.getBudget();
    // Display Budget on UI
    UICtrl.displayBudget(budget);
  };

  const ctrlAddItem = function() {
    let input, newItem;
    // Get field input data
    input = UICtrl.getInput();
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // Add item to budget controller
      const { type, description, value } = input;
      newItem = budgetCtrl.addItem(type, description, value);
      // Add the item to the UI
      UICtrl.addListItem(newItem, type);
      UICtrl.clearFields();
      // Calculate and update the budget
      updateBudget();
      // Calculate and update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function(event) {
    let itemID, splitID, type, id;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      id = splitID[1];

      // Delete Item from data structure,
      budgetCtrl.deleteItem(type, id);
      // Delete item from UI
      UICtrl.deleteListItem(itemID);
      // update and show the new budget
      updateBudget();
      // Calculate and update percentages
      updatePercentages();
    }
  };

  const updatePercentages = function() {
    // calculate percentages
    budgetCtrl.calculatePercentages();
    // read percentages from budget controller
    const percentages = budgetCtrl.getPercentages();
    // update UI with new percentages
    UICtrl.displayPercentages(percentages);
  };

  return {
    init: function() {
      console.log('Application has started!');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
