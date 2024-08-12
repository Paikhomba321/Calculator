let currentInput = "0";
let operator = null;
let previousInput = null;

const previousInputDiv = document.getElementById("previous-input");
const currentInputDiv = document.getElementById("current-input");

function updateDisplay() {
    currentInputDiv.textContent = currentInput;
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const value = button.textContent;

        if (type === "number") {
            if (currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
            }
        } else if (type === "operator") {
            if (currentInput !== "0") {
                previousInput = currentInput;
                operator = value;
                currentInput = "0";
                previousInputDiv.textContent = `${previousInput} ${operator}`;
            }
        } else if (type === "equals") {
            if (operator && previousInput !== null) {
                currentInput = evaluate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                operator = null;
                previousInput = null;
                previousInputDiv.textContent = ""; // Clear previous input
            }
        } else if (type === "clear") {
            currentInput = "0";
            operator = null;
            previousInput = null;
            previousInputDiv.textContent = ""; // Clear previous input
        } else if (type === "decimal") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
        }

        updateDisplay();
    });
});

function evaluate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return first / second;
        default:
            return second;
    }
}

updateDisplay();
