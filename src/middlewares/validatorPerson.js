const validatorName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validatorAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!(Number.isInteger(age)) || Number(age) < 18) {
    return res.status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  return next();
};

const validatorTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const validatorWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!isFormatDate.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const validatorRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if ((!Number.isInteger(+rate) || Number(rate) < 1 || Number(rate) > 5)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

module.exports = {
  validatorName,
  validatorAge,
  validatorTalk,
  validatorWatchedAt,
  validatorRate,
};
