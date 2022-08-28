
import { describe,it, expect } from 'vitest';
import { transformToNumber, cleanNumbers } from '../src/util/numbers';

describe('Test to transformToNumber function',()=>{
    it('Should be able to transform a number into a number',()=>{
        // Arange
        const num = 4;

        // Act
        const result = transformToNumber(num);

        // Assert
        expect(result).toBe(num);
        expect(result).toBeTypeOf('number');
    })

    it('Should be able to transform a string number into a type number',()=>{
        // Arange
        const num = '5';

        // Act
        const result = transformToNumber(num);

        // Assert
        expect(result).toBe(+num);
        expect(result).toBeTypeOf('number');
    })

    it('Should yield NaN for non-transformable values',()=>{
        // Arange
        const letter = 'a';
        const array = ['a'];
        const object = {};

        // Act
        const resultOne = transformToNumber(letter);
        const resultTwo = transformToNumber(array);
        const resultThree = transformToNumber(object);

        // Assert
        expect(resultOne).toBeNaN();
        expect(resultTwo).toBeNaN();
        expect(resultThree).toBeNaN();
    })
})

describe('Testo to cleanNumbers function',()=>{
    it('should return an array of number values if an array of string number values is provider', () => {
        // Arange
        const arrayString = ['1','2','3'];

        // Act
        const result = cleanNumbers(arrayString);

        // Assert
        expect(result[0]).toBeTypeOf('number')
    });

    it('should throw an error if an array with at least one empty string is provided', () => {
        // Arange
        const arrayString = ['','3'];
        
        // Act
        const result = () => cleanNumbers(arrayString);

        // Assert
        expect(result).toThrow();
    });
})