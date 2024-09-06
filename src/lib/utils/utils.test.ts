import { expect } from 'chai';
import * as utils from './utils';

describe('Utility functions', () => {
  describe('isPlainObject function', () => {
    it('should return true for a plain object', () => {
      const result = utils.isPlainObject({ data: 1 });

      expect(result).to.be.true;
    });

    it('should return false for primitive values', () => {
      const result = utils.isPlainObject('string');

      expect(result).to.be.false;
    });

    it('should return false for instances of non-plain objects', () => {
      const result = utils.isPlainObject(new Set());

      expect(result).to.be.false;
    });

    it('should return false for arrays', () => {
      const result = utils.isPlainObject([1, 2, 3]);

      expect(result).to.be.false;
    });
  });

  describe('queryString function', () => {
    it('should return a query string from a plain object with single key-value pair', () => {
      const result = utils.queryString({ data: 1 });

      expect(result).to.be.eq('data=1');
    });

    it('should return a query string from a plain object with an array value', () => {
      const result = utils.queryString({ data: [1, 2] });

      expect(result).to.be.eq('data[0]=1&data[1]=2');
    });
  });

  describe('isEqual function', () => {
    it('should return true for deeply equal objects', () => {
      const result = utils.isEqual({ data: 1 }, { data: 1 });

      expect(result).to.be.true;
    });

    it('should return false for objects with different values', () => {
      const result = utils.isEqual({ data: [1, 2] }, { data: [] });

      expect(result).to.be.false;
    });

    it('should return true for deeply equal nested objects', () => {
      const result = utils.isEqual(
        { data: { nested: [1, 2] } },
        { data: { nested: [1, 2] } },
      );

      expect(result).to.be.true;
    });

    it('should return false for string equal different length', () => {
      const result = utils.isEqual('', '  ');

      expect(result).to.be.false;
    });

    it('should return true for deeply equal string', () => {
      const result = utils.isEqual('1', '1');

      expect(result).to.be.true;
    });

    it('should return false for number equal different numbers', () => {
      const result = utils.isEqual(1, 159);

      expect(result).to.be.false;
    });
  });
});
