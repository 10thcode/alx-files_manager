const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isConnected = true;

    this.client.on('error', (error) => {
      console.error(error);
      this.isConnected = false;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    await this.client.del(key);
  }
}

module.exports = new RedisClient();
