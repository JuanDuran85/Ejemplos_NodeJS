import {describe, expect, it, vi} from 'vitest';
import { promises as fs } from 'fs'
import writeData from '../src/util/io';

vi.mock('fs');
vi.mock('path',()=>{
    return {
        default: {
            join: (...args) => {
                return args[args.length - 1];
            }
        }
    }
});

describe('Test to writeData function', () => {
    it('Should execute the writeData method with two arguments', () => {
        // Arange
        const testData = "Test data string";
        const testFileName = "name_file.txt";

        // Act
        writeData(testData, testFileName);

        // Assert
        expect(fs.writeFile).toBeCalledWith(testFileName, testData);
    });

    it('Should return a promise that resolves to no value if called correctly', () => {
        // Arange
        const testData = "Test data string";
        const testFileName = "name_file.txt";

        // Act
        writeData(testData, testFileName);

        // Assert
        return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
    });

    it('Should to be called the writeData method', () => {
        // Arange
        const testData = "Test data string";
        const testFileName = "name_file.txt";

        // Act
        writeData(testData, testFileName);

        // Assert
        expect(fs.writeFile).toBeCalled();
    });
});