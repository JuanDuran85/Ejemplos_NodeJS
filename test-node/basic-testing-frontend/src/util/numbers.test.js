
import { describe,it, expect } from 'vitest';
import { transformToNumber } from './numbers';

describe('Test to Numbers function',()=>{
    it('Should be able to transform a number into a number',()=>{
        // Arange
        const num = 4;

        // Act
        const result = transformToNumber(num);

        // Assert
        expect(result).toBe(num);
    })

    it('Should be able to transform a literal number into a number',()=>{
        // Arange
        const num = '5';

        // Act
        const result = transformToNumber(num);

        // Assert
        expect(result).toBe(+num);
    })

    it('Should yield NaN if it is not a number or if an array, object',()=>{
        // Arange
        const num = 'a';

        // Act
        const result = transformToNumber(num);

        // Assert
        expect(result).toBeNaN();
    })
})