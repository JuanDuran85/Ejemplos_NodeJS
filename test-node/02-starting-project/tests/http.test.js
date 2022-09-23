import { vi, expect, describe, it } from 'vitest';
import { sendDataRequest } from '../util/http';


/** 
 * In this example project, the global fetch() API / function is used.
 *
 * You can, of course, also use third-party libraries in frontend JavaScript projects though. For example, 
 * the axios library is a very popular library for sending HTTP requests from the frontend.
 *
 * In case you're working with such a library, instead of a global value, you can mock that library as you 
 * learned in the previous section (i.e., use vi.mock('axios'), provide a __mocks__/axios.js file if
 * necessary etc.).
**/

describe('test to http file', () => {
    
    const testResponseDataOut = { message: 'test ok'};

    const testFn = vi.fn((url,options)=>{
        return new Promise((resolve,reject)=>{
            const testResponseOut = {
                ok: true,
                json() {
                    return Promise.resolve(testResponseDataOut)
                },
            };
            resolve(testResponseOut);
        })
    });

    vi.stubGlobal('fetch',testFn)
    
    it('should return any available response data', () => {
        // Arange
        const testData = { message: 'test ok'};

        // Act - Assert
        expect(sendDataRequest(testData)).resolves.toEqual(testResponseDataOut)
    });
});
