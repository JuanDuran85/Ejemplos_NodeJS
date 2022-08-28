export function validateStringNotEmpty(value) {
  if (value.trim().length === 0) {
    throw new Error('Invalid input - must not be empty.');
  }
}

export function validateNumber(number) {
  if (isNaN(number) || typeof number !== 'number') {
    throw new Error('Invalid number input.');
  }
}

export const validateResult = (result) => {
  if (result === 'invalid') {
    return 'Invalid input. You must enter valid numbers.';
  } else if (result !== 'no-calc') {
    return `Result: ${result}`;
  }
}