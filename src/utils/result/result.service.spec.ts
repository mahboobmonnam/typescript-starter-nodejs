import { Result, combine } from './result.service';

describe('Result class', () => {
  describe('Success', () => {
    it('should create a success result with data', () => {
      const data = { foo: 'bar' };
      const message = 'Success message';
      const result = Result.Success(data, message);

      expect(result.isSuccess).toBe(true);
      expect(result.data).toBe(data);
      expect(result.message).toBe(message);
      expect(result.error).toBeUndefined();
    });

    it('should create a success result without data', () => {
      const message = 'Success message';
      const result = Result.Success(undefined, message);

      expect(result.isSuccess).toBe(true);
      expect(result.data).toBeUndefined();
      expect(result.message).toBe(message);
      expect(result.error).toBeUndefined();
    });
  });

  describe('Failure', () => {
    it('should create a failure result with error', () => {
      const error = new Error('Something went wrong');
      const message = 'Failure message';
      const result = Result.Failure(error, message);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBe(error);
      expect(result.message).toBe(message);
      expect(result.data).toBeUndefined();
    });

    it('should create a failure result without error', () => {
      const message = 'Failure message';
      const result = Result.Failure(undefined, message);

      expect(result.isSuccess).toBe(false);
      expect(result.error).toBeUndefined();
      expect(result.message).toBe(message);
      expect(result.data).toBeUndefined();
    });
  });

  describe('getData', () => {
    it('should return data for success result', () => {
      const data = { foo: 'bar' };
      const result = Result.Success(data);

      expect(result.getData()).toBe(data);
    });

    it('should throw error for failure result', () => {
      const error = new Error('Something went wrong');
      const result = Result.Failure(error);

      expect(() => result.getData()).toThrowError('Cannot get data from failure result');
    });
  });

  describe('getError', () => {
    it('should return error for failure result', () => {
      const error = new Error('Something went wrong');
      const result = Result.Failure(error);

      expect(result.getError()).toBe(error);
    });

    it('should throw error for success result', () => {
      const data = { foo: 'bar' };
      const result = Result.Success(data);

      expect(() => result.getError()).toThrowError('Cannot get error from success result');
    });
  });

  describe('combine', () => {
    it('should return success if all results are successful', () => {
      const results = [Result.Success(1), Result.Success(2), Result.Success(3)];

      const combinedResult = combine(results);

      expect(combinedResult.isSuccess).toBe(true);
      expect(combinedResult.data).toBeUndefined();
      expect(combinedResult.error).toBeUndefined();
      expect(combinedResult.message).toBe('Success');
    });

    it('should return failure if at least one result is a failure', () => {
      const results = [Result.Success(1), Result.Failure('error'), Result.Success(3)];

      const combinedResult = combine(results);

      expect(combinedResult.isSuccess).toBe(false);
      expect(combinedResult.data).toBeUndefined();
      expect(combinedResult.error).toBe('error');
      expect(combinedResult.message).toBe('Failed');
    });
  });
});
