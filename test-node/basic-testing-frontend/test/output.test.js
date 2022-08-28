import { describe,it, expect } from 'vitest';
import { generateResultText } from '../src/output';

describe('Test to generateResultText in output file',()=>{
    it('should return string, no matter which value is passed in', () => {
        // Arange
        const stringToIn = "Valor";
        const numberToIn = 1;
        const booleanToIn = false;

        // Act
        const resultOne = generateResultText(stringToIn);
        const resultTwo = generateResultText(numberToIn);
        const resultThree = generateResultText(booleanToIn);

        // Assert
        expect(resultOne).toBeTypeOf('string');
        expect(resultTwo).toBeTypeOf('string');
        expect(resultThree).toBeTypeOf('string');
    });

    it('should return a string that contains the calculation result if a number is provider as a result ', () => {
        // Arange
        const numberToIn = 7;

        // Act
        const result = generateResultText(numberToIn);

        // Assert
        expect(result).toContain(String(numberToIn));
    });

    it('should return an empty string if "no-calc" is provided as a result', () => {
        // Arange
        const stringIn = "no-calc";

        // Act
        const result = generateResultText(stringIn);

        // Assert
        expect(result).toBe('');
    });

    it('should return a string that contains "Invalid" if "invalid" is provided as a result', () => {
        const result = 'invalid';
    
        const resultText = generateResultText(result);
    
        expect(resultText).toContain('Invalid');
    });
})