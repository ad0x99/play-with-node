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
    // Get the cookie value
    let cookie = new Buffer(req.cookies.profile, 'base64').toString();

    // unserialize the cookie
    const data = serialize.unserialize(cookie);

    // If has username field in the extracted cookie
    // Then send the response to the client the username as an output
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    // Assign a cookie for client if has no cookies yet
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
    // unserialize the vulnerable input
    const data = unserialize(payload);

    // If has username field in the extracted cookie
    // Then send the response to the client the username as an output
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    // Assign a cookie for client if has no cookies yet
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
    // unserialize the sanitized input
    const data = unserialize(sanitizedPayload);

    // If has username field in the extracted cookie
    // Then send the response to the client the username as an output
    if (data.username) {
      res.send(`Hello ${escape(data.username)}`);
    }
  } else {
    // Assign a cookie for client if has no cookies yet
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
