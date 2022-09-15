
import { describe, it, expect, vi } from 'vitest';
import { generateReportData } from '../src/data';


describe('Testo to data file', () => {
    it('should execute logFn if provided', () => {
        // Arange
        const logger = vi.fn();
        // Act
        generateReportData(logger);

        // Assert
        expect(logger).toBeCalled();
    });
});