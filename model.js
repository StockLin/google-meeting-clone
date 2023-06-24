const redisClient = require("./config/redis");

const saveCallId = async (key, value) => {
  return new Promise((resolve, reject) => {
    redisClient.SET(key, JSON.stringify(value), "EX", 86400, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res);
    });
  });
};

const getCallId = async (key) => {
  return new Promise((resolve, reject) => {
    redisClient.GET(key, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(JSON.parse(res));
    });
  });
};

module.exports = saveCallId;
module.exports = getCallId;
