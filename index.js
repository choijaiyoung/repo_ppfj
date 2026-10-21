'use strict';

const { execute } = require('./commandHandler');
const { ApiError } = require('./errors');

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};

const respond = (statusCode, body) => ({
  statusCode,
  headers: HEADERS,
  body: JSON.stringify(body),
});

/**
 * Lambda entry point (Function URL / API Gateway HTTP API·REST 호환)
 *   POST /getProductInfo   body: {"asset_number":"..."}
 *   POST /                 body: {"command":"getProductInfo","asset_number":"..."}
 */
exports.handler = async (event) => {
  try {
    const method = (
      (event.requestContext && event.requestContext.http && event.requestContext.http.method) ||
      event.httpMethod || 'POST'
    ).toUpperCase();

    if (method === 'OPTIONS') return respond(204, {});
    if (method !== 'POST') throw new ApiError(405, 'Method Not Allowed. Use POST');

    let body = event.body || '{}';
    if (event.isBase64Encoded) body = Buffer.from(body, 'base64').toString('utf8');
    let params;
    try {
      params = typeof body === 'string' ? JSON.parse(body) : body;
    } catch (e) {
      throw new ApiError(400, 'Invalid JSON body');
    }

    // command 결정: 경로의 마지막 세그먼트 우선, 없으면 body.command
    const path = event.rawPath || event.path || '';
    const seg = path.split('/').filter(Boolean).pop();
    const command = seg || params.command;
    if (!command) throw new ApiError(400, 'API name is required');

    const data = await execute(command, params);
    return respond(200, data);
  } catch (err) {
    const status = err.statusCode || 500;
    if (status >= 500) console.error(err);
    return respond(status, {
      error: status >= 500 ? 'Internal Server Error' : err.message,
    });
  }
};
