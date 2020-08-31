const calculator = {
	displayNumber: '0',
	operator: null,
	firstNumber: null,
	waitingForSecondNumber: false
};

function updateDisplay() {
	if (displayNumber !== "0.") {
		document.querySelector("#displayNumber").innerText = parseFloat(parseFloat(calculator.displayNumber).toFixed(12));
	}
}

function inputDigit(digit) {
	if (calculator.displayNumber.length <= 14) {
		if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
			calculator.displayNumber = digit;
		} else {
			 if (calculator.displayNumber === '0') {
				calculator.displayNumber = digit;
			 } else {
				calculator.displayNumber += digit;
			 }
		}
	}
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
	button.addEventListener('click', function(event) {
 
		 // mendapatkan objek elemen yang diklik
		 const target = event.target;

		 if(target.classList.contains('clear')) {
			clearCalculator();
			updateDisplay();
			return;
		 }

		 if(target.classList.contains('backspace')) {
			backspace();
			updateDisplay();
			return;
		 }
 
		 if(target.classList.contains('equals')) {
			performCalculation();
			updateDisplay();
			return;
		 }

		 if(target.classList.contains('percent')) {
			percentCalculation();
			updateDisplay();
			return;
		 }
 
		 if(target.classList.contains('operator')) {
			handleOperator(target.innerText)
			updateDisplay();
			if(target.classList.contains('times')) {
				calculator.operator = "*";
			}
			if(target.classList.contains('divide')) {
				calculator.operator = "/";
			}
			return;
		 }
 
		 inputDigit(target.innerText);
		 updateDisplay()
	});
}

const numButtons = document.querySelectorAll(".button-number");
for (let button of numButtons) {
	button.addEventListener('click', function(event) {
 
		 // mendapatkan objek elemen yang diklik
		 const target = event.target; 
		 inputDigit(target.innerText);
		 updateDisplay()
	});
}

function clearCalculator() {
	calculator.displayNumber = '0';
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.waitingForSecondNumber = false;
}

function backspace() {
	if (calculator.displayNumber.length > 1) {
		result = ""
		for (let i = 0; i < calculator.displayNumber.length-1; i++) {
			result += calculator.displayNumber[i];
		}
		calculator.displayNumber = result;
	} else {
		calculator.displayNumber = "0";
	}
}

function handleOperator(operator) {
	calculator.operator = operator;
	calculator.waitingForSecondNumber = true;
	calculator.firstNumber = calculator.displayNumber;
}

function performCalculation() {
	if (calculator.firstNumber == null || calculator.operator == null) {
		return;
	}
 
	let result = 0;
	if (calculator.operator === "+") {
		 result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
	} else if (calculator.operator === "-") {
		 result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
	} else if (calculator.operator === "*") {
		 result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
	} else if (calculator.operator === "/") {
		 result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
	} else if (calculator.operator === "^") {
		 result = 1
		 for (let i = 0; i < parseFloat(calculator.displayNumber); i++) {
		 	result *= parseFloat(calculator.firstNumber);
		 }
	}

	// objek yang akan dikirimkan sebagai argumen fungsi putHistory()
	const history = {
		 firstNumber: calculator.firstNumber,
		 secondNumber: calculator.displayNumber,
		 operator: calculator.operator,
		 result: result
	}
	putHistory(history);
	calculator.displayNumber = result;
	renderHistory();
}

function percentCalculation() {
	calculator.displayNumber = parseFloat(calculator.displayNumber) / 100;
}