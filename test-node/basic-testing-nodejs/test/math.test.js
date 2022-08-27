import { it, expect, describe } from "vitest";
import { add } from "../src/math";

describe("Math function test",() => {
    it("Should summarize all number values in an array", () => {
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


    it('should yield NaN if a least one invalid number is provided', () => {
        //Arange
        const inputs = ["input",3,5,"invalid"];

        // Act
        const result = add(inputs);

        // Assert
        expect(result).toBeNaN();
    });

    it('should yield a correct sum if an array of numerics string values is provided', () => {
        //Arange
        const inputs = ["1","2","3"];

        // Act
        const result = add(inputs);

        // Assert
        const expectValue = inputs.reduce((pre,acu) => +pre + +acu, 0);
        expect(result).toBe(expectValue);

    });

    it('should yield 0 if an empty array is provided', () => {
      // Arange
      const numbers = [];

      // Act
      const result = add(numbers);

      // Assert
      expect(result).toBe(0);
    });

    it('should throw an error if no value is passed into the function', () => {
      // Act
      const resultFunction = () => add();
      // Assert
      expect(resultFunction).toThrow();
    });

    it('should throw an error if provided with multiple arguments instead of an array', () => {
      // Arange
      const numOne = 1;
      const numTwo = 2;

      // Act
      const resultFunction = () => add(numOne, numTwo);

      // Assert
      expect(resultFunction).toThrow(/is not iterable/);
    });

})
