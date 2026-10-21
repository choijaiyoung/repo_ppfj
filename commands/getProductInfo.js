'use strict';

const { Product } = require('../schemas');
const { ApiError } = require('../errors');

/**
 * getProductInfo
 * Input : { asset_number: String }
 * 흐름  : product -> model_sub -> model -> model_type
 */
module.exports = async function getProductInfo(params) {
  const asset_number = params && params.asset_number;
  if (typeof asset_number !== 'string' || asset_number.trim() === '') {
    throw new ApiError(400, 'asset_number(String) is required');
  }

  const [row] = await Product.aggregate([
    { $match: { asset_number: asset_number.trim() } },
    { $limit: 1 },
    { $lookup: { from: 'model_sub', localField: 'model_sub_id', foreignField: 'id', as: 'ms' } },
    { $unwind: { path: '$ms', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'model', localField: 'ms.model_id', foreignField: 'id', as: 'm' } },
    { $unwind: { path: '$m', preserveNullAndEmptyArrays: true } },
    { $lookup: { from: 'model_type', localField: 'm.model_type_id', foreignField: 'id', as: 'mt' } },
    { $unwind: { path: '$mt', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        asset_number: 1,
        model_sub_id: 1,
        hub_id: 1,
        customer_id: 1,
        type_code: '$mt.type_code',
        type_name_ko: '$mt.type_name_ko',
        type_name_en: '$mt.type_name_en',
        is_use: 1,
        insert_id: 1,
        insert_date: 1,
        model_code: '$m.model_code',
        model_name_ko: '$m.model_name_ko',
        sub_category_code: '$m.sub_category_code',
        sub_category_name_ko: '$m.sub_category_name_ko',
        model_type_id: '$m.model_type_id',
        category_id: '$m.category_id',
        net_type_id: '$m.net_type_id',
        is_latest_firmware_registered: '$m.is_latest_firmware_registered',
        transmission_interval_minutes: '$m.transmission_interval_minutes',
        device_type: '$m.device_type',
        power_type: '$m.power_type',
        net_protocol: '$m.net_protocol',
      },
    },
  ]);

  if (!row) throw new ApiError(404, `product not found: ${asset_number}`);

  // 값이 없는 필드는 null 로 명시해 응답 형태를 고정한다.
  const FIELDS = [
    'asset_number', 'model_sub_id', 'hub_id', 'customer_id', 'type_code', 'type_name_ko',
    'type_name_en', 'is_use', 'insert_id', 'insert_date', 'model_code', 'model_name_ko',
    'sub_category_code', 'sub_category_name_ko', 'model_type_id', 'category_id', 'net_type_id',
    'is_latest_firmware_registered', 'transmission_interval_minutes', 'device_type',
    'power_type', 'net_protocol',
  ];
  const out = {};
  for (const f of FIELDS) out[f] = row[f] === undefined ? null : row[f];
  return out;
};
