import serialize from 'serialize-javascript';

const input = {
  myOutput: function () {
    return 'You are hacked';
  },
};

// Sanitize the inputs by removing the function
const serializedInput = serialize(input, {
  ignoreFunction: true,
});

const sanitizedPayload = {
  // Leverage the JavaScript IIFE to the call function
  username: serializedInput,
  gender: 'Male',
  Age: 40,
};

// Then we can see the function is removed from the input
console.log('Serialized Input: \n' + serializedInput + '\n');
console.log(sanitizedPayload);

export { sanitizedPayload };
