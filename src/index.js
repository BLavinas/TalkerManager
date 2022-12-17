const express = require('express');
const { validateLogin } = require('./middlewares/validateLogin');
const { validateTalker } = require('./middlewares/validateTalker');
const {
  readTalkerData,
  readTalkerById,
  loginToken,
  writeNewTalker,
  updateTalker,
} = require('./utils/talkerUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
const registeredTalkers = await readTalkerData();
if (!registeredTalkers) {
  return res.status(200).json([]);
}
return res.status(200).json(registeredTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await readTalkerById(id);

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
});

app.post('/login', validateLogin, (_req, res) => {
  const token = loginToken();
  return res.status(200).json({ token });
});

app.post('/talker', validateTalker, async (req, res) => {
  const newTalker = req.body;
  const newTalkerWithID = await writeNewTalker(newTalker);
  return res.status(201).json(newTalkerWithID);
});

app.put('/talker/:id', validateTalker, async (req, res) => {
const talkerChanges = req.body;
const { id } = req.params;
const updatedTalker = await updateTalker(Number(id), talkerChanges);
return res.status(200).json(updatedTalker);
});