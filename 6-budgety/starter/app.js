// BUDGET CONTROLLER
const budgetController = (function() {
  return {};
})();

// UI CONTROLLER
const UIController = (function() {})();

// GLOBAL APP CONTROLLER
const controller = (function(budgetCtrl, UICtrl) {

  const ctrlAddItem = function() {
    console.log('im a banana')
    // Get field input data
    // Add item to budget controller
    // Add the item to the UI
    // Calculate the budget
    // Display the budget on UI
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
  
  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
  });

})(budgetController, UIController);
