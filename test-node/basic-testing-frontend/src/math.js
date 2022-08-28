export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

export const validateInputs = (resultNumberValues) => {
  try {
    const numbers = [];
    for (const numberInput of resultNumberValues) {
      validateStringNotEmpty(numberInput);
      const number = transformToNumber(numberInput);
      validateNumber(number);
      numbers.push(number);
    }
    return add(numbers).toString();
  } catch (error) {
    return error.message;
  }
}