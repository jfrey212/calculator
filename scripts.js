let num2 = 0;
let num1 = 0;
let operation = false;
let multiOperations = false;
let output = "";
let operator = "";
let previousButton = "";
const screen = document.querySelector(".answer");
const buttons = document.querySelectorAll("button");

// Add an event listener to each button that waits for a click, then calls
// the press() function. A parameter from the event is passed to press() as
// argument 'e'

buttons.forEach(button => {
  button.addEventListener('click', press);
});

// I used keyUp for the keyboard press listener to only allow one call to press to
// occurr per key press. keydown allows repeating

document.addEventListener('keyup', keyPress);

// Most of the operator logic is in the press() function in nested if statements.
// Makes extensive use of the 'e' event, particuly its 'target' field
// Uses some state variables for some logic decisions - 'operation' is true
// when a operator key has been pressed and false for numeric entry. 'multiOperations'
// is true once a single operation has taken place and multiple operations are
// strung together. 'previousButton' tracks which button was pressed. 'operator'
// tracks which operator button has been pressed.

function press(e) {
  if (e.target.className === 'number') {
      if (previousButton === 'equal') {
        clear();
      }
      output += e.target.textContent;
      operation = false;
      display(output);
      previousButton = 'number';
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
  } else if (e.target.className === 'operator') {
        if (previousButton === 'number' && multiOperations === false) {
        num1 = Number(output);
        operation = true;
        operator = e.target.id;
        output = "";
        display(e.target.textContent);
        multiOperations = true;
      } else if (previousButton === 'number' && multiOperations === true) {
        operation = true;
        num2 = Number(output);
        num1 = operate(num1, num2, ops[operator]);
        display(num1);
        output = "";
        operator = e.target.id;
      } else if (operation === true) {
          flashRed();
      }
    previousButton = 'operator';
  } else if (e.target.id === 'equal') {
      if (operation === true) {
        flashRed();
      } else if (num1 && !num2) {
          num2 = Number(output);
          output = operate(num1, num2, ops[operator]);
          display(output);
      } else if (multiOperations === true && previousButton === 'number') {
          num2 = Number(output);
          output = operate(num1, num2, ops[operator]);
          display(output);
      } else if (multiOperations === true && previousButton === 'operation') {
          display(num1);
      }
    previousButton = 'equal';
  } else if (e.target.id === 'sign') {
    if (previousButton === 'operation' || previousButton === 'equal') {
      flashRed();
    } else if (previousButton === 'number') {
      if (output.includes('-')){
        arr = output.split('');
        arr.shift();
        output = arr.join('');
        display(output);
      } else {
        arr = output.split('');
        arr.unshift('-');
        output = arr.join('');
        display(output);
      }
    }
  }
}

// The operate function rounds to three decimal placees. Two numbers and an
// operation are passed into the function. The numbers are set by button click
// events as defined in press(). The operation is set by pressing an operator
// button. The 'equal' logic in press() passes the operation id string to the
// 'ops' object, which passes the two number number arguments into the
// corresponding operation.

function operate(x, y, operation) {
  return Math.round((operation(x,y)*1000))/1000;
}

// The display function adds the string parameter to the <p> for the display

function display(item) {
  screen.textContent = item;
}

// The clear function resets variables and output to initial values

function clear() {
  output = '';
  previousButton = "";
  operation = false;
  num1 = 0;
  num2 = 0;
  operator = "";
  multiOperations = false;
  screen.textContent = output;
}

// The delete function turns the output string into an array and pops the last
// item before turning it back into a string and displaying the result

function del() {
  arr = output.split('');
  arr.pop();
  output = arr.join('');
  display(output);
}

// Used for not-allowed operations to let the user know they can't do that

function flashRed() {
  screen.style.backgroundColor = 'red';
  setTimeout(() => {
    screen.style.backgroundColor = 'silver';
  }, 200);
}

// Because of the button class and id names, there is not a nice way
// to select a button based on a keyCode. I ended up brute forcing it with
// a switch statement. Gets the job done but not ideal because of all the array
// index references

function keyPress(e) {
  e.preventDefault(); // stop Firefox quick find shortcut of '/'
  switch(e.keyCode) {
    case 55:
      buttons[0].click();
      break;
    case 56:
      buttons[1].click();
      break;
    case 57:
      buttons[2].click();
      break
    case 191:
      buttons[3].click();
      break
    case 52:
      buttons[4].click();
      break
    case 53:
      buttons[5].click();
      break
    case 54:
      buttons[6].click();
      break
    case 88:
      buttons[7].click();
      break
    case 49:
      buttons[8].click();
      break
    case 50:
      buttons[9].click();
      break
    case 51:
      buttons[10].click();
      break
    case 173:
      buttons[11].click();
      break
    case 48:
      buttons[12].click();
      break
    case 190:
      buttons[13].click();
      break
    case 61:
      buttons[14].click();
      break
    case 32:
      buttons[15].click();
      break
    case 8:
      buttons[16].click();
      break
    case 83:
      buttons[17].click();
      break
    case 13:
      buttons[18].click();
      break
  }
}

// The operations started out as individual functions. I ended up using DOM
// id's to select functions. The id's are strings, so it was much easier
// to select a function using an object key than do a bunch of string
// comparisons to select the function. The object key is the function name
// and the value is an anonymous function that returns the result of the
// corresponding arithmetic operation. The selection call takes the form:
// ops[operator] where 'operator' is a string. The 'operator' is set by the
// id of the pressed operator button.

let ops = {
  plus: function(x,y) {
    return x + y;
  },
  minus: function(x,y) {
    return x - y;
  },
  multiply: function(x,y) {
    return x * y;
  },
  divide: function(x,y) {
    if (y === 0) {
      setTimeout(clear, 1000);
      return "ERROR";
    } else {
      return x / y;
    }
  }
};
