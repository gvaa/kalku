"use strict";

// https://en.wikipedia.org/wiki/Kalku

let operandOne;
let operandTwo;
let mainDisplay = document.getElementById("main-display")
let auxDisplay = document.getElementById("aux-display")
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
    // if (checkDecimals(a) > checkDecimals(b)) {
    //     return (a - b).toFixed(checkDecimals(a));
    // } else {
    //     return (a - b).toFixed(checkDecimals(b));
    // }   
    return (a - b).toFixed(14) * 1;
}

let multiply = function (a, b) {
    // return (a * b).toFixed(15);
    return (a * b).toFixed(14) * 1;
}

let divide = function (a, b) {
    return (a / b).toFixed(14) * 1;
}

// let checkDecimals = function (num) {
//     if (Number.isInteger(+num)) {
//         return 0;
//     } else {
//         return num.toString().split('.')[1].length;
//     }
// }

let operate = function (operator, operandOne, operandTwo) {
    switch (operator) {
        case "+":
            return add(operandOne, operandTwo);
        case "-":
            return subtract(operandOne, operandTwo);
        case "*":
            return multiply(operandOne, operandTwo);
        // case "÷":
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
    console.log(String(mainDisplayValue).length);
    if (String(mainDisplayValue).length > 10) {
        mainDisplayValue = mainDisplayValue.toExponential(5);
    }
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
    dotButton.addEventListener('click', e => {
        // operandValue = e.target.innerText;
        // if (mainDisplayValue == "0") {
        //     mainDisplayValue = ".";
        //     populateDisplays(mainDisplayValue, auxDisplayValue);
        // }
        if (!String(mainDisplayValue).includes(".")) {
            mainDisplayValue += "."; 
        }
        console.log(mainDisplayValue)
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

        console.log(mainDisplayValue);

        mainDisplayValue = mainDisplayValue.toString().slice(0,-1);
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workPlusminusButton = function (plusminusButton) {
    plusminusButton.addEventListener('click', () => {
        if (mainDisplayValue.slice(0,1) === "-") {
            mainDisplayValue = mainDisplayValue.slice(1,);
        } else {
            mainDisplayValue = "-" + mainDisplayValue;
        }
        populateDisplays(mainDisplayValue, auxDisplayValue);
    });
}

let workPercentButton = function (percentButton) {
    percentButton.addEventListener('click', (e) => {
        if (auxDisplayValue == "") {
            mainDisplayValue = operate("*", 0.01, mainDisplayValue);
        } else {
            mainDisplayValue = operate("*", auxDisplayValue.slice(0,-1)*0.01, mainDisplayValue)
            console.log(mainDisplayValue)
        }

        // operandOne = "";
        // operatorValue = "";     
        // mainDisplayValue = "";       
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
workDotButton(document.querySelector("#dot"));
workPercentButton(document.querySelector("#percent"));