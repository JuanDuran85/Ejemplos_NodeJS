import {describe, expect, it, vi} from 'vitest';
import { promises as fs } from 'fs'
import writeData from '../src/util/io';

vi.mock('fs');

describe('Test to writeData function', () => {
    it('Should execute the writeData method', () => {
        // Arange
        const testData = "Test data string";
        const testFileName = "name_file.txt";

        // Act
        writeData(testData, testFileName);

        // Assert - return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
        expect(fs.writeFile).toBeCalled();
    });
});