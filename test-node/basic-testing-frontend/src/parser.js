export function extractNumbers(formData) {
  const num1Input = formData.get('num1');
  const num2Input = formData.get('num2');

  return [num1Input, num2Input];
}

export const extrarEnteredNumberValues = () => {
  const formData = new FormData(form);
  return extractNumbers(formData);
}
