const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri);
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db().collection('users').find().countDocuments;
  }

  async nbFiles() {
    return this.client.db().collection('files').find().countDocuments;
  }
}

module.exports = new DBClient();
