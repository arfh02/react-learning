import { describe, it } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

describe('sum function', () => {
    it('should sum correctly', () => {
        // Arrange
        const operandA = 1;
        const operandB = 1;

        // Act
        const result = sum(operandA, operandB);

        // Assert
        const expected = 2;
        assert.strictEqual(result, expected);
    });

    it('should throw an 0 if string passed on a parameter', () => {
        // Arrange
        const operandA = '5';
        const operandB = 4;

        // Action
        const result = sum(operandA, operandB);

        // Assert
        assert.strictEqual(result, 0);
    });

    it('should throw an 0 if string passed on b parameter', () => {
        // Arrange
        const operandA = 10;
        const operandB = '8';

        // Action
        const result = sum(operandA, operandB);

        // Assert
        assert.strictEqual(result, 0);
    });

    it('should throw an 0 if parameter a less than 0', () => {
        // Arrange
        const operandA = -1;
        const operandB = 9;

        // Action
        const result = sum(operandA, operandB);

        // Assert
        assert.strictEqual(result, 0);
    });

    it('should throw an 0 if parameter b less than 0', () => {
        // Arrange
        const operandA = 1;
        const operandB = -9;

        // Action
        const result = sum(operandA, operandB);

        // Assert
        assert.strictEqual(result, 0);
    });
});