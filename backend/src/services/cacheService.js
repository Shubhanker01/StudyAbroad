const env = require("../config/env");

const redisClient = require("../config/redis"); // Path to your Redis client module

class CacheService {
  /**
   * Fetch item from Redis
   * @param {string} key 
   * @returns {Promise<any|null>}
   */
  async get(key) {
    try {
      const data = await redisClient.get(key);
      console.log(data)
      if (!data) return null;

      // Automatically parses JSON objects/arrays back to native JS types
      return JSON.parse(data);
    } catch (error) {
      console.error(`Cache GET error for key [${key}]:`, error);
      return null; // Fail open to avoid breaking downstream business logic
    }
  }

  /**
   * Set item in Redis with TTL expiration
   * @param {string} key 
   * @param {any} value 
   * @param {number} ttlSeconds - Expiration in seconds
   */
  async set(key, value, ttlSeconds = env.cacheTtlSeconds || 300) {
    try {
      const serializedValue = JSON.stringify(value);
      const ttl = Number(ttlSeconds);

      if (ttl > 0) {
        // Set key with TTL in seconds (EX)
        await redisClient.setEx(key, ttl, serializedValue);
      } else {
        await redisClient.set(key, serializedValue);
      }
    } catch (error) {
      console.error(`Cache SET error for key [${key}]:`, error);
    }
  }

  /**
   * Delete key from Redis
   * @param {string} key 
   */
  async delete(key) {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error(`Cache DELETE error for key [${key}]:`, error);
    }
  }
}

module.exports = new CacheService();

