// 1. User deposits money
// 2. determine number of lines to bet
// 3. collect bet amoount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

// To get user input
const prompt = require("prompt-sync")();

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

		// check if the deposit is a number
		if (isNaN(numLines) || numLines <= 0 || numLines > 3) {
			console.log("Invalid number of lines");
		} else {
			return numLines;
		}
	}
}


const amountDeposited = deposit();
const numLines = getNumberOfLines();

