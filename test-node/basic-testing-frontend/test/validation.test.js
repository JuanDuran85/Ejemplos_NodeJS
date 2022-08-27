import { it, expect, describe } from "vitest";
import { validateNumber, validateStringNotEmpty } from '../src/util/validation';

describe('Test on validateStringNotEmpty',()=>{
    it('should ', () => {
        // Arange
        const stringIn = '45';

        // Act - Assert
        expect(validateStringNotEmpty(stringIn)).toBeUndefined();
    });
})

describe('Test on validateNumber',()=>{
    it('should be undefined if the arguments is a number', () => {
        // Arange
        const numberIn = 2;

        // Act - Assert
        expect(validateNumber(numberIn)).toBeUndefined();
    });

    it('should yield an Error is the arguments is not a number', () => {
        // Arange
        const stringIn = 'casa';
        const numberIn = '5';

        // Act - Assert

        const resultOne = () => validateNumber(stringIn);
        const resultTwo = () => validateNumber(numberIn);

        expect(resultOne).toThrowError();
        expect(resultTwo).toThrowError();
    });
})