const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./utils/generateToken');
const { validatorEmail, validatorPassword } = require('./middlewares/validatorLogin');
const validatorToken = require('./middlewares/validatorToken');
const { validatorAge,
  validatorName,
  validatorWatchedAt,
  validatorRate,
  validatorTalk,
} = require('./middlewares/validatorPerson');

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

app.post('/login', validatorEmail, validatorPassword, (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
});

app.post('/talker',
  validatorToken,
  validatorName,
  validatorAge,
  validatorTalk,
  validatorWatchedAt,
  validatorRate,
  async (req, res) => {
    // talker é a informação da nova pessoa que vou cadastrar.
    const talker = req.body;
    const talkers = await readTalker();
    // Pego o id na ultima posssição do array de objetos talkers.
    const { id } = talkers[talkers.length - 1];
    // crio o novo usuario em newTalker, e adiciono o id, com a chave id ex: se tem 5 pessoas no array, vai pegar 5 pessoas + 1, logo o novo id será 6 e assim sucessivamente.
    const newTalker = {
      ...talker,
      id: id + 1,
    };
    // com JSON mudo o formato e mantenho o dados antigos e adiciono o novo em um unico array.
    console.log('newTalker', newTalker);
    const allTalkers = JSON.stringify([...talkers, newTalker]);
    await fs.writeFile(talkerPath, allTalkers);
    return res.status(201).json(newTalker);
  });

app.listen(PORT, () => {
  console.log('Online');
});
