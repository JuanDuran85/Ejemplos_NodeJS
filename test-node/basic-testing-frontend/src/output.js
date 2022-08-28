export const validateResult = (result) => {
    if (result === 'invalid') {
      return 'Invalid input. You must enter valid numbers.';
    } else if (result !== 'no-calc') {
      return `Result: ${result}`;
    }
}

export const outputResultFinal = (output,resultText) => {
  output.textContent = resultText;
}