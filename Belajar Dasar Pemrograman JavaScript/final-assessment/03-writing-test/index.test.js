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

    it('should throw an error if string passed on a parameter', () => {
        const potentialErrorToBeThrew = () => {
            // Arrange
            const operandA = '5';
            const operandB = 4;

            // Action
            sum(operandA, operandB);
        };

        // Assert
        assert.throws(potentialErrorToBeThrew, Error);
    });

    it('should throw an error if string passed on b parameter', () => {
        const potentialErrorToBeThrew = () => {
            // Arrange
            const operandA = 10;
            const operandB = '8';

            // Action
            sum(operandA, operandB);
        };

        // Assert
        assert.throws(potentialErrorToBeThrew, Error);
    });
})





