import { extrarEnteredNumberValues } from './src/parser.js';
import { validateInputs } from './src/math.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
  event.preventDefault();
  const resultNumberValues = extrarEnteredNumberValues(form);
  const resultValidateInputs = validateInputs(resultNumberValues);
  const resultText = validateResult(resultValidateInputs);
  output.textContent = resultText;
}

form.addEventListener('submit', formSubmitHandler);
