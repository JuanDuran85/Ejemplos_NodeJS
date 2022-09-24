import { beforeEach, describe, it, vi, expect } from 'vitest';
import { Window } from 'happy-dom';
import fs from 'fs';
import path from 'path';

import { showError } from '../util/dom';

/**
* use to emulate de DOM
--environment happy-dom
*/
describe('test to dom file', () => {

    const htmlDocPath = path.join(process.cwd(),'index.html');
    const htmlDocumentContent = fs.readFileSync(htmlDocPath, 'utf8').toString();

    const window = new Window();
    const document = window.document;
    
    vi.stubGlobal('document',document);
    
    beforeEach(() => {
        document.body.innerHTML = '';
        document.write(htmlDocumentContent);
    })

    it('should add an error paragraph to the id="errors" element', () => {
        const testMessage = 'test message';
        showError(testMessage);

        const errorElements = document.getElementById('errors');
        const errorParagraph = errorElements.firstElementChild;

        expect(errorParagraph).not.toBeNull();
    });

    it('should not contain an error paragraph initially', () => {
        const errorElements = document.getElementById('errors');
        const errorParagraph = errorElements.firstElementChild;

        expect(errorParagraph).toBeNull();
    });

    it('should output the provided message in the error paragraph', () => {
        const testMessage = 'test message';
        showError(testMessage);

        const errorElements = document.getElementById('errors');
        const errorParagraph = errorElements.firstElementChild;

        expect(errorParagraph.textContent).toBe(testMessage);
    });
});