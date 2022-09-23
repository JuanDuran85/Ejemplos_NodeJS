
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { HttpError, ValidationError } from '../util/errors';

describe('test to errors file HttpError class',()=>{
    const statusCode = 200;
    const message = 'test error';
    const data = {"key":"ok"};
    let httpError;

    beforeAll(() =>{
        httpError = new HttpError(statusCode, message, data);
    })

    beforeEach(() => {
        httpError = new HttpError(statusCode, message, data);
    });

    it('should store the provided data value in HttpError class', () => {
        // Assert
        expect(httpError.data).toBe(data);
    });

    it('should have an statusCode property in HttpError class', () => {
        // Assert
        expect(httpError).toHaveProperty('statusCode');
    });

    it('should store the provided undefined value in HttpError class', () => {
        // Assert
        expect(httpError.propiedad).toBeUndefined();
    });
})

describe('test to errors file ValidationError class',()=>{
    const message = 'test error';
    let validationError;

    beforeAll(() =>{
        validationError = new ValidationError(message);
    })

    beforeEach(() => {
        validationError = new ValidationError(message);
    });

    it('should store the provided message value in ValidationError class', () => {
        // Assert
        expect(validationError.message).toBe(message);
    });

    it('should have an message property in ValidationError class', () => {
        // Assert
        expect(validationError).toHaveProperty('message');
    });
})