import express from 'express';
import cookieParser from 'cookie-parser';
import escape from 'escape-html';
import { unserialize } from 'node-serialize'; // vulnerable package
import serialize from 'serialize-javascript'; // secure package
import { payload } from './vulns-payload.js';
import { sanitizedPayload } from './how-to-secure.js';

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
  // If already had cookies
  if (req.cookies.profile) {
    /* Get the cookie value from req.cookie.profile.
    Because the cookie is a base64 encoding, hence we have to decode it and convert it to a string */
    let cookie = new Buffer(req.cookies.profile, 'base64').toString();

    /* Deserialize the cookie value. It takes the cookie value as input and converts it back into its original JavaScript object
    representation. This allows the code to access the properties and values stored in the cookie. */
    const data = serialize.unserialize(cookie);

    /* Check if there is username field in the extracted cookie, then send the response which includes username value to the client
     */
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    /* Otherwise, assign a cookie for client if has no cookies yet*/
    res.cookie(
      'profile',
      'eyJ1c2VybmFtZSI6IkpvaG4iLCJnZW5kZXIiOiJNYWxlIiwiQWdlIjogMzV9',
      { maxAge: 900000, httpOnly: true }
    );
  }

  res.send('Welcome to the Unsecured  Serialize-Deserialize Demo!');
});

app.get('/poc', (req, res) => {
  // If already had cookies
  if (req.cookies.profile) {
    // Deserialize the vulnerable input
    const data = unserialize(payload);

    /* Check if there is username field in the extracted data, then send the response which includes username value to the client
     */
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    /* Otherwise, assign a cookie for client if has no cookies yet*/
    res.cookie(
      'profile',
      'eyJ1c2VybmFtZSI6IkpvaG4iLCJnZW5kZXIiOiJNYWxlIiwiQWdlIjogMzV9',
      { maxAge: 900000, httpOnly: true }
    );
  }

  res.send('Welcome to the Unsecured  Serialize-Deserialize Demo!');
});

app.get('/fix', (req, res) => {
  // If already had cookies
  if (req.cookies.profile) {
    // Deserialize the sanitized input
    const data = unserialize(sanitizedPayload);

    /* Check if there is username field in the extracted data, then send the response which includes username value to the client
     */
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    /* Otherwise, assign a cookie for client if has no cookies yet*/
    res.cookie(
      'profile',
      'eyJ1c2VybmFtZSI6IkpvaG4iLCJnZW5kZXIiOiJNYWxlIiwiQWdlIjogMzV9',
      { maxAge: 900000, httpOnly: true }
    );
  }

  res.send('Welcome to the Unsecured Serialize-Deserialize Demo!');
});

app.listen(3000);
console.log(`Listening on http://localhost:3000`);
