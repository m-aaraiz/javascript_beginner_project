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


/**
 * A function to prompt the user for a deposit amount, convert it to a number, and return it if valid.
 *
 * @return {number} The valid deposit amount entered by the user
 */
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


/**
 * A function to prompt the user to enter the number of lines to bet on and return the valid input as a number.
 *
 * @return {number} The number of lines to bet on
 */
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

/**
 * A function to get the bet amount per line from the user and validate it.
 *
 * @param {number} balance - the total balance available for betting
 * @param {number} lines - the total number of lines to bet on
 * @return {number} the validated bet amount per line
 */
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


/**
 * Generates an array of slot machine reels with randomly selected symbols.
 *
 * @return {Array} The array of reels with randomly selected symbols
 */
function spin() {
	const symbols = [];
	for ([symbol, count] of Object.entries(SYMBOLS_COUNT)) {
		for (let i = 0; i < count; i++) {
			symbols.push(symbol);
		}
	}

	const reels = [];
	for (let i = 0; i < COLS; i++) {
		reels.push([]);
		// copy all symbols into available symbols array
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


/**
 * Transposes a matrix of reels.
 *
 * @param {Array} reels - the matrix to be transposed
 * @return {Array} the transposed matrix
 */
function transpose(reels) {
	const rows = [];

	for (let i = 0; i < ROWS; i++) {
		rows.push([]);
		for (let j = 0; j < COLS; j++) {
			rows[i].push(reels[j][i]);
		}
	}

	return rows;
}

/**
 * Prints each row of the given array, separating each element with a pipe symbol.
 *
 * @param {Array} rows - The array of rows to be printed
 * @return {undefined} This function does not return a value
 */
function printRows(rows) {
	for (const row of rows) {
		let rowString = "";
		for (const [i, symbol] of row.entries()) {
			rowString += symbol;
			if (i != row.length - 1) {
				rowString += " | ";
			}
		}
		console.log(rowString);
	}
}


/**
 * Calculate the total winnings based on the input rows, bet amount, and number of lines.
 *
 * @param {array} rows - the array of symbols for each row
 * @param {number} bet - the amount of bet per line
 * @param {number} lines - the number of lines
 * @return {number} the total winnings
 */
function getWinnings(rows, bet, lines) {
	let winnings = 0;

	for (let row = 0; row < lines; row++) {
		const symbols = rows[row];
		let allSame = true;

		for (const symbol of symbols) {
			if (symbol != symbols[0]) {
				allSame = false;
				break;
			}
		}

		if (allSame) {
			winnings += bet * SYMBOL_VALUES[symbols[0]];
		}
	}
	return winnings;
}


/**
 * Function to run the game, managing the player's balance, bet, spins, and winnings until the player runs out of money.
 *
 * @return {undefined} No return value
 */
function runGame() {
	let balance = deposit();

	while(true) {
		console.log("You have a balance of $" + balance.toString());
		const numLines = getNumberOfLines();
		const bet = getBet(balance, numLines);
		balance -= bet * numLines;
		const reels = spin();
		const rows = transpose(reels);
		printRows(rows);
		const winnings = getWinnings(rows, bet, numLines);
		balance += winnings;
		console.log("You won, $" + winnings.toString());

		if (balance <= 0) {
			console.log("You ran out of money!");
			break;
		}

		const playAgain = prompt("Do you want to play again (y/n): ");

		if (playAgain != "y") break;
	}
}

runGame();