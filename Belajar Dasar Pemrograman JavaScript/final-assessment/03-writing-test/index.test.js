import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

describe('sum function', () => {
    it('should sum correctly', () => {
        // Arrange
        const operandA = 1;
        const operandB = 1;

        // Action
        const actualValue = sum(operandA, operandB);

        // Assert
        const expectedValue = 2;
        assert.equal(actualValue, expectedValue);
    });
})





