"use strict";

// https://en.wikipedia.org/wiki/Kalku

let operandOne;
let operandTwo;
let mainDisplay = document.getElementById("main-display-digits")
let auxDisplay = document.getElementById("aux-display-digits")
let mainDisplayValue = "0";
let auxDisplayValue = "";
let inputValue = "";
let operatorValue = "";
let operandValue = "";
let inputScreenLength = 0;

let add = function (a, b) {
    return parseFloat(a) + parseFloat(b);
}

let subtract = function (a, b) {
    return (a - b).toFixed(12) * 1;
}

let multiply = function (a, b) {
    return (a * b).toFixed(12) * 1;
}

let divide = function (a, b) {
    return (a / b).toFixed(12   ) * 1;
}

let operate = function (operator, operandOne, operandTwo) {
    switch (operator) {
        case "+":
            return add(operandOne, operandTwo);
        case "-":
            return subtract(operandOne, operandTwo);
        case "*":
            return multiply(operandOne, operandTwo);
        case "/": 
            return divide(operandOne, operandTwo);
        default:
            return "undefined operator";
        }
}

let populateDisplays = function (mainDisplayValue, auxDisplayValue) {
    if (String(mainDisplayValue).length > 11) {
        // need to implement rounding if e has more than three digits
        mainDisplayValue = Number(mainDisplayValue).toExponential(5);
    } else if (String(mainDisplayValue).length > 10 && !String(mainDisplayValue).includes("-")) {
        mainDisplayValue = Number(mainDisplayValue).toExponential(5);
    }
    // mainDisplay.innerHTML = `<p class="inner">${mainDisplayValue}</p>`;
    mainDisplay.innerText = mainDisplayValue;
    // auxDisplay.innerHTML = `<p class="inner">${auxDisplayValue}</p>`;
    auxDisplay.innerText = auxDisplayValue;
}

let workOperatorButton = function (operatorButton) {
    operatorButton.addEventListener('click', e => {
        
        if (operandOne != "" && operatorValue != "" && mainDisplayValue != "") {
            operandOne = operate(operatorValue, operandOne, mainDisplayValue);
            auxDisplayValue = operandOne + e.target.innerText;   
            mainDisplayValue = "";       
            populateDisplays(mainDisplayValue, auxDisplayValue);
        }
        operatorValue = e.target.innerText;
        if (mainDisplayValue != "") {
            operandOne = mainDisplayValue;
            auxDisplayValue = mainDisplayValue + operatorValue;
        } else {
            auxDisplayValue = auxDisplayValue.slice(0,-1) + operatorValue;
        }
        mainDisplayValue = "";
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workOperandButton = function (operandButton) {
    operandButton.addEventListener('click', e => {
        operandValue = e.target.innerText;
        if (mainDisplayValue == "0") {
            mainDisplayValue = "";
        }
        if (operandValue != "." || !mainDisplayValue.includes(".")) {
            if (!(mainDisplayValue.length >= 11) && mainDisplayValue.includes(".")) {
                mainDisplayValue += operandValue;
            } else if (!(mainDisplayValue.length >= 10)) {
                mainDisplayValue += operandValue;
            } 
        }
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workDotButton = function (dotButton) {
    dotButton.addEventListener('click', () => {
        console.log(mainDisplayValue)
        if (mainDisplayValue == "") {
            mainDisplayValue = "0."
        } else if (!String(mainDisplayValue).includes(".")) {
            mainDisplayValue += "."; 
        }
        console.log(mainDisplayValue);
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workEqualsButton = function (equalsButton) {
    equalsButton.addEventListener('click', () => {
        if (operandOne != "" && operatorValue != "" && mainDisplayValue != "") {
            auxDisplayValue = operandOne + operatorValue + mainDisplayValue + "=";
            mainDisplayValue = operate(operatorValue, operandOne, mainDisplayValue);
            operandOne = "";
            operatorValue = "";
            populateDisplays(mainDisplayValue, auxDisplayValue);
        }
    });
}

let workCleanButton = function (cleanButton) {
    cleanButton.addEventListener('click', () => {
        mainDisplayValue = "0";
        auxDisplayValue = "";
        inputValue = "";
        operatorValue = "";
        operandValue = "";
        operandOne = "";
        populateDisplays(0, "");
    });
}

let workDeleteButton = function (deleteButton) {
    deleteButton.addEventListener('click', () => {
        mainDisplayValue = mainDisplayValue.toString().slice(0,-1);
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workPlusminusButton = function (plusminusButton) {
    plusminusButton.addEventListener('click', () => {
        if (String(mainDisplayValue).slice(0,1) === "-") {
            mainDisplayValue = String(mainDisplayValue).slice(1,);
        } else {
            mainDisplayValue = "-" + mainDisplayValue;
        }
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workPercentButton = function (percentButton) {
    percentButton.addEventListener('click', () => {
        if (auxDisplayValue == "" || auxDisplayValue.includes("=")) {
            mainDisplayValue = operate("*", 0.01, mainDisplayValue);
        } else if (auxDisplayValue.slice(-1) == "+" || auxDisplayValue.slice(-1) == "-") {
            mainDisplayValue = operate("*", auxDisplayValue.slice(0,-1)*0.01, mainDisplayValue);
            // auxDisplayValue
        } else {
            auxDisplayValue = operate("*", auxDisplayValue.slice(0,-1)*0.01, mainDisplayValue);
            mainDisplayValue = "";
            // auxDisplayValue += mainDisplayValue + "%"; 
        }
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

// selecting buttons and adding respective listeners
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(workOperatorButton);
operandButtons.forEach(workOperandButton);

workEqualsButton(document.querySelector("#equals"));
workCleanButton(document.querySelector("#clear"));
workDeleteButton(document.querySelector("#delete"));
workPlusminusButton(document.querySelector("#plus-minus"));
workDotButton(document.querySelector("#dot"));
workPercentButton(document.querySelector("#percent"));