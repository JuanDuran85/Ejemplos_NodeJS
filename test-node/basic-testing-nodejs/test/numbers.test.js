
import { describe,it, expect } from 'vitest';
import { transformToNumber } from '../src/util/numbers';

describe('Test to Numbers function',()=>{
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