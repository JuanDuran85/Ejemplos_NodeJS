import { expect, it, describe } from "vitest";
import { validateNotEmpty } from "../util/validation";

describe('test to validation file', () => {
    it('should be undefined validateNotEmpty', () => {
        //Arange
        const textInTest = "mensaje de prueba";
        const errorMessageInTest = "error, el mensaje no puede estar vacio";
        // Act
        const resultValidation = () => validateNotEmpty(textInTest,errorMessageInTest);

        // Assert
        expect(resultValidation()).toBeUndefined();
    });

    it('should yield an Error is the text arguments is empty', () => {
        //Arange
        const textInTest = "";
        const errorMessageInTest = "error, el mensaje no puede estar vacio";
        // Act
        const resultValidation = () => validateNotEmpty(textInTest,errorMessageInTest);

        // Assert
        expect(resultValidation).toThrowError(errorMessageInTest);
    });
});