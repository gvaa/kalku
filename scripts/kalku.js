"use strict";

// https://en.wikipedia.org/wiki/Kalku

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
    if (checkDecimals(a) > checkDecimals(b)) {
        return (a - b).toFixed(checkDecimals(a));
    } else {
        return (a - b).toFixed(checkDecimals(b));
    }
    

    return a - b;
}

let multiply = function (a, b) {
    return a * b;
}

let divide = function (a, b) {
    return a / b;
}

let checkDecimals = function (num) {
    if (Number.isInteger(+num)) {
        return 0;
    } else {
        return num.toString().split('.')[1].length;
    }
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
    // if (mainDisplayValue.slice(0,1) == 0) {
    //     mainDisplayValue = mainDisplayValue.slice(1,);
    // }
    mainDisplay.innerHTML = `<p class="inner">${mainDisplayValue}</p>`;
    auxDisplay.innerHTML = `<p class="inner">${auxDisplayValue}</p>`;
}

let workOperatorButton = function (operatorButton) {
    operatorButton.addEventListener('click', e => {
        
        if (operandOne != "" && operatorValue != "" && mainDisplayValue != "") {
            operandOne = operate(operatorValue, operandOne, mainDisplayValue);
            auxDisplayValue = operandOne + e.target.innerText;
            // operandOne = "";
            // operatorValue = "";     
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
        // auxDisplayValue = mainDisplayValue + operatorValue;
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
            mainDisplayValue += operandValue;
        }
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workEqualsButton = function (equalsButton) {
    equalsButton.addEventListener('click', e => {
        // operandValue = e.target.innerText;
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

let workDeleteButton = function (deleteButton) {
    deleteButton.addEventListener('click', () => {

        console.log(mainDisplayValue);

        mainDisplayValue = mainDisplayValue.toString().slice(0,-1);
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workPlusminusButton = function (plusminusButton) {
    plusminusButton.addEventListener('click', () => {

    // console.log(deleteButton)
        mainDisplayValue = "-" + mainDisplayValue;
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

// selecting buttons and adding respective listeners
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
// const deleteButton = document.querySelector("#delete");


operatorButtons.forEach(workOperatorButton);
operandButtons.forEach(workOperandButton);
workEqualsButton(equalsButton);
workCleanButton(clearButton);
workDeleteButton(document.querySelector("#delete"));
workPlusminusButton(document.querySelector("#plus-minus"));