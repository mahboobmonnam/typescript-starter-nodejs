/* eslint-disable @typescript-eslint/no-explicit-any */

export class Result<T> {
  isSuccess: boolean;

  error?: any;

  message?: string;

  data?: T;

  constructor(success: boolean, data?: T, error?: any, message?: string) {
    this.isSuccess = success;
    this.data = data;

    if (success) {
      this.message = message || 'Success';
    } else {
      this.error = error;
      this.message = message || 'Failed';
    }
    Object.freeze(this);
  }

  static Success<T>(data?: T, message?: string): Result<T> {
    return new Result<T>(true, data, undefined, message);
  }

  static Failure<T>(error: any, message?: string): Result<T> {
    return new Result<T>(false, undefined, error, message);
  }

  getData(): T {
    if (this.isSuccess) {
      return this.data;
    }
    throw new Error('Cannot get data from failure result');
  }

  getError(): any {
    if (!this.isSuccess) {
      return this.error;
    }
    throw new Error('Cannot get error from success result');
  }
}

export function combine<T>(results: Result<T>[]): Result<T> {
  const failure = results.find((result) => !result.isSuccess);

  if (failure) {
    return Result.Failure(failure.getError());
  }

  return Result.Success();
}
