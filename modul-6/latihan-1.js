const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let isSecond = false;

buttons.addEventListener("click", function(e){

    if(e.target.tagName !== "BUTTON") return;

    const value = e.target.dataset.value;

    handleInput(value);

});

function handleInput(value){

    if(value >= "0" && value <= "9" || value === "."){

        if(!isSecond){
            firstNumber += value;
            display.value = firstNumber;
        }else{
            secondNumber += value;
            display.value = secondNumber;
        }

    }

    else if(["+", "-", "*", "/"].includes(value)){

        operator = value;
        isSecond = true;

    }

    else if(value === "="){

        let result;

        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        switch(operator){

            case "+":
                result = num1 + num2;
                break;

            case "-":
                result = num1 - num2;
                break;

            case "*":
                result = num1 * num2;
                break;

            case "/":
                result = num1 / num2;
                break;
        }

        display.value = result;

        firstNumber = result.toString();
        secondNumber = "";
        operator = "";
        isSecond = false;

    }

    else if(value === "C"){

        firstNumber = "";
        secondNumber = "";
        operator = "";
        isSecond = false;

        display.value = "";

    }

}

document.addEventListener("keydown", function(e){

    const key = e.key;

    if((key >= "0" && key <= "9") || key === "."){
        handleInput(key);
    }

    else if(["+", "-", "*", "/"].includes(key)){
        handleInput(key);
    }

    else if(key === "Enter"){
        handleInput("=");
    }

    else if(key === "Escape"){
        handleInput("C");
    }

});