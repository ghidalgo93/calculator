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
			currentCell.textContent = '';
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

// Get the calculator selection via event listener, and pass the selection to a handler function
function getSelection(e){
	if (e.target.id === 'clear') {
		if (decimalPoint.disabled) toggleDecimalPoint();
		clear(e);
	} else if (operatorList.includes(e.target.id)){
		if (decimalPoint.disabled) toggleDecimalPoint();
		handleOperatorPress(e);
	} else (handleNumberPress(e.target.id));
}

// Clear the calculator display and the stored operand value
function clear(e){
	displayValue = '';
	updateDisplay('');
}

// Handle the press of an operator in the operator list
// : does the 'last' calculation in order to display correct
//   values and then stores new values (operands and operator) 
function handleOperatorPress(e){
	//TODO highlight operator that was pressed
	operandB = display.textContent;
	let translatedOperator = translateOperator(operatorInput);
	let answer = operate(translatedOperator, Number(operandA), Number(operandB));
	answer = Math.round((answer + Number.EPSILON) * 100) / 100;
	updateDisplay(answer);
	operandA = answer;
	operatorInput = e.target.id; //get new operator from input
	if (operatorInput === "="){resetInitialValues()}
	displayValue = '';
}

// Reset to initial operand and operator values (ie, when = is pressed)
function resetInitialValues(){
		operandA = 0;
		operandB = 0;
		operatorInput = '+'
}

// Handle the press of a number key; update display and displayValue
function handleNumberPress(numberPressed){
	displayValue = displayValue + numberPressed;
	updateDisplay(displayValue);
}

// Take operator as a sign and give back the function name
function translateOperator(operator){
	return (operator === '+') ? add
		: (operator === '-') ? subtract
		: (operator === '*') ? multiply
		: (operator === '/') ? divide
		: null;
} 

// Update the display given an update-string
// input: an updated display string
function updateDisplay(update){
	display.textContent = update; 
}

// Toggle the decial point state when pressed so that it cannot
// be input more than once
function toggleDecimalPoint(){	
	decimalPoint.disabled = !decimalPoint.disabled;
}




// ## Script ##
const calculatorColumns = 4;
const calculatorRows = 5;
const calculatorCellNames = ['display',7,8,9,'/',4,5, 6, '*', 1, 2, 3, '-', 0, '.','=', '+', 'clear'];
const operatorList = ['+', '-', '*', '/', '='];
let operandA = 0;
let operandB = 0;
let operatorInput = '+';
let displayValue = '';

const calculator = document.querySelector('#calculator');
createGrid(calculator, calculatorCellNames, calculatorColumns, calculatorRows);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getSelection));

const decimalPoint = document.getElementById(".");
decimalPoint.addEventListener('click', toggleDecimalPoint);

const display = document.querySelector('#display');












