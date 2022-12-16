const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const TALKER_DATA_PATH = './src/talker.json';

const readTalkerData = async () => {
  try {
    const data = await fs.readFile(path.resolve((__dirname, TALKER_DATA_PATH)));
    const talkerData = JSON.parse(data);
    return talkerData;
  } catch (error) {
    console.log('Cant read the file');
  }
};

const readTalkerById = async (id) => {
  try {
    const data = await readTalkerData();
    const talkerById = data.find((talker) => talker.id === Number(id));
    return talkerById;
  } catch (error) {
    console.log('Cant find talker');
  }
};

const loginToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readTalkerData,
  readTalkerById,
  loginToken,
};