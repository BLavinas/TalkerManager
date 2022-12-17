const validateToken = (req, res) => {
const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16 || typeof (authorization) !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

const validateName = (req, res) => {
const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
 return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}
};

const validateAge = (req, res) => {
const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
 return res.status(400)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' });
}
};

const validateHaveTalk = (req, res) => {
const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const validateWatchedAt = (req, res) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!(dateRegex.test(watchedAt))) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
});
  }
};

const validateRate = (req, res) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
 return res.status(400)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
};

const validateTalk = (req, res) => validateHaveTalk(req, res)
|| validateWatchedAt(req, res) || validateRate(req, res);

const validateTalker = (req, res, next) => validateToken(req, res)
  || validateName(req, res) || validateAge(req, res)
|| validateTalk(req, res) || next();

module.exports = {
  validateTalker,
};