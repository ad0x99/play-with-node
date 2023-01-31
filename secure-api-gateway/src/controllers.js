const login = (req, res) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    req.session.authenticated = true;
    res.send('Successfully authenticated');
  } else {
    res.send('Already authenticated');
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.send('Successfully logged out');
  });
};

const protected = (req, res) => {
  const { name = 'brother' } = req.query;
  res.send(`Hello ${name}!`);
};

module.exports = { login, logout, protected };
