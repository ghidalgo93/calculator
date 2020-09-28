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



// ### Calculator Funcrionality ##

// Function to get the calculator selection via event listener
function getSelection(e){
	if (e.target.id === 'clear') clear(e);
	else if (e.target.id === '=') equal(e);
	else (updateDisplay(displayValue + e.target.id));
}

// Function to clear the calculator display and the stored value
function clear(e){
	updateDisplay('');
}

// Function to take the current display value
function equal(e){
	let parsedDispayValue = parseOnOperators(displayValue);
	console.log(parsedDispayValue);
}

// Function to parse the displayed value
function parseOnOperators(input){
	let operatorRegex = /(\+|\-|\*|\/)/g;;
	let parsedInput = input.split(operatorRegex); //parsed input includes seperating operators
	return parsedInput;
}

// Function to update the display and displayValue given an update-string
// input: a string to update
function updateDisplay(update){
	const display = document.querySelector('#display');
	displayValue = update;
	display.textContent = update;
}





// ## Script ##
let calculatorColumns = 4;
let calculatorRows = 5;
let calculatorCellNames = ['display',7,8,9,'/',4,5, 6, '*', 1, 2, 3, '-', 0, '.','=', '+', 'clear'];
let displayValue = '';

const calculator = document.querySelector('#calculator');
createGrid(calculator, calculatorCellNames, calculatorColumns, calculatorRows);

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getSelection));


