// ### Basic Operators ###

function add(a, b){
	return a + b;
}

function subtract(a, b){
	return a - b;
}

function multiply(a, b){
	return a * b;
}

function divide(a, b){
	return a / b;
}

// Function to operate given an operate and two numbers
// input: [char] basic operator (+,-,*,/), number, number
// output: number
function operate(operator, a, b){
	return operator(a,b);
}


// ### Calculator Creation ###

// Function to create a grid, lay it out and fill it, within a given an HTML element
// input: the html element to become grid container, array of cell names, number of columns, number of row
function createGrid(gridContainer, cellNames, columns, rows){
	layoutGrid(gridContainer, columns, rows);
	fillGrid(gridContainer, cellNames, columns, rows);
	return;
}

// Function to lay out the grid within a container
// input: the html element to become grid container, number of columns, number of rows
function layoutGrid(gridContainer, columns, rows){
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    return;
}

// Function to fill the grid container with div elements
// input: the html element to become grid container, number of columns, number of rows
function fillGrid(gridContainer, cellNames, columns, rows){
    let totalCells = cellNames.length;
    for (let cellNum = 0; cellNum < totalCells; cellNum++){
		//only for calculator app, need display (1st cell) to be a div and not a button
		let currentCell;
		if (cellNum === 0){
        	currentCell = document.createElement('div');
			currentCell.textContent = '0';
		} else {
			currentCell = document.createElement('button');
			currentCell.textContent = `${cellNames[cellNum]}`;
		}
        currentCell.setAttribute('id', `${cellNames[cellNum]}`);
        currentCell.setAttribute('class', 'cell'); 
        gridContainer.appendChild(currentCell);
	}
     return;
}



// ### Calculator Funcrionality ###

// // Get the calculator selection via event listener, and pass the selection to a handler function
function getSelection(inputValue){
	if (inputValue === 'clear' || inputValue === 'Backspace') {
		handleClear();
	} else if (inputValue === '+/-'){
		handleSignChange();
	} else if (inputValue === '%'){
		handlePercentage();
	} else if (operatorList.includes(inputValue)){
		handleOperatorPress(inputValue);
	} else (handleNumberPress(inputValue));

	toggleDecimalPoint();
	return;
}

// Clear the calculator display and the stored operand value
function handleClear(){
	displayValue = '';
	updateDisplay('0');
	resetInitialValues();
	return;
}

// Reset to initial operand and operator values (ie, when = is pressed)
function resetInitialValues(){
	operandA = 0;
	operandB = 0;
	operatorInput = '+'
	return;
}

// Changes the sign of the input
function handleSignChange(){
	let negative = String(display.textContent * -1);
	displayValue = negative;
	display.textContent = displayValue;
	return;
}

// Gives input as percentage
function handlePercentage(){
	let percent = String(display.textContent / 100);
	displayValue = percent;
	updateDisplay(displayValue);
	return;
}

// Handle the press of an operator in the operator list
// : does the 'last' calculation in order to display correct
//   values and then stores new values (operands and operator) 
function handleOperatorPress(operatorPressed){
	if (operatorPressed === 'Enter') operatorPressed = '=';
	//TODO highlight operator that was pressed
	operandB = display.textContent; //set operand b to user input
	answer = formatOperation(operatorInput, operandA, operandB) //do and format PAST operation
	updateDisplay(answer);
	operandA = answer; //set operand a to PAST answer
	operatorInput = operatorPressed; //get new operator from input
	if (operatorInput === "="){resetInitialValues()}
	displayValue = '';
	return;
}

// Format and run the operation desired, return the rounded answer 
//input: operator as a sign (+,-,*,/), operand a, operand b
//output: answer rounded to the hundreths place
function formatOperation(unformattedOperator, a, b){
	let formattedOperator = formatOperator(unformattedOperator);
	let answer = operate(formattedOperator, Number(a), Number(b));
	return answer = round(answer, 2);
}

// Take operator as a sign and give back the function name
function formatOperator(operator){
	return (operator === '+') ? add
		: (operator === '-') ? subtract
		: (operator === '*') ? multiply
		: (operator === '/') ? divide
		: null;
} 

// Handle the press of a number key; update display and displayValue
function handleNumberPress(numberPressed){
	displayValue = displayValue + numberPressed;
	updateDisplay(displayValue);
	return;
}

// Update the display given an update-string
// input: an updated display string
function updateDisplay(update){
	update = String(update);
	if (update.length > 14){
		exp = Number(update).toExponential(2);
		update = String(exp);
	}
	display.textContent = update; 
}

// Check display value for a decimal point
//input: none
//output: boolean
function checkDisplayValueForDecimalPoint(){
	return displayValue.includes('.');
}

// Toggle the decimal point depending on if there is already a decimal point in the display
function toggleDecimalPoint(){
	checkDisplayValueForDecimalPoint() ? decimalPoint.disabled = true : decimalPoint.disabled = false;
	return;
}

// Rounds the number given the decimal places desired
function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}



// ## Script ##
const calculatorColumns = 4;
const calculatorRows = 7;
const calculatorCellNames = ['display','clear','+/-','%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','='];
const operatorList = ['+', '-', '*', '/', '=', 'Enter'];
let operandA = 0;
let operandB = 0;
let operatorInput = '+';
let displayValue = '';

const calculator = document.querySelector('#calculator');
createGrid(calculator, calculatorCellNames, calculatorColumns, calculatorRows);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', function(e) {getSelection(e.target.id)}));

const decimalPoint = document.getElementById(".");

const display = document.querySelector('#display');

document.addEventListener('keydown', function(e){
	if (decimalPoint.disabled === true && e.key === '.'){
		return;
	} else if ((calculatorCellNames.includes(e.key)) || (e.key === 'Enter') || (e.key === 'Backspace')){
		getSelection(e.key);
	}
})


























