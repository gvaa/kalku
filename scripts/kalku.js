"use strict";

// https://en.wikipedia.org/wiki/Kalku

let operator;
let operandOne;
let operandTwo;

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

console.log(operate("+", 5, 9));
console.log(operate("-", 5, 9));
console.log(operate("^", 5, 9));