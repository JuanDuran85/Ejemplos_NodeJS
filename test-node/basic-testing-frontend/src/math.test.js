import { it, expect } from "vitest";
import { add } from "./math";

it("Should summarize all number values in an array 1", () => {
  //AAA patern
  // Arange
  const numbers = [1, 3, 8];

  // Act
  const result = add(numbers);

  // Assert
  const expectResult = numbers.reduce(
    (prevValue, actualValue) => prevValue + actualValue,
    0
  );
  expect(result).toBe(expectResult);
});
