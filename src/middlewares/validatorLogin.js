const validatorEmail = (req, res, next) => {
  const { email } = req.body;
  const ValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 

  if (!ValidEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

const validatorPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } 

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = {
  validatorEmail,
  validatorPassword,
};
