document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector('#computation');
    // const output = document.getElementById("output");
    const buttons = document.getElementById("buttons");


    buttons.addEventListener('click', function(event){
        if (event.target.classList.contains('number')) {
            handleNumber(event.target.value);
        } else if (event.target.classList.contains('operator')) {
            handleOperator(event.target.value);
        } else if (event.target.classList.contains('clear')) {
            clear();
        } else if (event.target.classList.contains('delete')) {
            deleteLast();
        } else if (event.target.classList.contains('result')) {
            calculate();
        }
    });

    let currentInput = "";
    let currentOperator = "";
    let previousInput = "";

    function updateDisplay() {
        output.querySelector("#_uname").innerText = previousInput === "" ? "0" : previousInput;
        output.querySelector("#result").innerText = currentInput;

        if (currentInput !== "0" && currentInput !== "-0" && currentInput !== "") {
            output.querySelector("#_uname").style.display = "none";
        } else {
            output.querySelector("#_uname").style.display = "inline";
        }
    }

    function handleNumber(number) {
        if (currentInput === "0" || currentInput === "-0") {
            currentInput = number === "." ? "0." : number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperator(operator) {
        if (previousInput !== "") {
            calculate();
        }
        currentOperator = operator;
        previousInput = currentInput;
        currentInput = "0";
        updateDisplay();
    }

    function calculate() {
        let result;
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch (currentOperator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "x":
                result = num1 * num2;
                break;
            case "÷":
                result = num1 / num2;
                break;
            case "%":
                result = num1 % num2;
                break;
            default:
                return;
        }

        previousInput = "";
        currentInput = result.toString();
        updateDisplay();
    }

    function clear() {
        currentInput = "0";
        previousInput = "";
        currentOperator = "";
        updateDisplay();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
        updateDisplay();
    }
});