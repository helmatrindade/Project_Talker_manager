const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./utils/generateToken');
const { validatorEmail, validatorPassword } = require('./middlewares/validatorLogin');

const app = express();
app.use(express.json());

const talkerPath = path.resolve(__dirname, './talker.json');

const readTalker = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  // const talkers = await readTalker();
  // if (!talkers) {
  //   return res.status(200).json([]);
  // } 
  // return res.status(200).json(talkers);
  try {
    const talker = await readTalker();
    return res.status(200).json(talker);
  } catch (error) {
    return res.status(200).send([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readTalker();
    const talker = talkers.find((t) => t.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  } catch (error) {
    console.error(error);
  }
});

app.post('/login', validatorEmail, validatorPassword, async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
