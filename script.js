// DOM selectors
const btnNumbers = document.querySelectorAll('.btnNumbers') // selects all number buttons
const btnOperator = document.querySelectorAll('.btnOperator') // selects all operators buttons
const userInputScreen = document.querySelector('.user-input') // selects the user input screen
const resultScreen = document.querySelector('.results') // selects the result screen
const clearScreen = document.querySelector('.btnClear') // selects the clear button
const btnEqual = document.querySelector('.btnEqual') // selects the equal button
const btnPoint = document.querySelector('.btnPoint') // selects the point button

// Variables
let firstNumbers = '';
let currentOperator = null;
let secondNumbers = '';
let reset = false;


// Event listeners
clearScreen.addEventListener('click', clearAll);
btnEqual.addEventListener('click', evaluate);
btnPoint.addEventListener('click', appendPoint);
window.addEventListener('keydown', keyInput);

// Event listeners for number buttons
btnNumbers.forEach((button) => 
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  })
);

// Event listeners for operation buttons
btnOperator.forEach((button) =>
  button.addEventListener('click', () => {
    setOperation(button.textContent);
  })
);

// Function to append the numbers to the user input
function appendNumber(number) {
  if (userInputScreen.textContent === '0' || reset) resetScreen();
  userInputScreen.textContent += number;
}

// Function to append a decimal point to the user input
function appendPoint() {
  if (userInputScreen.textContent.includes('.')) return;
  userInputScreen.textContent += '.';
}

// Function set the operation
function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  currentOperator = operator;
  if (secondNumbers === '') {
    firstNumbers = userInputScreen.textContent;
    resultScreen.textContent = `${firstNumbers} ${currentOperator}`;
  } else {
    resultScreen.textContent = `${firstNumbers} ${currentOperator} 
  ${secondNumbers} =`;
  }
  reset = true;
}

// Function to evaluate the operations
function evaluate() {
  if (currentOperator === null) return alert('Give me numbers first!');
  secondNumbers = userInputScreen.textContent;
  resultScreen.textContent = `${firstNumbers} ${currentOperator} 
  ${secondNumbers} =`;
  userInputScreen.textContent = round(operate(firstNumbers, secondNumbers, currentOperator));
}

// Function to clear and reset all the variables
function clearAll() {
  userInputScreen.textContent = '0';
  resultScreen.textContent = '';
  firstNumbers = '';
  currentOperator = null;
  secondNumbers = '';
}

// Function to clear the screen
function resetScreen() {
  userInputScreen.textContent = '';
  reset = false;
}

// Function to add
function add(a, b) {
  return a + b;
}

// Function to subtract
function subtract(a, b) {
  return a - b;
}

// Function to multiply
function multiply(a, b) {
  return a * b;
}

// Function to divide
function divide(a, b) {
  return a / b;
}

// Functions to round the results to a maximum of 5 decimals
function round(a) {
  return Math.round(a * 100000) / 100000;
}

// Function to perform the operation
function operate(a, b, operator) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "x":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
      break;
  }
}

// Function for keypress events
function keyInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === 'c') clearAll();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')  setOperation(keyOperators(e.key));
}

// Function to map the operators to the right operations
function keyOperators(key) {
  if (key === '+') return '+'
  if (key === '-') return '-'
  if (key === '/') return '÷'
  if (key === '*') return 'x'
}