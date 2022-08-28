
import { validateNumber, validateStringNotEmpty } from './validation.js';


export function transformToNumber(value) {
  return +value;
}

export const cleanNumbers = (resultNumberValues) => {
  const numbers = [];
  for (const numberInput of resultNumberValues) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }
  return numbers;
}