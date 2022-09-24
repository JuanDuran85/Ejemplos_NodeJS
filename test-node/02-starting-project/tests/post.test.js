import { beforeEach, describe, expect, it } from 'vitest';
import { extractPostData } from '../posts/posts';

describe('test to extractPostData method from post file', () => {
    const testTitle = 'test title';
    const testContent = 'test content';
    let testForm;

    beforeEach(() => {
        testForm = {
            title: testTitle,
            content: testContent,
            get(nameProperty){
                return this[nameProperty];
            }
        };
    });

    it('should extract title and content from the provided form data', () => {
        // Act
        const testData = extractPostData(testForm);

        // Assert
        expect(testData.title).toEqual(testTitle);
        expect(testData.content).toBe(testContent);
    });
});