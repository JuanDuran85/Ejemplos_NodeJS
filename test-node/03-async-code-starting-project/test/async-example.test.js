
import { describe,it, expect } from 'vitest';
import { generateToken, generateTokenPromise } from '../async/async-example';

describe('Test to generateToken function',()=>{
    it('should be defined and generated a token value', () => {
        // Arange
        const testUserMail = "test@test.com";

        // Act
        generateToken(testUserMail,(error, token) =>{
            // Assert
            expect(token).toBeDefined();
        });
    });

    it('should throw an error', (done) => {
        // Arange
        const testUserMail = "test@test.com";

        // Act
        generateToken(testUserMail,(error, token) =>{
            // Assert
            try {
                expect(token).toBeDefined();
                //expect(token).toBe(2);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

describe('Testo to generateTokenPromise function',()=>{
    it('should be defined and generated a token', () => {
        // Arange
        const userTestEmail = "test@test.com";

        // Act
        return expect(generateTokenPromise(userTestEmail)).resolves.toBeDefined();

        // Assert
    });

    it('should be defined and generated a token', async() => {
        // Arange
        const userTestEmail = "test@test.com";

        // Act
        const tokenResult = await generateTokenPromise(userTestEmail);

        // Assert
        expect(tokenResult).toBeTypeOf('string');
    });
})