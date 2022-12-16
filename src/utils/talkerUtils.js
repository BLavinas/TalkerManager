const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = './src/talker.json';

const readTalkerData = async () => {
  try {
    const data = await fs.readFile(path.resolve((__dirname, TALKER_DATA_PATH)));
    const talkerData = JSON.parse(data);
    return talkerData;
  } catch (error) {
    console.log('Can`t read the file');
  }
};

module.exports = {
  readTalkerData,
};