import { cleanNumbers } from "./util/numbers.js";

export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

export const calculateResult = (resultNumberValues) => {
  try {
    return add(cleanNumbers(resultNumberValues)).toString();
  } catch (error) {
    return error.message;
  }
}