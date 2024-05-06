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
    return a + b;
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
        operandOne = mainDisplayValue;
        auxDisplayValue = mainDisplayValue + operatorValue;
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
        mainDisplayValue = operate(operatorValue, operandOne, mainDisplayValue);
        auxDisplayValue = "";
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workCleanButton = function (cleanButton) {
    cleanButton.addEventListener('click', () => {
        // operandValue = e.target.innerText;
        mainDisplayValue = "0";
        auxDisplayValue = "0";
        inputValue = "";
        operatorValue = "";
        operandValue = "";
        operandOne = "";
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

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
