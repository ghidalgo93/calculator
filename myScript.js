// ## Basic Operators ##

function add (a, b){
	return a + b;
}

function subtract (a, b){
	return a - b;
}

function multiply (a, b){
	return a * b;
}

function divide (a, b){
	return a / b;
}

function operate(operator, a, b){
	return operator(a,b);
}




// ## Calculator Creation

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


// Function to get the calculator selection via event listener
// store it, and display it
function getSelection(e){
	const display = document.querySelector('#display');
	displayValue = displayValue + e.target.id;
	display.textContent = displayValue;
}

// Function to clear the calculator display and the stored value
function clear(e){
	const display = document.querySelector('#display');
	displayValue = '';
	display.textContent = displayValue;
}

// Function to take the current display value
function equalSelection(e){
	console.log(displayValue);
	parseInput(displayValue);
}

// Function to parse the displayed value
function parseInput(input){
	let operatorRegex = /\+|\-|\*|\//g;;
	operands = input.split(operatorRegex);
	console.log(operands);
}

// Function to update the display and displayValue
// TODO


// ## Script ##
let calculatorColumns = 4;
let calculatorRows = 5;
let calculatorCellNames = ['display',7,8,9,'/',4,5, 6, '*', 1, 2, 3, '-', 0, '.','=', '+', 'clear'];
let displayValue = '';

const calculator = document.querySelector('#calculator');
createGrid(calculator, calculatorCellNames, calculatorColumns, calculatorRows);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getSelection));

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clear);

const equalBtn = document.getElementById('=');
equalBtn.addEventListener('click', equalSelection);












































