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
    console.log(`Error reading file: ${error}`);
  }
};

const readTalkerById = async (id) => {
  try {
    const data = await readTalkerData();
    const talkerById = data.find((talker) => talker.id === Number(id));
    return talkerById;
  } catch (error) {
    console.log(`Error reading file: ${error}`);
  }
};

const loginToken = () => crypto.randomBytes(8).toString('hex');

const writeNewTalker = async (newTalker) => {
  try {
    const dataTalkers = await readTalkerData();
    const idNewTalker = dataTalkers.length + 1;
    const newTalkerObj = { id: idNewTalker, ...newTalker };
    const allTalkers = JSON.stringify([...dataTalkers, newTalkerObj], null, 2);
    fs.writeFile(path.resolve((__dirname, TALKER_DATA_PATH)), allTalkers);
    return newTalkerObj;
  } catch (error) {
    console.log(`Error writing file: ${error}`);
  }
};

const updateTalker = async (id, talkerChange) => {
  try {
    const currentTalkers = await readTalkerData();
    const talkers = currentTalkers.filter((talker) => talker.id !== Number(id));
    const changedTalkerObj = { id, ...talkerChange };
    const allTalkers = JSON.stringify([...talkers, changedTalkerObj], null, 2);
    fs.writeFile(path.resolve((__dirname, TALKER_DATA_PATH)), allTalkers);
    return changedTalkerObj;
  } catch (error) {
    console.log(`Error writing file: ${error}`);
  }
};

const deleteTalker = async (id) => {
  const currentTalkers = await readTalkerData();
  const updatedTalkers = currentTalkers.filter((talker) => talker.id !== Number(id));
  const talkers = JSON.stringify(updatedTalkers, null, 2);
  try {
    await fs.writeFile(path.resolve((__dirname, TALKER_DATA_PATH)), talkers);
    return talkers;
  } catch (error) {
    console.log(`Error deleting file: ${error}`);
  }
};

const getByQuery = async (query, res) => {
  const allTalkers = await readTalkerData();
  const talkerByQuery = allTalkers.filter((talker) => talker.name.includes(query));
  if (!query) return res.status(200).json(allTalkers);
  if (!talkerByQuery) return res.status(200).json([]);
  return res.status(200).json(talkerByQuery);
};

module.exports = {
  readTalkerData,
  readTalkerById,
  loginToken,
  writeNewTalker,
  updateTalker,
  deleteTalker,
  getByQuery,
};