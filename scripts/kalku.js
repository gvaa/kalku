"use strict";

// https://en.wikipedia.org/wiki/Kalku

// let operator;
let operandOne;
let operandTwo;
let mainDisplay = document.getElementById("main-display")
let auxDisplay = document.getElementById("aux-display")
let mainDisplayValue = "";
let auxDisplayValue = "";
let inputValue = "";
let operatorValue = "";
let operandValue = "";
let inputScreenLength = 0;


let add = function (a, b) {
    return parseFloat(a) + parseFloat(b);
}

let subtract = function (a, b) {
    return a - b;
}

let multiply = function (a, b) {
    return a * b;
}

let divide = function (a, b) {
    return a / b;
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
    mainDisplay.innerHTML = `<p class="inner">${mainDisplayValue}</p>`;
    auxDisplay.innerHTML = `<p class="inner">${auxDisplayValue}</p>`;
}

let workOperatorButton = function (operatorButton) {
    operatorButton.addEventListener('click', e => {
        operatorValue = e.target.innerText;
        if (mainDisplayValue != "") {
            operandOne = mainDisplayValue;
            auxDisplayValue = mainDisplayValue + operatorValue;
        } else {
            auxDisplayValue = auxDisplayValue.slice(0,-1) + operatorValue;
        }
        // auxDisplayValue = mainDisplayValue + operatorValue;
        mainDisplayValue = "";
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workOperandButton = function (operandButton) {
    operandButton.addEventListener('click', e => {
        operandValue = e.target.innerText;
        mainDisplayValue += operandValue;
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workEqualsButton = function (equalsButton) {
    equalsButton.addEventListener('click', e => {
        // operandValue = e.target.innerText;
        auxDisplayValue = operandOne + operatorValue + mainDisplayValue + "=";
        mainDisplayValue = operate(operatorValue, operandOne, mainDisplayValue);
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workCleanButton = function (cleanButton) {
    cleanButton.addEventListener('click', () => {
        // operandValue = e.target.innerText;
        mainDisplayValue = "";
        auxDisplayValue = "";
        inputValue = "";
        operatorValue = "";
        operandValue = "";
        operandOne = "";
        populateDisplays(0, "");
    });
}

const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

operatorButtons.forEach(workOperatorButton);
operandButtons.forEach(workOperandButton);
workEqualsButton(equalsButton);
workCleanButton(clearButton);

// for (const btn of operandButtons) {
//     btn.addEventListener('click', e => {
//         inputValue = e.target.innerText;
//         if (inputValue === "C") {
//             mainDisplayValue = "";
//             mainDisplay.innerHTML = `<p class="inner">${mainDisplayValue}</p>`;
//         } else if (inputValue === "C") {

//         }
        
        
//             else {
//                 mainDisplayValue += inputValue;
//             mainDisplay.innerHTML = `<p class="inner">${mainDisplayValue}</p>`;
//         }
//     });
// }
