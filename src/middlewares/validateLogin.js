const validateEmail = (email, res) => {
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]w+)*\.\w+([-.]\w+)*$/i;
  if (!emailRegex.test(email)) {
 return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
};

const validatePassword = (password, res) => {
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
 return res.status(400)
  .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
 };

 const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  validateEmail(email, res);
  validatePassword(password, res);
  next();
 };

  module.exports = {
    validateLogin,
  };