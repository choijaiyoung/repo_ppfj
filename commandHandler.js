'use strict';

const { ApiError } = require('./errors');
const { connect } = require('./db');

// API 이름 -> 핸들러. 새 API 는 여기에 등록만 하면 된다.
const commands = {
  getProductInfo: require('./commands/getProductInfo'),
};

/**
 * API command handler
 * MongoDB 연결을 보장한 뒤 command 를 실행한다.
 */
async function execute(command, params) {
  const handler = commands[command];
  if (!handler) throw new ApiError(404, `unknown API: ${command}`);
  await connect();
  return handler(params || {});
}

module.exports = { execute, commands };
