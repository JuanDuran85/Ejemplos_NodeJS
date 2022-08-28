import { extrarEnteredNumberValues } from "./src/parser.js";
import { calculateResult } from "./src/math.js";
import { outputResultFinal, generateResultText } from "./src/output.js";

const form = document.querySelector("form");
const output = document.getElementById("result");

function formSubmitHandler(event) {
  event.preventDefault();
  const resultNumberValues = extrarEnteredNumberValues(form);
  const resultcalculateResult = calculateResult(resultNumberValues);
  const resultText = generateResultText(resultcalculateResult);
  outputResultFinal(output, resultText);
}

form.addEventListener("submit", formSubmitHandler);
