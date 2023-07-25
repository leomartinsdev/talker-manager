const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// middlewares
const validateLogin = require('./middlewares/validateLogin');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');
const tokenAuth = require('./middlewares/tokenAuth');

// utils
const generateToken = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkersPath = path.resolve(__dirname, 'talker.json');

async function readTalkers() {
  const content = await fs.readFile(talkersPath, 'utf-8');
  return JSON.parse(content);
}

app.get('/talker', async (req, res) => {
  const talkers = await readTalkers();

  if (talkers.length > 0) {
    return res.status(200).json(talkers);
  }
  res.status(200).json([]);
});

// Procuro um talker pelo id
app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalkers();
    const talker = talkers.find((t) => t.id === Number(id));

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(talker);
});

app.post('/login', validateLogin, (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    const token = generateToken();
  
    return res.status(200).json({ token });
  }
});

app.post('/talker',
  tokenAuth,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateAge,
  validateName,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  const allTalkers = JSON.stringify([...talkers, newTalker]);

  await fs.writeFile(talkersPath, allTalkers);
  res.status(201).json(newTalker);
});

app.put('/talker/:id',
  tokenAuth,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateAge,
  validateName,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();

  const talkerToUpdate = talkers.find((talker) => talker.id === Number(id));
  if (!talkerToUpdate) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkerToUpdate.name = name;
  talkerToUpdate.age = age;
  talkerToUpdate.talk = talk;
  const allTalkers = JSON.stringify(talkers);
  await fs.writeFile(talkersPath, allTalkers);
  res.status(200).json(talkerToUpdate);
});

app.delete('/talker/:id', tokenAuth, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();

  const updatedTalkers = talkers.filter((talker) => talker.id !== Number(id));
  const allTalkers = JSON.stringify(updatedTalkers);
  await fs.writeFile(talkersPath, allTalkers);
  res.status(204).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
