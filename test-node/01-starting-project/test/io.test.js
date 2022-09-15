import {describe, expect, it} from 'vitest';
import writeData from '../src/util/io';


describe('Test to writeData function', () => {
    it('Should execute the writeData method', () => {
        // Arange
        const testData = "Test data string";
        const testFileName = "name_file.txt";

        // Act // Assert
        return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
    });
});