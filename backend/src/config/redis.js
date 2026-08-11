const { createClient } = require("redis");

const env = require("./env");
const redisClient = createClient({
    username: 'default',
    password: env.redisPassword,
    socket: {
        host: env.redisUrl,
        port: env.redisPort
    }
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Connected to Redis server"));

module.exports = redisClient;