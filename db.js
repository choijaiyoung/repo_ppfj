'use strict';

const mongoose = require('mongoose');
require('./schemas'); // 모든 모델 등록

// Lambda 컨테이너 재사용 시 커넥션을 재활용한다.
let connPromise = null;

async function connect() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI environment variable is not set');
    mongoose.set('strictQuery', true);
    connPromise = mongoose
      .connect(uri, {
        dbName: process.env.MONGODB_DB || undefined,
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
      })
      .then(() => mongoose.connection)
      .catch((err) => {
        connPromise = null; // 다음 호출에서 재시도
        throw err;
      });
  }
  return connPromise;
}

module.exports = { connect, mongoose };
