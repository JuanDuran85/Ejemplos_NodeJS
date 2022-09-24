import { describe, expect, it } from 'vitest';
import { extractPostData } from '../posts/posts';

describe('test to extractPostData method from post file', () => {
    it('should extract title and content from the provided form data', () => {
        // Arange
        const testTitle = 'test title';
        const testContent = 'test content';

        const testForm = {
            title: testTitle,
            content: testContent,
            get(nameProperty){
                return this[nameProperty];
            }
        };

        // Act
        const testData = extractPostData(testForm);

        // Assert
        expect(testData.title).toEqual(testTitle);
        expect(testData.content).toBe(testContent);
    });
});