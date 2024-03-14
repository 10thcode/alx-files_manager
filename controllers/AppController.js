const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

async function getStatus(req, res) {
  if (dbClient.isAlive() && redisClient.isAlive()) {
    res.status(200).json({ redis: true, db: true });
  } else {
    res.status(500).json({ error: 'DB or/and redis server is not connected.' });
  }
}

async function getStats(req, res) {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();
  res.status(200).json({ users, files });
}

module.exports = { getStatus, getStats };
