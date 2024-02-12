// 1. User deposits money
// 2. determine number of lines to bet
// 3. collect bet amoount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// To get user input
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
	"A": 2,
	"B": 4,
	"C": 6,
	"D": 8
}

const SYMBOL_VALUES = {
	"A": 5,
	"B": 4,
	"C": 3,
	"D": 2
}


function deposit() {
	while(true){
		const depositAmount = prompt("Enter the amount you want to deposit: ");
		// convert string to number
		const numDepositAmount = parseFloat(depositAmount);

		// check if the deposit is a number
		if (isNaN(numDepositAmount) || numDepositAmount <= 0) {
			console.log("Invalid deposit amount");
		} else {
			return numDepositAmount;
		}
	}
};


function getNumberOfLines() {
	while(true){
		const lines = prompt("Enter the number of lines to bet on (1-3): ");
		// convert string to number
		const numLines = parseFloat(lines);

		// check if the input is a number
		if (isNaN(numLines) || numLines <= 0 || numLines > 3) {
			console.log("Invalid number of lines");
		} else {
			return numLines;
		}
	}
}

function getBet(balance, lines) {
	while(true){
		const bet = prompt("Enter the total bet amount per line: ");
		// convert string to number
		const numBet = parseFloat(bet);

		// check if the input is a number
		if (isNaN(numBet) || numBet <= 0 || numBet > balance / lines) {
			console.log("Invalid bet amount");
		} else {
			return numBet;
		}
	}
}


function spin() {
	const symbols = [];
	for ([symbol, count] of Object.entries(SYMBOLS_COUNT)) {
		for (let i = 0; i < count; i++) {
			symbols.push(symbol);
		}
	}

	const reels = [[], [], []];
	for (let i = 0; i < COLS; i++) {
		const availableSymbols = [...symbols];
		for (let j = 0; j < ROWS; j++) {
			// randomly select a symbol for each reel
			const randomIndex = Math.floor(Math.random() * availableSymbols.length);
			const selectedSymbol = availableSymbols[randomIndex];
			reels[i].push(selectedSymbol);
			//remove chosen index from availableSymbols array
			availableSymbols.splice(randomIndex, 1);
		}
	}
	return reels;
}





const reels = spin();
console.log(reels);
// let because this will be modified
let balance = deposit();
const numLines = getNumberOfLines();
const bet = getBet(balance, numLines);

