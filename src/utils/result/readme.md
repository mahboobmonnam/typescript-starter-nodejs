# Result

This wrapper is used to maintain the result object and handle it accordingly. The Result class now uses the Success and Failure classes to represent success and failure cases respectively. 
The isSuccess property is still used to indicate whether the operation was successful or not. The error property can now hold either an error object or a string message, 
and the message property is now optional and can hold either a generic message or a string message. The data property is used to hold the result data.

The Result class also now includes getter functions getData() and getError() that allow retrieving the data and error from the result object without having to check the isSuccess property.

Finally, the toSuccess() and toFailure() functions can be used to convert a Result object to a Success or Failure object respectively,
which can be useful when passing the result object to other functions or modules that expect the more specific Success or Failure classes.

```ts
async createUser(user: User): Promise<Result<User>> {
  try {
    const createdUser = await this.userRepository.create(user);
    return Result.Success(createdUser, 'User created successfully');
  } catch (error) {
    return Result.Failure(error, 'Failed to create user');
  }
}

// ...

const result = await this.createUser({ name: 'John Doe', email: 'john.doe@example.com' });
if (result.isSuccess) {
  console.log(result.getData());
  console.log(result.message);
} else {
  console.log(result.getError());
  console.log(result.message);
}
```

In this example, we're using the updated Result class to indicate whether the user creation operation was successful or not. If the operation was successful, 
we're returning a Result object with a Success instance, passing in the created user and a message indicating that the user was created successfully. If the operation failed, 
we're returning a Result object with a Failure instance, passing.

## Combine function to handle array of Result object to check the error

The combine function takes an array of Result objects as input, and first checks if there is any failure result in the array using the find method. 
If a failure result is found, it returns a new failure result with the error object from the failure.
Otherwise, empty success will be returned.

```ts
const result1 = Result.Success(1);
const result2 = Result.Success(2);
const result3 = Result.Failure('Error');

const combined = combine([result1, result2, result3]);

if (!combined.isSuccess) {
  console.log('Combined data:', combined.getError()); // Output: Combined error: Error
}
```
