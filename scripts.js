let output = "";
let prevNum = 0;
let operation = false;
let operator = "";
const screen = document.querySelector(".answer");
const buttons = document.querySelectorAll("button");
let buttonArr = Array.from(buttons);

buttons.forEach(button => {
  button.addEventListener('click', press)
});

function press(e) {
  if (e.target.className === 'number') {
    output += e.target.textContent;
    operation = false;
    display(output);
  } else if (e.target.id === 'clear') {
    clear();
  } else if (e.target.id === 'delete') {
    if (operation == false) {
      del();
    }
  } else if (e.target.id === 'dot') {
      if (!output.includes('.') && operation == false) {
        output += e.target.textContent;
        display(output);
      }
  } else if (e.target.className === 'operator' && operation == false) {
    operation = true;
    operator = e.target.id;
    prevNum = Number(output);
    output = "";
    display(e.target.textContent);
  } else if (e.target.id === 'equal') {
    if (prevNum && output !== '') {
      switch(operator) {
        case "divide":
          answer = operate(prevNum, Number(output), divide);
          break;
        case "multiply":
          answer = operate(prevNum, Number(output), multiply);
          break;
        case "minus":
          answer = operate(prevNum, Number(output), subtract);
          break;
        case "plus":
          answer = operate(prevNum, Number(output), add);
          break;
      }
    output = `${answer}`;
    display(output);
    }
  }
}

function operate(x, y, operation) {
  return operation(x,y);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return "ERROR";
  } else {
    return x / y;
  }
}

function display(item) {
  screen.textContent = item;
}

function clear() {
  answer = 0
  output = '';
  operation = false;
  screen.textContent = output;
}

function del() {
  arr = output.split('')
  arr.pop();
  output = arr.join('');
  display(output);
}
