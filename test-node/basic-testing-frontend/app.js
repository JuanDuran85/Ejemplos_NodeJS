import { extrarEnteredNumberValues } from "./src/parser.js";
import { calculateResult } from "./src/math.js";
import { outputResultFinal, validateResult } from "./src/output.js";

const form = document.querySelector("form");
const output = document.getElementById("result");

function formSubmitHandler(event) {
  event.preventDefault();
  const resultNumberValues = extrarEnteredNumberValues(form);
  const resultcalculateResult = calculateResult(resultNumberValues);
  const resultText = validateResult(resultcalculateResult);
  outputResultFinal(output, resultText);
}

form.addEventListener("submit", formSubmitHandler);
